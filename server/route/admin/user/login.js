const { User } = require('../../../model/user')
const jwt = require('../../../untils/jwt')
const { aseDecode } = require('../../../untils/crypto')

module.exports = async (req, res) => {
  const { username, password } = req.body
  if (username.trim().length === 0 || password.trim().length === 0) {
    return res.send({ msg: '数据不合法', status: 401, err: 1 })
  }
  // 验证用户信息 : 如果查到用户 user为对象，否则为空
  const user = await User.findOne({ username })
  if (user && aseDecode(user.password) === password) {
    const token = jwt.createToken({ login: true, name: username }) // 产生token
    return res.send({ msg: '登录成功', status: 200, token, err: -1, id: user._id, username: user.username, role: user.role })
  } else {
    return res.send({ msg: '用户名或密码错误', status: 401, err: 2 })
  }
}
