<template>
  <!-- 顶部条 -->
  <div>
    <div class="top_header_area">
      <div class="container">
        <div class="row">
          <div class="col-5 col-sm-6">
            <!--  Top Social bar start -->
            <div class="top_social_bar">
              <a href="#">
                <i class="fa fa-facebook" aria-hidden="true"></i>
              </a>
              <a href="#">
                <i class="fa fa-twitter" aria-hidden="true"></i>
              </a>
              <a href="#">
                <i class="fa fa-linkedin" aria-hidden="true"></i>
              </a>
              <a href="#">
                <i class="fa fa-skype" aria-hidden="true"></i>
              </a>
              <a href="#">
                <i class="fa fa-dribbble" aria-hidden="true"></i>
              </a>
            </div>
          </div>
          <!--  Login Register Area -->
          <div class="col-7 col-sm-6">
            <div class="signup-search-area d-flex align-items-center justify-content-end">
              <div v-if="searchHidden" class="login_register_area d-flex">
                <div class="login">
                  <a href="/adminLogin">登录</a>
                </div>
                <div class="register">
                  <a href="/register">注册</a>
                </div>
              </div>
              <!-- Search Button Area -->
              <div v-if="searchHidden" class="search_button">
                <a class="searchBtn">
                  <i class="fa fa-search" aria-hidden="true" @click="searchHidden=!searchHidden"></i>
                </a>
              </div>
              <!-- Search Form -->
              <div
                v-if="!searchHidden"
                :class="searchHidden?'search-hidden-form':'search-hidden-form search-form-open'"
              >
                <form action="#" method="get" onsubmit="false">
                  <input
                    type="search"
                    name="search"
                    id="search-anything"
                    v-model="searchQuery"
                    placeholder="Search Anything..."
                  />
                  <input type="submit" class="d-none" />
                  <span class="searchBtn">
                    <i class="fa fa-times" aria-hidden="true" @click="searchHidden=!searchHidden"></i>
                    <i class="fa fa-search" aria-hidden="true" @click="getSearch"></i>
                  </span>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      searchHidden: true,
      searchQuery: ''
    }
  },
  methods: {
    // 搜索
    getSearch () {
      console.log(this.searchQuery)
    }
  }
}
</script>
<style lang='scss' scoped>
.fa-times {
  position: relative;
  right: 20px;
}
</style>
