<template>
  <!-- 热门博客 -->
  <div class="single-widget-area popular-post-widget">
    <div class="widget-title text-center">
      <h6>Populer Post</h6>
    </div>
    <!-- Single Popular Post -->
    <div class="single-populer-post d-flex" v-for="(item,index) in popularBlogList" :key="index">
      <img :src="item.imgsrc" alt />
      <div class="post-content">
        <a href="#">
          <h6>{{item.title}}</h6>
        </a>
        <p>{{item.time}}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {}
  },
  props: {
    popularBlogList: {
      type: Array,
      default () {
        return []
      }
    }
  },
  components: {},

  computed: {},

  methods: {}
}
</script>
<style lang='scss' scoped>
h6 {
  color: black;
}
a {
  text-decoration: none;
}
</style>
