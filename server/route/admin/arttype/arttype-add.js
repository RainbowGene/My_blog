/**
 * 添加文章类别
 */

const { Arttype } = require('../../../model/arttype')

module.exports = async (req, res) => {
  const { typename } = req.body
  console.log(typename)
  const type = await Arttype.findOne({ typename })
  if (type) {
    res.send({ status: 201, msg: '该类别已存在！' })
  } else {
    // 添加
    const art = await Arttype.create({ typename })
    return res.send({ status: 200, msg: '添加成功！' })
  }
}
