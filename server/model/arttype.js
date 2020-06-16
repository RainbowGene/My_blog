/**
 * 文章类别表
 */

const mongoose = require('mongoose')

const typeSchema = new mongoose.Schema({
  typename: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 10
  },
  typeStatus: {
    type: Number,
    default: 0 // 0启用，1禁用
  }
})

const Arttype = mongoose.model('Arttype', typeSchema)

module.exports = { Arttype }
