<template>
  <div>
    <!-- 头部 -->
    <div class="breadcumb-area">
      <div class="container h-100">
        <div class="row h-100 align-items-center">
          <div class="col-12">
            <div class="bradcumb-title text-center">
              <h2>Single Post Blog</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="breadcumb-nav">
      <div class="container">
        <div class="row">
          <div class="col-12">
            <nav aria-label="breadcrumb">
              <ol class="breadcrumb">
                <li class="breadcrumb-item">
                  <a @click="this.$router.push('/home')">
                    <i class="fa fa-home" aria-hidden="true"></i> 首页
                  </a>
                </li>
                <li class="breadcrumb-item">
                  <a>文章</a>
                </li>
                <li class="breadcrumb-item active" aria-current="page">文章详情</li>
              </ol>
            </nav>
          </div>
        </div>
      </div>
    </div>
    <!-- 头部 end -->
    <!-- 主体内容 -->
    <section class="single_blog_area section_padding_80">
      <div class="container">
        <div class="row justify-content-center">
          <!-- 文章内容 -->
          <div class="col-12 col-lg-8">
            <div class="row no-gutters">
              <!-- 左侧链接图标 -->
              <div class="col-1 col-sm-1">
                <div class="single-post-share-info mt-100">
                  <a href="#" class="facebook">
                    <i class="fa fa-facebook" aria-hidden="true"></i>
                  </a>
                  <a href="#" class="twitter">
                    <i class="fa fa-twitter" aria-hidden="true"></i>
                  </a>
                  <a href="#" class="googleplus">
                    <i class="fa fa-google-plus" aria-hidden="true"></i>
                  </a>
                  <a href="#" class="instagram">
                    <i class="fa fa-instagram" aria-hidden="true"></i>
                  </a>
                  <a href="#" class="pinterest">
                    <i class="fa fa-pinterest" aria-hidden="true"></i>
                  </a>
                </div>
              </div>

              <!-- 文章内容 -->
              <div v-if="article" class="col-10 col-sm-11">
                <div class="single-post">
                  <div class="post-thumb">
                    <img :src="article.cover" alt />
                  </div>
                  <div class="post-content">
                    <div class="post-meta d-flex">
                      <div class="post-author-date-area d-flex">
                        <div class="post-author">
                          <a>{{article.author.username}}</a>
                        </div>
                        <div class="post-date">
                          <a>{{article.publishDate}}</a>
                        </div>
                      </div>
                      <div class="post-comment-share-area d-flex">
                        <div class="post-favourite">
                          <a>
                            <i class="fa fa-heart-o" aria-hidden="true"></i>
                            {{article.likes}}
                          </a>
                        </div>
                        <div class="post-comments">
                          <a>
                            <i class="fa fa-comment-o" aria-hidden="true"></i> 12
                          </a>
                        </div>
                        <div class="post-share">
                          <a>
                            <i class="fa fa-share-alt" aria-hidden="true"></i>
                          </a>
                        </div>
                      </div>
                    </div>
                    <a>
                      <h2 class="post-headline">{{article.title}}</h2>
                    </a>
                    <div ref="artcontent" v-html="article.content"></div>
                  </div>
                </div>

                <!-- 关键字 -->
                <div class="tags-area">
                  <a href="#">Multipurpose</a>
                  <a href="#">Design</a>
                  <a href="#">Ideas</a>
                </div>
                <!-- 关键字 end -->
                <!-- 评论展示 -->
                <div class="comment_area section_padding_50 clearfix">
                  <h4 class="mb-30">2 条</h4>
                  <ol>
                    <!-- Single Comment Area -->
                    <li class="single_comment_area">
                      <div class="comment-wrapper d-flex">
                        <!-- Comment Meta -->
                        <div class="comment-author">
                          <img src="@/assets/img/blog-img/17.jpg" alt />
                        </div>
                        <!-- Comment Content -->
                        <div class="comment-content">
                          <span class="comment-date text-muted">27 Aug 2018</span>
                          <h5>Brandon Kelley</h5>
                          <p>
                            Neque porro qui squam est, qui dolorem ipsum quia dolor sit amet,
                            consectetur, adipisci velit, sed quia non numquam eius modi tempora.
                          </p>
                          <a href="#">Like</a>
                          <a class="active" href="#">Reply</a>
                        </div>
                      </div>
                      <ol class="children">
                        <li class="single_comment_area">
                          <div class="comment-wrapper d-flex">
                            <!-- Comment Meta -->
                            <div class="comment-author">
                              <img src="@/assets/img/blog-img/18.jpg" alt />
                            </div>
                            <!-- Comment Content -->
                            <div class="comment-content">
                              <span class="comment-date text-muted">27 Aug 2018</span>
                              <h5>Brandon Kelley</h5>
                              <p>
                                Neque porro qui squam est, qui dolorem ipsum quia dolor sit
                                amet, consectetur, adipisci velit, sed quia non numquam eius
                                modi tempora.
                              </p>
                              <a href="#">Like</a>
                              <a class="active" href="#">Reply</a>
                            </div>
                          </div>
                        </li>
                      </ol>
                    </li>
                    <li class="single_comment_area">
                      <div class="comment-wrapper d-flex">
                        <!-- Comment Meta -->
                        <div class="comment-author">
                          <img src="@/assets/img/blog-img/19.jpg" alt />
                        </div>
                        <!-- Comment Content -->
                        <div class="comment-content">
                          <span class="comment-date text-muted">27 Aug 2018</span>
                          <h5>Brandon Kelley</h5>
                          <p>
                            Neque porro qui squam est, qui dolorem ipsum quia dolor sit amet,
                            consectetur, adipisci velit, sed quia non numquam eius modi tempora.
                          </p>
                          <a href="#">Like</a>
                          <a class="active" href="#">Reply</a>
                        </div>
                      </div>
                    </li>
                  </ol>
                </div>
                <!-- 评论展示 end -->
                <!-- 发布评论  -->
                <div class="leave-comment-area section_padding_50 clearfix">
                  <div class="comment-form">
                    <h4 class="mb-30">Leave A Comment</h4>
                    <form action="#" method="post">
                      <div class="form-group">
                        <input
                          type="text"
                          class="form-control"
                          id="contact-name"
                          placeholder="Name"
                        />
                      </div>
                      <div class="form-group">
                        <input
                          type="email"
                          class="form-control"
                          id="contact-email"
                          placeholder="Email"
                        />
                      </div>
                      <div class="form-group">
                        <input
                          type="text"
                          class="form-control"
                          id="contact-website"
                          placeholder="Website"
                        />
                      </div>
                      <div class="form-group">
                        <textarea
                          class="form-control"
                          name="message"
                          id="message"
                          cols="30"
                          rows="10"
                          placeholder="Message"
                        ></textarea>
                      </div>
                      <button type="submit" class="btn contact-btn">Post Comment</button>
                    </form>
                  </div>
                </div>
                <!-- 发布评论 end -->
              </div>
            </div>
          </div>

          <!-- ****** 侧边栏 ****** -->
          <div class="col-12 col-sm-8 col-md-6 col-lg-3">
            <!-- Single Widget Area 右侧热门博客  -->
            <popular-blog :popularBlogList="popularBlogList"></popular-blog>
            <!-- Single Widget Area 链接 -->
            <more-link></more-link>
            <!-- Single Widget Area 游客留言 -->
            <contact></contact>
          </div>
        </div>
      </div>
    </section>
    <!-- 主体内容 end -->
  </div>
</template>

<script>
import MoreLink from "@/components/content/Home/MoreLink";
import PopularBlog from "@/components/content/Home/PopularBlog";
import Contact from "@/components/content/Home/Contact";
export default {
  data() {
    return {
      aid: null,
      article: null, // 文章对象
      popularBlogList: [
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
      ]
    };
  },

  components: {
    MoreLink,
    PopularBlog,
    Contact
  },
  created() {
    this.$bus.$emit("headerBar", "Article");
    this.aid = this.$route.params.aid;
    this.getArticle();
  },
  methods: {
    async getArticle() {
      const { data, status } = await this.$api.admin.getArtOne({
        aid: this.aid
      });
      if (status === 200 && data) {
        console.log(data);
        this.article = data;
        // tinyMCE 编辑器中
        this.article.content = this.article.content.split("api").join("/api"); 
      }
    }
  }
};
</script>
<style lang='scss' scoped>
.breadcumb-area {
  background-image: url("../../../../assets/img/bg-img/breadcumb.jpg");
}
a {
  text-decoration: none;
  cursor: pointer;
}
</style>