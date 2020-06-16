<template>
  <div class="single-widget-area about-me-widget text-center">
    <div class="widget-title">
      <h6>About Me</h6>
    </div>
    <div class="about-me-widget-thumb">
      <!--v-if是为了防止avatar为null时，请求路径出错-->
      <img v-if="aboutInfo.avatar" :src="'/api'+aboutInfo.avatar" alt />
    </div>
    <h4 class="font-shadow-into-light">{{aboutInfo.realname}}</h4>
    <p>{{aboutInfo.Introduction}}</p>
  </div>
</template>

<script>
export default {
  props: {
    aboutInfo: {
      type: Object,
      default () {
        return null
      }
    }
  },
  methods: {}
}
</script>
<style lang='scss' scoped>
</style>
