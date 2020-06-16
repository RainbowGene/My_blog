/**
 * 添加相册
 */

const fs = require('fs')

module.exports = (req, res) => {
  const { albumName } = req.query
  const path = `${__dirname}/../../../public/img/album_img/${albumName}`
  fs.exists(path, ex => {
    if (ex) return res.send({ status: 201, msg: '已有相册，无法添加' })
    fs.mkdir(path, (err) => {
      if (err) return res.send({ status: 201, msg: '添加失败！' })
      return res.send({ status: 200, msg: `相册${albumName}添加成功` })
    })
  })
}
