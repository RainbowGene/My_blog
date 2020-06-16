<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>文章管理</el-breadcrumb-item>
      <el-breadcrumb-item>文章列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图 -->
    <el-card>
      <!-- 搜索/添加 -->
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input
            placeholder="(标题/内容)关键字"
            v-model="queryInfo.query"
            clearable
            @clear="getArticleList"
          >
            <el-button slot="append" icon="el-icon-search" @click="getArticleList"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="addArticle">添加文章</el-button>
        </el-col>
      </el-row>
      <!-- 类别列表区域 -->
      <el-table :data="articleList" border stripe>
        <el-table-column label="序号" type="index"></el-table-column>
        <el-table-column label="标题" :show-overflow-tooltip="true" prop="title"></el-table-column>
        <!-- <el-table-column :show-overflow-tooltip="true" label="内容" prop="content"></el-table-column> -->
        <el-table-column label="作者" prop="author.username"></el-table-column>
        <el-table-column label="所属类别" prop="type.typename"></el-table-column>
        <el-table-column label="发布时间" prop="publishDate">
          <template slot-scope="scope">{{scope.row.publishDate | formatDate}}</template>
        </el-table-column>
        <!-- <el-table-column label="文章状态" prop="status">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.status"
              :active-value="1"
              :inactive-value="0"
              @change="artStatusChanged(scope.row)"
            ></el-switch>
          </template>
        </el-table-column>-->
        <el-table-column fixed="right" label="操作" width="180px">
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" size="mini" @click="editArt(scope.row)"></el-button>
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              @click="deleteArt(scope.row)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.page"
        :page-sizes="[5, 10]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-card>
  </div>
</template>

<script>
import { dateFormat } from '@/plugins/dateFormat'
export default {
  data () {
    return {
      queryInfo: {
        query: null,
        page: 1,
        pagesize: 5
      },
      articleList: [],
      total: null
    }
  },
  mounted () {
    this.getArticleList()
  },
  methods: {
    async getArticleList () {
      const res = await this.$api.admin.getArticleList(this.queryInfo)
      // console.log(res);
      if (res.status === 200) {
        this.articleList = res.data.records
        this.total = res.data.total
      } else {
        return this.$message.info('文章列表加载失败!')
      }
    },
    addArticle () {
      this.$router.push('/article-add')
    },
    // 修改文章
    editArt (item) {
      // 使用路由传值？ 传入文章id
      // console.log(item._id);
      this.$router.push(`/article-add?aid=${item._id}`)
    },
    // artStatusChanged(item) { // 文章状态发生改变 },
    // 删除文章
    async deleteArt (item) {
      const id = item._id
      const confirmResult = await this.$confirm(
        '删除文章《' + item.title + '》？',
        '删除',
        {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).catch(err => err)
      if (confirmResult == 'cancel') return this.$message.info('操作取消')
      const { status } = await this.$api.admin.delArticle({ id })
      if (status === 200) {
        this.getArticleList()
        return this.$message.success('删除成功')
      }
      return this.$message.info('操作失败')
    },
    // 监听pagesize改变的事件
    handleSizeChange (newSize) {
      this.queryInfo.pagesize = newSize
      this.getArticleList()
    },
    // 监听 页码值 改变的事件
    handleCurrentChange (newPage) {
      this.queryInfo.page = newPage
      this.getArticleList()
    }
  },
  filters: {
    // 格式化时间过滤器
    formatDate (time) {
      var date = new Date(time) // 这里time要乘以1000
      return dateFormat(date, 'yyyy-MM-dd hh:mm')
    }
  }
}
</script>
<style lang='scss' scoped>
</style>
