<template>
  <!-- 首页内容：博客专区1、博客专区2、右侧边栏  -->
  <div>
    <selectbar></selectbar>
    <section class="blog_area section_padding_0_80">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-12 col-lg-8">
            <div class="row">
              <!-- 大板块文章 -->
              <div class="col-12" v-for="item in largeList" :key="item._id">
                <div class="single-post wow fadeInUp" data-wow-delay=".2s">
                  <div class="post-thumb">
                    <img :src="item.cover | imgSrc" alt />
                  </div>
                  <div class="post-content">
                    <div class="post-meta d-flex">
                      <div class="post-author-date-area d-flex">
                        <div class="post-author">
                          <a href="#">{{item.author.username}}</a>
                        </div>
                        <div class="post-date">
                          <a href="#">{{item.publishDate | aDate}}</a>
                        </div>
                      </div>
                      <div class="post-comment-share-area d-flex">
                        <div class="post-favourite">
                          <a href="#">
                            <i class="fa fa-heart-o" aria-hidden="true"></i>
                            {{item.likes}}
                          </a>
                        </div>
                        <div class="post-comments">
                          <a href="#">
                            <i class="fa fa-comment-o" aria-hidden="true"></i> 12
                          </a>
                        </div>
                        <div class="post-share">
                          <a href="#">
                            <i class="fa fa-share-alt" aria-hidden="true"></i>
                          </a>
                        </div>
                      </div>
                    </div>
                    <a href="#" @click="handleArticle(item._id)">
                      <h2 class="post-headline">{{item.title}}</h2>
                    </a>
                    <p class="item_content">{{item.content | formatContent}}</p>
                    <a href="#" class="read-more" @click="handleArticle(item._id)">详 情..</a>
                  </div>
                </div>
              </div>

              <!-- 中板块文章 -->
              <div class="col-12 col-md-6" v-for="item in mediumList" :key="item._id">
                <div class="single-post wow fadeInUp" data-wow-delay=".4s">
                  <div class="post-thumb">
                    <img :src="item.cover | imgSrc" alt />
                  </div>
                  <div class="post-content">
                    <div class="post-meta d-flex">
                      <div class="post-author-date-area d-flex">
                        <div class="post-author">
                          <a href="#">{{item.author.username}}</a>
                        </div>
                        <div class="post-date">
                          <a href="#">{{item.publishDate | aDate}}</a>
                        </div>
                      </div>
                      <div class="post-comment-share-area d-flex">
                        <div class="post-favourite">
                          <a href="#">
                            <i class="fa fa-heart-o" aria-hidden="true"></i>
                            {{item.likes}}
                          </a>
                        </div>
                        <div class="post-comments">
                          <a href="#">
                            <i class="fa fa-comment-o" aria-hidden="true"></i> 12
                          </a>
                        </div>
                        <div class="post-share">
                          <a href="#">
                            <i class="fa fa-share-alt" aria-hidden="true"></i>
                          </a>
                        </div>
                      </div>
                    </div>
                    <a href="#" @click="handleArticle(item._id)">
                      <h4 class="post-headline">{{item.title}}</h4>
                    </a>
                  </div>
                </div>
              </div>
              <!-- 小版块文章 -->
              <div class="col-12" v-for="item in samllList" :key="item._id">
                <div class="list-blog single-post d-sm-flex wow fadeInUpBig" data-wow-delay=".2s">
                  <div class="post-thumb">
                    <img :src="item.cover | imgSrc" alt />
                  </div>
                  <div class="post-content">
                    <div class="post-meta d-flex">
                      <div class="post-author-date-area d-flex">
                        <div class="post-author">
                          <a href="#">{{item.author.username}}</a>
                        </div>
                        <div class="post-date">
                          <a href="#">{{item.publishDate | aDate}}</a>
                        </div>
                      </div>
                      <div class="post-comment-share-area d-flex">
                        <div class="post-favourite">
                          <a href="#">
                            <i class="fa fa-heart-o" aria-hidden="true"></i>
                            {{item.likes}}
                          </a>
                        </div>
                        <div class="post-comments">
                          <a href="#">
                            <i class="fa fa-comment-o" aria-hidden="true"></i> 12
                          </a>
                        </div>
                        <div class="post-share">
                          <a href="#">
                            <i class="fa fa-share-alt" aria-hidden="true"></i>
                          </a>
                        </div>
                      </div>
                    </div>
                    <a href="#" @click="handleArticle(item._id)">
                      <h4 class="post-headline">{{item.title}}</h4>
                    </a>
                    <p class="item_content">{{item.content | formatContent}}</p>
                    <a href="#" class="read-more" @click="handleArticle(item._id)">详 情..</a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- ****** 内容侧边栏 ****** -->
          <div class="col-12 col-sm-8 col-md-6 col-lg-4">
            <div class="blog-sidebar mt-5 mt-lg-0">
              <!-- 关于我 -->
              <about :aboutInfo="aboutInfo"></about>

              <!-- Single Widget Area 链接 -->
              <more-link></more-link>

              <!-- Single Widget Area 右侧热门博客  -->
              <popular-blog :popularBlogList="popularBlogList"></popular-blog>

              <!-- Single Widget Area 书籍入口  -->
              <book-entrance></book-entrance>

              <!-- Single Widget Area 游客留言 -->
              <contact></contact>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import moment from "moment";
import Selectbar from "@/components/common/Selectbar";
import About from "@/components/content/Home/About";
import MoreLink from "@/components/content/Home/MoreLink";
import PopularBlog from "@/components/content/Home/PopularBlog";
import Contact from "@/components/content/Home/Contact";
import BookEntrance from "@/components/content/Home/BookEntrance";
export default {
  data() {
    return {
      aboutInfo: {},
      popularBlogList: [],
      queryInfo: {
        query: null,
        page: 1,
        pagesize: 10
      },
      largeList: [],
      mediumList: [],
      samllList: []
    };
  },
  components: {
    About,
    Selectbar,
    MoreLink,
    PopularBlog,
    Contact,
    BookEntrance
  },
  filters: {
    imgSrc(src) {
      return src != "" ? src : require("@/assets/img/blog-img/1.jpg");
    },
    aDate(date) {
      return moment(date).format("YYYY/MM/DD");
    },
    formatContent(content) {
      return content.replace(/<[^>]+>/g, "");
    }
  },
  created() {
    this.$bus.$emit("headerBar", "Home");
    this.getInfo();
    this.getArticle();
    this.popularBlogList = [
      {
        imgsrc: require("@/assets/img/sidebar-img/1.jpg"),
        title: "Top Wineries To Visit In England",
        time: "Tuesday, October 3, 2017"
      },
      {
        imgsrc: require("@/assets/img/sidebar-img/2.jpg"),
        title: "Top Wineries To Visit In England",
        time: "Tuesday, October 3, 2017"
      },
      {
        imgsrc: require("@/assets/img/sidebar-img/3.jpg"),
        title: "Top Wineries To Visit In England",
        time: "Tuesday, October 3, 2017"
      },
      {
        imgsrc: require("@/assets/img/sidebar-img/4.jpg"),
        title: "Top Wineries To Visit In England",
        time: "Tuesday, October 3, 2017"
      },
      {
        imgsrc: require("@/assets/img/sidebar-img/5.jpg"),
        title: "Top Wineries To Visit In England",
        time: "Tuesday, October 3, 2017"
      }
    ];
  },
  methods: {
    // 获取文章
    async getArticle() {
      const { data, status } = await this.$api.admin.getArticleList(
        this.queryInfo
      );
      if (status === 200) {
        console.log(data);
        for (let i = 0; i < data.records.length; i++) {
          if (i < 1) {
            this.largeList = [...data.records.slice(0, 1)];
          } else if (i < 5) {
            this.mediumList = [...data.records.slice(1, 5)];
          } else {
            this.samllList = [...data.records.slice(5, i)];
          }
        }
      }
    },
    // 获取关于我信息
    async getInfo() {
      const { data, status } = await this.$api.home.getInfo();
      if (status === 200) {
        this.aboutInfo = data[0];
      }
    },
    // 跳转文章详情页
    handleArticle(aid) {
      this.$bus.$emit("headerBar", "Article");
      this.$router.push(`/art/${aid}`);
    }
  }
};
</script>
<style lang='scss' scoped>
a {
  text-decoration: none;
}
.item_content {
  width: 300px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
