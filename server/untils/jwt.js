const jwt = require('jsonwebtoken')
const scrict = 'gene' // 创建私钥

// 产生token
function createToken (playload) {
  playload.ctime = Date.now() // 创建时间
  playload.exp = Math.floor(Date.now() / 1000) + (60 * 10) // 过期时间十分钟
  return jwt.sign(playload, scrict)
}

// 验证token
function checkToken (token) {
  return new Promise((resovle, reject) => {
    jwt.verify(token, scrict, (err, data) => {
      // if (err) { reject({ status: 201, msg: '无效的token' }) }
      if (data) { resovle(data) }
      reject({ status: 201, msg: '无效的token' })
    })
  })
}

// let token = createToken({ isLogin: true, name: "gene" })
// console.log(token)
// checkToken(token).then(data => {
//     console.log(data)
// }).catch(err => {
//     console.log(err)
// })

module.exports = {
  createToken, checkToken, scrict
}
