/**
 * 修改相册名
 */

const fs = require('fs')

module.exports = (req, res) => {
  const { oldName, newName } = req.query
  const oldpath = `${__dirname}/../../../public/img/album_img/${oldName}`
  const newpath = `${__dirname}/../../../public/img/album_img/${newName}`
  fs.rename(oldpath, newpath, (err) => {
    if (err) return res.send({ status: 201, msg: '修改失败' })
    return res.send({ status: 200, msg: '修改成功' })
  })
}
