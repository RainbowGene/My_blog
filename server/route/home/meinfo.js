/**
 * 获取我的信息(包括详细信息)
 */

const { UserInfo } = require('../../model/userinfo')

module.exports = async (req, res) => {
  const userinfo = await UserInfo.find({ realname: 'Gene' }).populate('iid')
  res.send({ status: 200, data: userinfo })
}
