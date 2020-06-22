<template>
  <div>
    <!-- 头部图片 -->
    <div class="breadcumb-area">
      <div class="container h-100">
        <div class="row h-100 align-items-center">
          <div class="col-12">
            <div class="bradcumb-title text-center">
              <h2>Archive Page</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 头部图片 end -->
    <!-- 面包屑导航 -->
    <div class="breadcumb-nav">
      <div class="container">
        <div class="row">
          <div class="col-12">
            <nav aria-label="breadcrumb">
              <ol class="breadcrumb">
                <li class="breadcrumb-item">
                  <a>
                    <i class="fa fa-home" aria-hidden="true"></i> Home
                  </a>
                </li>
                <li class="breadcrumb-item">
                  <a>Archive</a>
                </li>
                <li class="breadcrumb-item active" aria-current="page">Static Page</li>
              </ol>
            </nav>
          </div>
        </div>
      </div>
    </div>
    <!-- 面包屑导航 end -->
    <!-- 文章列表 -->
    <section class="archive-area section_padding_80">
      <div class="container">
        <div class="row">
          <div class="col-12 col-md-6" v-for="item in articleList" :key="item._id">
            <div class="single-post wow fadeInUp" data-wow-delay=".4s">
              <div class="post-thumb" @click="handleArticle(item._id)">
                <img :src="item.cover" alt />
              </div>
              <div class="post-content">
                <div class="post-meta d-flex">
                  <div class="post-author-date-area d-flex">
                    <div class="post-author">
                      <a href="#">By {{item.author.username}}</a>
                    </div>
                    <div class="post-date">
                      <a href="#">{{item.publishDate}}</a>
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
                        <i class="fa fa-comment-o" aria-hidden="true"></i>
                        {{item.comments}}
                      </a>
                    </div>
                    <div class="post-share">
                      <a href="#">
                        <i class="fa fa-share-alt" aria-hidden="true"></i>
                      </a>
                    </div>
                  </div>
                </div>
                <a href="#">
                  <h4 class="post-headline" @click="handleArticle(item._id)">{{item.title}}</h4>
                </a>
              </div>
            </div>
          </div>
          <!-- 分页 -->
          <div class="col-12">
            <div class="pagination-area d-sm-flex mt-15">
              <nav aria-label="#">
                <ul class="pagination">
                  <li class="page-item" v-if="queryInfo.page!==1">
                    <a class="page-link" @click="handlePage(-1)">
                      <i class="fa fa-angle-double-left" aria-hidden="true"></i>
                      上一页
                    </a>
                  </li>
                  <li
                    :class="item===queryInfo.page?'page-item active':'page-item'"
                    v-for="item in pages"
                    :key="item"
                  >
                    <a class="page-link" @click="toPage(item)">{{item}}</a>
                  </li>
                  <li class="page-item" v-if="pages!==queryInfo.page">
                    <a class="page-link" @click="handlePage(1)">
                      下一页
                      <i class="fa fa-angle-double-right" aria-hidden="true"></i>
                    </a>
                  </li>
                </ul>
              </nav>
              <div class="page-status">
                <p>当前页: {{queryInfo.page}} / 总条数: {{total}}</p>
              </div>
            </div>
          </div>
          <!-- 分页 end -->
        </div>
      </div>
    </section>
    <!-- 文章列表 end -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      articleList: [],
      queryInfo: {
        query: null,
        page: 1, // 当前页
        pagesize: 8
      },
      total: 0, // 总条数
      pages: 0 //总页数
    };
  },
  created() {
    this.$bus.$emit("headerBar", "Article");
    this.getArticle();
  },
  methods: {
    // 获取文章
    async getArticle() {
      const { data, status } = await this.$api.admin.getArticleList(
        this.queryInfo
      );
      if (status === 200) {
        console.log(data);
        this.pages = data.pages;
        this.total = data.total;
        this.articleList = data.records;
      }
    },
    handlePage(num) {
      this.queryInfo.page += num;
      this.getArticle();
    },
    toPage(index) {
      this.queryInfo.page = index;
      this.getArticle();
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
.breadcrumb {
  li {
    cursor: pointer;
  }
}
.breadcumb-area {
  background-image: url("../../../../assets/img/bg-img/breadcumb.jpg");
}
a {
  text-decoration: none;
  cursor: pointer;
}
</style>