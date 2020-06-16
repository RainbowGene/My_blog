/**
 * 用户详情
 */

const mongoose = require('mongoose')

const userinfoSchema = new mongoose.Schema({
  iid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  realname: {
    type: String
  },
  phone: {
    type: String,
    maxlength: 20
  },
  Introduction: { // 个人简介(自我介绍)
    type: String,
    maxlength: 300
  },
  experience: { // 经历
    type: Array,
    default: []
    /**
     *   [{'2007-2008':'干了啥','2008-2009':'又在干啥'}]
     */
  },
  avatar: { // 头像
    type: String,
    default: '/ava_img/defAvatar.jpg' // 默认头像路径
  },
  lasttime: {
    type: Date,
    default: Date.now
  }
})

const UserInfo = mongoose.model('UserInfo', userinfoSchema)

module.exports = { UserInfo }
