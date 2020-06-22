<template>
  <div class="bg-pattern">
    <topbar></topbar>
    <headbar></headbar>
    <!-- <swiper></swiper> -->
    <!-- 博客专区  -->
    <!-- 子路由路由占位符 -->
    <router-view></router-view>
    <!-- <home-content></home-content> -->
  </div>
</template>

<script>
import Topbar from "@/components/content/Topbar";
import Headbar from "./component/Headbar";
import Swiper from "@/components/common/Swiper";
export default {
  data() {
    return {};
  },
  components: {
    Topbar,
    Headbar,
    Swiper
  },
  methods: {}
};
</script>
<style lang='scss' scoped>
</style>
