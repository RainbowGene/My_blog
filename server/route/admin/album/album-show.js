/**
 * 相册图片
 */

const file = require('../../../model/album')

module.exports = (req, res) => {
  const { albumName } = req.query
  file.getAllImgByAlbumName(albumName, (err, imgArr) => {
    if (err) return res.send({ status: 201, msg: err })
    res.send({ status: 200, msg: '查询完毕!', albumName, imgArr })
  })
}
