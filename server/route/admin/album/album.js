const file = require('../../../model/album')

module.exports = (req, res) => {
  file.getAllAlbum((err, allAlbum) => {
    if (err) return res.send({ status: 201, msg: err })
    // allAlbum 要转化为对象
    const result = []
    for (let i = 0; i < allAlbum.length; i++) {
      result.push({ albums: allAlbum[i] })
    }
    res.send({ status: 200, albums: result, arr: allAlbum })
  })
}
