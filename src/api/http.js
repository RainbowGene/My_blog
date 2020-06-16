// axios二次封装
import axios from 'axios'

/**
* 根据环境配置 (开发、生产、测试) 接口默认地址
*/
switch (process.env.NOOD_ENV) {
  case 'production':
    axios.defaults.baseURL = 'http://api.Gene.cn'
    break
  case 'test':
    axios.defaults.baseURL = 'http://192.168.20.12:8080'
    break
  default:
    axios.defaults.baseURL = '/api'
    break
}

/**
 * 设置超时时间和跨域是否允许携带凭证
 */
axios.defaults.timeout = 5000
axios.defaults.withCredentials = true

/**
 * 设置请求传递数据的格式（看服务器要求什么格式）
 * x-www-form-urlencoded
 */
// axios.defaults.header['Content-Type'] = 'application/x-www-form-urlencoded';
// axios.defaults.transformRequest = data => { qs.stringify(data) }  //针对post请求

/**
 * 请求拦截器：token校验(JWT),接收服务器返回的token，存储到vuex/本地存储
 */
axios.interceptors.request.use(config => {
  // 携带token
  const token = sessionStorage.getItem('token')
  token && (config.headers.authorization = token)
  return config
}, err => {
  return Promise.reject(err)
})

/**
 * 响应拦截器
 * 服务器返回信息，
 */
// axios.defaults.validateStatus = status => {
//   // 自定义响应成功的HTTP状态码: 2/3开头的状态码走response,否则走error
//   return /^(2|3)\d{2}$/.test(status)
// }
axios.interceptors.response.use(response => {
  return response.data
}, error => {
  const { response } = error
  console.log(response.status)
  if (response) {
    // 服务器至少返回结果了
    switch (response.status) {
      case 401: // 未登录
        break
      case 403: // token验证失败或者过期
        break
      case 404: // 找不到页面
        break
    }
  } else {
    // 服务器没有返回结果 : 1,崩溃  2，客户端没网
    if (!window.navigator.onLine) {
      // 断网处理:跳转断网页面
      return
    }
    return Promise.reject(error)
  }
})

export default axios
