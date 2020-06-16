<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>相册管理</el-breadcrumb-item>
      <el-breadcrumb-item>相册列表 「{{albumName}}」</el-breadcrumb-item>
    </el-breadcrumb>

    <el-row>
      <el-col :span="4" v-for="(item, index) in picArr" :key="index">
        <el-card style="margin:5px;" :body-style="{ padding: '5px' }">
          <img :src="`/api/img/album_img/${albumName}/${item}`" class="image" />
          <div style="padding: 14px;">
            <div class="bottom clearfix">
              <span>{{item}}</span>
              <el-button style="float:right;" type="text" class="button" @click="delimg(item)">删除</el-button>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data () {
    return {
      albumName: '',
      picArr: []
    }
  },
  mounted () {
    this.albumName = this.$route.params.album
    this.getAllpic()
  },
  methods: {
    // 查询图集
    async getAllpic () {
      const res = await this.$api.admin.getGroupPic(this.albumName)
      if (res.status === 200) {
        this.picArr = res.imgArr
        // console.log(this.picArr);
        return
      }
      return this.$message.info('查询图集失败')
    },
    async delimg (item) {
      // console.log(item);
      if ((this.albumName, item)) {
        const confirmResult = await this.$confirm(
          '删除图片 ' + item + ' ？',
          '删除',
          {
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            type: 'warning'
          }
        ).catch(err => err)
        if (confirmResult == 'cancel') return this.$message.info('操作取消')
        const res = await this.$api.admin.delPic(this.albumName, item)
        if (res.status === 200) {
          this.getGroupPic()
          return this.$message.success('删除成功')
        }
        return this.$message.info('删除失败！')
      }
    }
  }
}
</script>
<style lang='scss' scoped>
</style>
