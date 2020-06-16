/**
 * 修改文章类别
 */

const { Arttype } = require('../../../model/arttype')

module.exports = async (req, res) => {
  const { id, typename } = req.body
  const arttype = await Arttype.updateOne({ id, typename })
  return res.send({ status: 200, msg: arttype ? '修改成功!' : '修改失败!' })
}
