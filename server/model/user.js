// 用户表
const mongoose = require('mongoose')
const joi = require('joi')

// 创建用户集合规则
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 20
  },
  email: {
    type: String,
    required: true,
    unique: true // 保证邮箱地址不重复
  },
  password: {
    type: String,
    required: true
  },
  // admin:超级管理员  normal：普通用户
  role: {
    type: String,
    required: true
  },
  ustate: {
    type: Number,
    default: 0 // 0:启用状态，1：禁用状态
  },
  regtime: {
    type: Date,
    default: Date.now
  }
})

// 创建集合
const User = mongoose.model('User', userSchema)

// User.create({
//   username: 'admin',
//   email: '1767386755@qq.com',
//   password: '123456',
//   role: 'admin',
//   state: 0
// }).then(() => {
//   console.log('已初始化管理员admin')
// }).catch(() => {
//   console.log('admin初始化失败')
// })

// 验证用户信息
const validateUser = user => { // 接收一个用户对象
  // 定义对象验证规则
  const schame = {
    username: joi.string().min(2).max(12).required().error(new Error('请输入正确的用户名')),
    email: joi.string().email().required().error(new Error('请输入格式正确的邮箱')),
    password: joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required().error(new Error('请输入适合的密码')),
    role: joi.string().valid('normal', 'admin').required().error(new Error('非法的角色')), // 只认 normar和admin
    ustate: joi.number().valid(0, 1, 2).required().error(new Error('非法的角色状态'))
  }
  // 实施验证
  return joi.validate(user, schame)
}

// 模块导出
module.exports = { User, validateUser }
