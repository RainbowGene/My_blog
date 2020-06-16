/**
 * 删除用户：删除用户之前删除用户详情
 */

const { User } = require('../../../model/user')
const { UserInfo } = require('../../../model/userinfo')

module.exports = async (req, res) => {
  const { id } = req.query
  // console.log(id)
  await UserInfo.findOneAndDelete({ iid: id })
  await User.findOneAndDelete({ _id: id })
  if (user) {
    res.send({ status: 201, msg: '删除失败！' })
  }
  res.send({ status: 200, msg: '删除成功！' })
}
