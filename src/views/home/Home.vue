<template>
  <div>
    <topbar></topbar>
    <headbar></headbar>
    <!-- <swiper></swiper> -->
    <selectbar></selectbar>
    <!-- 博客专区  -->
    <home-content></home-content>
  </div>
</template>

<script>
import Topbar from '@/components/content/Topbar'
import Headbar from './component/Headbar'
import Swiper from '@/components/common/Swiper'
import Selectbar from '@/components/common/Selectbar'
import HomeContent from './component/HomeContent'
export default {
  data () {
    return {}
  },
  components: {
    Topbar,
    Headbar,
    Swiper,
    Selectbar,
    HomeContent
  },
  methods: {}
}
</script>
<style lang='scss' scoped>
</style>
