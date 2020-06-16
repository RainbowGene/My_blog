/**
 * 获取用户信息(包括详细信息)
 */

const { UserInfo } = require('../../../model/userinfo')

module.exports = async (req, res) => {
  const { id } = req.query
  const userinfo = await UserInfo.find({ iid: id }).populate('iid')
  res.send({ status: 200, userinfo })
}
