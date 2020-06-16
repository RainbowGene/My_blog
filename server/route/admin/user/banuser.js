const { User } = require('../../../model/user')

module.exports = async (req, res) => {
  const { id, ustate } = req.query
  // console.log(ustate)
  if (ustate == 1) { // 禁用
    await User.updateOne({ _id: id }, { ustate: 1 })
  } else {
    await User.updateOne({ _id: id }, { ustate: 0 })
  }
  res.send({ status: 200, msg: ustate == 0 ? '解封成功！' : '禁用成功！' })
}
