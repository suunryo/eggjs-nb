'use strict';

const Controller = require('egg').Controller;
const sendToWormhole = require('stream-wormhole');
const path = require('path')
const fs = require('fs')

class CommonController extends Controller {
  async uploadfile() {
    const ctx = this.ctx;
    const fileStream = await ctx.getFileStream();

    const path = this.config.path.baseDir + 'app/public/' + fileStream.fieldname
    if (!fs.existsSync(path)) {
        fs.mkdirSync(path);
    }

    fileStream.on('data', chunk => {
        console.log(`Received ${chunk.length} bytes of data  `, `Name: ${fileStream.filename}`)
        fs.writeFile(path + '/' + fileStream.filename, chunk, err => {
            if(err) throw err
        })
    })

    fileStream.on('end', () => {
        console.log('write file end')
    })
    
    const url = `${this.config.path.baseUrl}/public/${fileStream.fieldname}/${fileStream.filename}`
    ctx.body = ctx.__success(url)
  }
}

module.exports = CommonController;
