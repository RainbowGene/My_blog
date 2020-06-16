/**
 * 相册模型
 */

const fs = require('fs')
// console.log(`${__dirname}/../public/img/album_img`)
// 查询所有相册信息
exports.getAllAlbum = (callback) => {
  fs.readdir(`${__dirname}/../public/img/album_img`, (err, files) => {
    if (err) return callback('未找到相册文件夹', null)
    const allAlbums = [];
    (function iterator (i) {
      if (i == files.length) {
        // console.log(allAlbums)
        callback(null, allAlbums)
        return
      }
      fs.stat(`${__dirname}/../public/img/album_img/` + files[i], function (err, stats) {
        if (err) return callback('找不到文件' + files[i], null)
        if (stats.isDirectory()) {
          allAlbums.push(files[i])
        }
        iterator(i + 1)
      })
    })(0)
  })
}

// 遍历相册中所有图片
exports.getAllImgByAlbumName = (albumname, callback) => {
  fs.readdir(`${__dirname}/../public/img/album_img/${albumname}`, (err, files) => {
    if (err) return callback(`未找到${albumname}文件夹`, null)
    const allImgs = [];
    (function iterator (i) {
      if (i == files.length) {
        // console.log(allImgs)
        callback(null, allImgs)
        return
      }
      fs.stat(`${__dirname}/../public/img/album_img/${albumname}/` + files[i], function (err, stats) {
        if (err) return callback('找不到文件' + files[i], null)
        if (stats.isFile()) {
          allImgs.push(files[i])
        }
        iterator(i + 1)
      })
    })(0)
  })
}
