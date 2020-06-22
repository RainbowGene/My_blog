/**
 * 文章列表
 */

const { Article } = require('../../../model/article')
const pagination = require('mongoose-sex-page')

module.exports = async (req, res) => {
  const page = req.query.page || 1
  const pagesize = req.query.pagesize || 10
  const query = req.query.query || '' // 关键字
  const reg = new RegExp(query, 'i') // 不区分大小写
  const arts = await pagination(Article).find({
    $or: [
      { title: { $regex: reg } },
      { content: { $regex: reg } }
    ]
  }).populate('author').populate('type').sort('-publishDate').page(page).size(pagesize).display(5).exec()
  if (arts) return res.send({ data: arts, status: 200 })
  return res.send({ status: 201, msg: '查询失败！' })
}
