const formidable = require('formidable')
const path = require('path')

module.exports = (req, res) => {
  // 0, bodyParse只能处理普通表单参数，而不能处理二进制数据,使用formidable：解析表单，支持get/post/文件上传
  // 1, 创建表单解析对象
  const form = new formidable.IncomingForm()
  // 2，客户端上传来的文件放在服务器public下的uploads
  form.uploadDir = path.join(__dirname, '../../public/img/article_img')
  // 3，配置保留文件后缀
  form.keepExtensions = true // 默认不保留 false
  // 4,解析表单
  // 4,解析表单
  form.parse(req, async (err, fields, files) => {
    /**
     * 1,错误信息，对象类型,解析成功为null
     * 2,普通表单数据: 对象类型
     * 3,对象类型：保存了和上传文件相关的数据
     *
     * * files中返回的对象中有个path属性，对应的是服务器端文件的地址
     *   客户端直接获取这个地址是不行的 , '/' 才能代表服务器资源路径
     */
    // 1,截取public之后的字符串
    const url = '/api' + files.upfile.path.split('public')[1].replace(/\\/g, '/') // 得到 /upload/upload_46515a56sd.jpg
    // console.log(url)
    res.send({ status: 200, url })
  })
}
