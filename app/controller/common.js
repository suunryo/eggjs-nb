'use strict';

const Controller = require('egg').Controller;
const sendToWormhole = require('stream-wormhole');
const path = require('path')
const fs = require('fs')
const md5 = require('md5')

class CommonController extends Controller {
  async uploadfile() {
    const ctx = this.ctx;
    const fileStream = await ctx.getFileStream();

    const path = this.config.path.baseDir + '/app/public/' + fileStream.fieldname
    
    if (!fs.existsSync(path)) {
        fs.mkdirSync(path);
    }

    let p = fileStream.filename.lastIndexOf('.') == -1 ? '' : fileStream.filename.lastIndexOf('.')
    let t = fileStream.filename.substr(Number(p))
    let n = md5(fileStream.filename + new Date().toString()) + t.toString()

    fileStream.on('data', chunk => {
        console.log(`Received ${chunk.length} bytes of data  `, `Name: ${fileStream.filename}`)
        fs.writeFile(path + '/' + n, chunk, err => {
            if(err) throw err
        })
    })

    fileStream.on('end', () => {
        console.log('write file end')
    })
    const url = `${this.config.path.baseUrl}/public/${fileStream.fieldname}/${n}`
    ctx.body = ctx.__success(url)
  }
}

module.exports = CommonController;
