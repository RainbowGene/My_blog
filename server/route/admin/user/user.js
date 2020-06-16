// 用户列表展示
const { User } = require('../../../model/user')
const pagination = require('mongoose-sex-page')

module.exports = async (req, res) => {
  const page = req.query.page || 1
  const pagesize = req.query.pagesize || 10
  const query = req.query.query || '' // 关键字
  const reg = new RegExp(query, 'i') // 不区分大小写
  const users = await pagination(User).find({
    $or: [
      { username: { $regex: reg } },
      { email: { $regex: reg } }
    ]
  }).page(page).size(pagesize).display(5).exec()
  // console.log(users.records)
  res.send({ data: users, status: 200 })
}
