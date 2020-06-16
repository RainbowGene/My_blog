const { User, validateUser } = require('../../../model/user')
const { aseEncode } = require('../../../untils/crypto')

module.exports = async (req, res) => {
  try {
    await validateUser(req.body)
  } catch (error) {
    // 验证失败
    return res.send({ status: 401, msg: error.message })
  }
  const user = await User.findOne({ email: req.body.email })
  if (user) { // 已注册的邮箱
    return res.send({ status: 401, msg: '该邮箱地址已注册！' })
  }
  // 写入数据库
  req.body.password = aseEncode(req.body.password) // 加密
  await User.create(req.body)
  return res.send({ status: 200, msg: '注册成功！' })
}
