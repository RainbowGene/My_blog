/**
 * 管理系统的网络请求
 */
import axios from './http'
import qs from 'qs'

// #region 登录及用户相关
// 登录
function login(loginform) {
  return axios.post('/admin/login', qs.stringify(loginform))
}

// 注册/添加用户
function register(regform) {
  return axios.post('/admin/register', qs.stringify(regform))
}

// 用户列表
function getUserlist(queryinfo) {
  return axios.get('/admin/user', { params: queryinfo })
}

// 账户状态（启用/封禁）
function unbanUser(query) {
  return axios.get('/admin/banuser', { params: query })
}

// 删除用户
function delUser(id) {
  return axios.get('/admin/deluser', { params: { id } })
}

// 用户详情
function getUserInfo(id) {
  return axios.get('/admin/user-info', { params: { id } })
}
// #endregion

// #region 文章相关
// 文章类别列表
function getArttype(queryinfo) {
  return axios.get('/admin/arttype', { params: queryinfo })
}

// 文章类别添加
function addArttype(addForm) {
  return axios.post('/admin/arttype-add', qs.stringify(addForm))
}

// 文章类别修改
function upArttype(upForm) {
  return axios.post('/admin/arttype-edit', qs.stringify(upForm))
}

// 禁用/启用文章类别
function setArttype(query) {
  return axios.get('/admin/arttype-status', { params: query })
}

// 删除文章类别
function delArttype(id) {
  return axios.get('/admin/arttype-del', { params: id })
}

// 查询文章列表
function getArticleList(form) {
  return axios.get('/admin/article', { params: form })
}

// 文章添加
function addArticle(form) {
  return axios.post('/admin/article-add', qs.stringify(form))
}

// 根据id查询单个文章的详情
function getArtOne(aid) {
  return axios.get('/admin/article-selone', { params: aid })
}

// 文章删除
function delArticle(id) {
  return axios.get('/admin/article-del', { params: id })
}

// 文章修改
function editArticle(form) {
  return axios.post('/admin/article-edit', qs.stringify(form))
}
// #endregion

// #region 相册管理相关
// 添加相册(文件夹)
function addAlbum(albumName) {
  return axios.get('/admin/album-add', { params: { albumName } })
}

// 删除相册
function delAlbum(albumName) {
  return axios.get('/admin/album-del', { params: { albumName } })
}

// 修改相册名
function editAlbum(oldName, newName) {
  return axios.get('/admin/album-edit', { params: { oldName, newName } })
}

// 查询所有相册
function getAllAlbum(query) {
  return axios.get('/admin/album', { params: query })
}

// 查询图集
function getGroupPic(albumName) {
  return axios.get('/admin/album-show', { params: { albumName } })
}

// 删除图片
function delPic(albumName, picName) {
  return axios.get('/admin/album-delimg', { params: { albumName, picName } })
}

// #endregion
export default {
  login,
  register,
  getUserlist,
  unbanUser,
  delUser,
  getUserInfo,
  getArttype,
  setArttype,
  upArttype,
  addArttype,
  delArttype,
  getArticleList,
  addArticle,
  editArticle,
  delArticle,
  getArtOne,
  addAlbum,
  delAlbum,
  getAllAlbum,
  editAlbum,
  getGroupPic,
  delPic
}
