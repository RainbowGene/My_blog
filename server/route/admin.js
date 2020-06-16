// 博客管理页面路由
const express = require('express')
const admin = express.Router()

// 添加 token 认证
admin.use(require('./admin/retoken'))

// #region 登录及用户相关
// 用户登录  下载 npm install body-parser
admin.post('/login', require('./admin/user/login'))

// 注册
admin.post('/register', require('./admin/user/register'))

// 用户列表
admin.get('/user', require('./admin/user/user'))

// 用户封禁
admin.get('/banuser', require('./admin/user/banuser'))

// 用户删除
admin.get('/deluser', require('./admin/user/deluser'))

// 用户详细信息编辑
admin.post('/edit-user', require('./admin/user/edit-user'))

// 查询用户信息
admin.get('/user-info', require('./admin/user/user-info'))

// 注销
admin.get('/logout', require('./admin/user/logout'))
// #endregion

// #region 文章管理相关
// 编辑器中上传图片
admin.post('/upload-img', require('./admin/upload-img'))

// 上传封面
admin.post('/upload-cover', require('./admin/upload-cover'))

// 文章类别列表
admin.get('/arttype', require('./admin/arttype/arttype'))

// 添加文章类别
admin.post('/arttype-add', require('./admin/arttype/arttype-add'))

// 修改文章类别
admin.post('/arttype-edit', require('./admin/arttype/arttype-edit'))

// 文章类别删除
admin.get('/arttype-del', require('./admin/arttype/arttype-del'))

// 启用/禁用文章类别
admin.get('/arttype-status', require('./admin/arttype/arttype-status'))

// 文章列表
admin.get('/article', require('./admin/article/article'))

// 文章添加
admin.post('/article-add', require('./admin/article/article-add'))

// 文章修改
admin.post('/article-edit', require('./admin/article/article-edit'))

// 文章删除
admin.get('/article-del', require('./admin/article/article-del'))

// 文章查询（id查询单篇文章详情）
admin.get('/article-selone', require('./admin/article/article-selone'))

// #endregion

// #region 相册管理相关
// 获取所有相册信息
admin.get('/album', require('./admin/album/album'))

// 添加相册
admin.get('/album-add', require('./admin/album/album-add'))

// 删除相册
admin.get('/album-del', require('./admin/album/album-del'))

// 相册下的图片
admin.get('/album-show', require('./admin/album/album-show'))

// 删除图片
admin.get('/album-delimg', require('./admin/album/delimg'))

// 修改相册名
admin.get('/album-edit', require('./admin/album/album-edit'))

// #endregion

module.exports = admin
