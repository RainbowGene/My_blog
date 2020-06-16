/**
 * 用户信息编辑
 */
const { UserInfo } = require('../../../model/userinfo')

module.exports = async (req, res) => {
  const { iid, realname, phone, Introduction, experience, avatar } = req.body
  const lasttime = new Date() // 当前时间
  const userinfo = await UserInfo.findOne({ iid })
  if (userinfo) { // 存在为编辑操作
    await UserInfo.updateOne({ iid, realname, phone, Introduction, experience, avatar, lasttime })
  } else { // 不存在为创建
    await UserInfo.create({ iid, realname, phone, Introduction, experience, avatar, lasttime })
  }
  res.send({ status: 200, msg: userinfo ? '修改成功！' : '添加成功！' })
  // res.send({ status: 200, msg: userinfo })
}
