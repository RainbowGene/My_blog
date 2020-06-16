// token 认证中间件
// const eJwt = require('express-jwt')

// // express-jwt中间件帮我们自动做了token的验证以及错误处理，其中unless放的就是你想要不检验token的api。
// const jwtAuth = eJwt({ secret: 'gene' }).unless(
//   {
//     path: ["/admin/login", "/admin/register", '/admin/user', '/admin/deluser', '/admin/banuser',
//       '/admin/edit-user', '/admin/user-info', '/admin/upload-img', '/admin/upload-cover', '/admin/arttype',
//       '/admin/arttype-add', '/admin/arttype-status', '/admin/arttype-edit', '/admin/arttype-del'
//       , '/admin/article-add', '/admin/article-edit', '/admin/article-del', '/admin/article',
//       '/admin/article-selone'
//     ]
//     // path: ["/admin/login", "/admin/register"]
//   }
// );

// module.exports = jwtAuth

const { checkToken } = require('../../untils/jwt')
const originalUrlarr = ['/admin/login', '/admin/register', '/admin/album']

// 不使用 express-jwt
module.exports = (req, res, next) => {
  if (originalUrlarr.indexOf(req.originalUrl) !== -1) { // 不用验证token
    return next()
  } else {
    const token = req.headers.authorization
    checkToken(token).then(data => {
      if (data) return next()
    }).catch(err => { // 验证失败
      return next()
      return res.send({ status: 403, msg: err })
    })
  }
}
