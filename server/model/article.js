/**
 * 文章表
 */

const mongoose = require('mongoose')

const articleSchema = new mongoose.Schema({
  title: {
    type: String,
    maxlength: 50,
    minlength: 1,
    required: [true, 'sql err：未填写标题']
  },
  author: { // 关联用户表
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'sql err：未传递用户']
  },
  cover: {
    type: String,
    default: null // 封面默认为null
  },
  type: { // 关联类别表
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Arttype',
    required: [true, 'sql err：未传递作者']
  },
  label: {
    type: Array,
    default: []
  },
  content: {
    type: String,
    minlength: 2,
    maxlength: 5000,
    required: [true, 'sql err：未传递内容']
  },
  likes: {
    type: Number,
    default: 0
  },
  collect: {
    type: Number,
    default: 0
  },
  comments: {
    type: Number,
    default: 0
  },
  publishDate: { // 发布时间
    type: Date,
    default: Date.now
  },
  lastDate: { // 上次修改时间
    type: Date,
    default: Date.now
  },
  status: {
    type: Number,
    default: 0 // 0 草稿，1 发布，2 屏蔽
  },
  recommend: {
    type: Number,
    default: 0 // 0 不推荐、1 推荐
  }
})

const Article = mongoose.model('Article', articleSchema)

module.exports = { Article }
