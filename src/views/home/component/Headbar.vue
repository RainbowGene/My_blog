<template>
  <div>
    <header class="header_area">
      <div class="container">
        <div class="row">
          <!-- Logo Area Start -->
          <div class="col-12">
            <div class="logo_area text-center">
              <a href="/home" class="yummy-logo">Gene Blog</a>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-12">
            <nav class="navbar navbar-expand-lg">
              <button
                :class="!onMenubtn?'navbar-toggler collapsed':'navbar-toggler'"
                type="button"
                data-toggle="collapse"
                data-target="#yummyfood-nav"
                aria-controls="yummyfood-nav"
                :aria-expanded="onMenubtn"
                aria-label="Toggle navigation"
                @click="onMenubtn=!onMenubtn"
              >
                <i class="fa fa-bars" aria-hidden="true"></i> Menu
              </button>
              <!-- Menu Area Start -->
              <div
                :class="!onMenubtn? 'navbar-collapse justify-content-center collapse':'navbar-collapse justify-content-center collapse show'"
                id="yummyfood-nav"
              >
                <ul class="navbar-nav" id="yummy-nav">
                  <li
                    :class="navname===item.title? 'nav-link active':'nav-link'"
                    v-for="(item,index) in navlist"
                    :key="index"
                    @click="navClick(item)"
                  >
                    <a class="nav-link">{{item.title}}</a>
                  </li>
                </ul>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </header>
  </div>
</template>

<script>
export default {
  data() {
    return {
      onMenubtn: false, // 菜单按钮是否点击
      navlist: [
        { path: "/index", title: "Home" },
        { path: "/arts", title: "Article" },
        { path: "/album", title: "Album" },
        { path: "/about", title: "About" },
        { path: "/contact", title: "Contact" }
      ],
      navname: "Home" // 默认选中
    };
  },
  created() {
    this.$bus.$on("headerBar", this.updateBar);
  },
  beforeDestroy() {
    this.$bus.$off("headerBar", this.updateBar);
  },
  methods: {
    navClick(item) {
      if (this.navname !== item.title) {
        this.navname = item.title;
        this.$router.push(item.path);
      }
    },
    updateBar(val) {
      this.navname = val;
    }
  }
};
</script>
<style lang='scss' scoped>
a {
  text-decoration: none;
}
.navbar-nav {
  li {
    cursor: pointer;
  }
}
</style>
