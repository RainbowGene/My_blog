/**
 * 删除相册
 */

const fs = require('fs')

module.exports = (req, res) => {
  const { albumName } = req.query
  const path = `${__dirname}/../../../public/img/album_img/${albumName}`
  fs.exists(path, ex => {
    if (!ex) return res.send({ status: 201, msg: '没有查到该相册！' })
    fs.rmdir(path, err => {
      if (err) return res.send({ status: 201, msg: '删除失败' })
      return res.send({ status: 200, msg: `删除${albumName}成功` })
    })
  })
}
