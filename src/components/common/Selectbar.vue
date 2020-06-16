<template>
  <div>
    <section class="categories_area clearfix" id="about">
      <div class="container">
        <div class="row">
          <div class="col-12 col-md-6 col-lg-4" v-for="(item,index) in selectList" :key="index">
            <div class="single_catagory wow fadeInUp" :data-wow-delay="item.delay">
              <img :src="item.imgsrc" alt />
              <div class="catagory-title">
                <a href="#">
                  <h5>{{item.title}}</h5>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data () {
    return {
      selectList: [
        {
          imgsrc: require('@/assets/img/catagory-img/1.jpg'),
          title: '文章',
          delay: '.3s',
          path: ''
        },
        {
          imgsrc: require('@/assets/img/catagory-img/2.jpg'),
          title: '相册',
          delay: '.6s',
          path: ''
        },
        {
          imgsrc: require('@/assets/img/catagory-img/3.jpg'),
          title: '生活',
          delay: '.9s',
          path: ''
        }
      ]
    }
  },

  components: {},

  computed: {},

  methods: {}
}
</script>
<style lang='scss' scoped>
a {
  text-decoration: none;
}
</style>
