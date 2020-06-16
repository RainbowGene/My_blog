const cryoto = require('crypto')

const key = 'gene' // 密钥

// 加密算法
const aseEncode = function (ps) {
  const cipher = cryoto.createCipher('aes-256-cbc', key)
  let crypted = cipher.update(ps, 'utf-8', 'hex')
  crypted += cipher.final('hex')
  return crypted
}

// 解密
const aseDecode = function (ps) {
  const decipher = cryoto.createDecipher('aes-256-cbc', key)
  /*
   第一个参数为一个Buffer对象或一个字符串，用于指定需要被解密的数据
   第二个参数用于指定被解密数据所使用的编码格式，可指定的参数值为 'hex', 'binary', 'base64'等，
   第三个参数用于指定输出解密数据时使用的编码格式，可选参数值为 'utf-8', 'ascii' 或 'binary';
  */
  let decrypted = decipher.update(ps, 'hex', 'utf-8')
  decrypted += decipher.final('utf-8')
  return decrypted
}

module.exports = { aseEncode, aseDecode }
