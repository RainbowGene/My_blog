// 连接数据库
// 引入mongoose模块
const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/my-blog', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('数据库连接成功！')
  })
  .catch(() => {
    console.log('数据库连接失败！')
  })
