/**
 * 首页的网络请求
 */
import axios from './http'
import qs from 'qs'

// 个人信息
function getInfo () {
  return axios.get('/home/meinfo')
}

export default {
  getInfo
}
