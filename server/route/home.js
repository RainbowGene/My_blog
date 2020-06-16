// 博客管理页面路由
const express = require('express')
const home = express.Router()

// 用户登录  下载 npm install body-parser
home.get('/home', (req, res) => {
  res.send('欢迎来到博客首页')
})

// 我的信息
home.get('/meinfo', require('./home/meinfo'))

module.exports = home
