'use strict';

const Controller = require('egg').Controller;
const path = require('path')
const fs = require('fs')
const crypto = require('crypto')
const sendToWormhole = require('stream-wormhole')
// wait a write stream
const awaitWriteStream = require('await-stream-ready').write

class CommonController extends Controller {
  async uploadfile() {
    const ctx = this.ctx;
    const fileStream = await ctx.getFileStream();
    // 目标路径
    const targetPath = path.join(this.config.path.baseDir, 'app/public/', fileStream.fieldname)
    // 文件夹不存在  则创建文件夹
    if (!fs.existsSync(targetPath)) fs.mkdirSync(targetPath);
    // 获取文件后缀
    const t = path.extname(fileStream.filename) || ''
    // 文件名+时间进行hash
    const hash = crypto.createHash('md5')
    hash.update(fileStream.filename + new Date().toString())
    // hash后的文件名
    const n = hash.digest('hex') + t.toString()
    // 创建一个可读流
    const writeStream = fs.createWriteStream(targetPath + '/' + n);

    try {
        await awaitWriteStream(fileStream.pipe(writeStream))
    } catch (error) {
        // 异常则消耗stream
        await sendToWormhole(fileStream);
        throw err;
    }

    const url = `${this.config.path.baseUrl}/public/${fileStream.fieldname}/${n}`
    ctx.body = ctx.__success(url)
  }
}

module.exports = CommonController;
