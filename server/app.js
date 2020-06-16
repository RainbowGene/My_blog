const express = require('express')
const app = express()
const path = require('path')
// 引入body-parser
const bodyParser = require('body-parser')
const home = require('./route/home')
const admin = require('./route/admin')
require('./model/connect')
// require('./model/user') //测试创建admin

// 处理post请求参数
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// 开放静态资源文件
app.use(express.static(path.join(__dirname, './public')))

// 为路由匹配请求路径
app.use('/home', home)
app.use('/admin', admin)

app.listen(3000)

console.log('服务器启动成功')
