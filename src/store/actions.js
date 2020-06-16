export default {
  // 设置用户登录信息
  setUserLogin ({ commit }, user) {
    commit('setUserInfo', user)
  },
  // 退出登录
  logOut ({ commit }) {
    commit('logOut')
  }
}
