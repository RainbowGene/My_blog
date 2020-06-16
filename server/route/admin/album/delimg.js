/**
 * 删除图片
 */

const fs = require('fs')

module.exports = (req, res) => {
  const { albumName, picName } = req.query
  const delpath = `${__dirname}/../../../public/img/album_img/${albumName}/${picName}`
  fs.unlink(delpath, (err) => {
    if (err) return res.send({ status: 201, msg: '删除失败！' })
    return res.send({ status: 200, msg: '删除成功！' })
  })
}
