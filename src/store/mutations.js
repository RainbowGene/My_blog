export default {
  // 设置登录用户的基本信息
  setUserInfo (state, user) {
    sessionStorage.setItem('username', user.username)
    sessionStorage.setItem('id', user.id)
    sessionStorage.setItem('role', user.role)
    sessionStorage.setItem('isLogin', true)
    // 同步改变 vuex 中的状态
    state.userInfo = user
    state.isLogin = true
  },
  logOut (state) {
    // 清除缓存
    sessionStorage.removeItem('username')
    sessionStorage.removeItem('id')
    sessionStorage.removeItem('role')
    sessionStorage.removeItem('isLogin')
    sessionStorage.removeItem('token')
    sessionStorage.removeItem('activePath')
    // 同步改变状态
    state.userInfo = {}
    state.isLogin = false
  }
}
