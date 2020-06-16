/**
 * 获取类别列表
 */
const { Arttype } = require('../../../model/arttype')
const pagination = require('mongoose-sex-page')

module.exports = async (req, res) => {
  if (req.query.all) { // //查询没被禁用的所有类别
    const types = await pagination(Arttype).find({ $or: [{ typeStatus: 0 }] }).exec()
    return res.send({ data: types, status: 200 })
  }
  const page = req.query.page || 1
  const pagesize = req.query.pagesize || 10
  const query = req.query.query || '' // 关键字
  const reg = new RegExp(query, 'i') // 不区分大小写
  const types = await pagination(Arttype).find({
    $or: [
      { typename: { $regex: reg } }
    ]
  }).page(page).size(pagesize).display(5).exec()
  // console.log(users.records)
  res.send({ data: types, status: 200 })
}
