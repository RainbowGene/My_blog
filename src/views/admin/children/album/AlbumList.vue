<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>相册管理</el-breadcrumb-item>
      <el-breadcrumb-item>相册列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图 -->
    <el-card>
      <!-- 搜索/添加 -->
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input
            placeholder="关键字搜索(相册名)"
            v-model="queryInfo.query"
            clearable
            @clear="getAlbumList"
          >
            <el-button slot="append" icon="el-icon-search" @click="getAlbumList"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="addAlb()">添加相册</el-button>
        </el-col>
      </el-row>
      <!-- 类别列表区域 -->
      <el-table :data="albumList" border stripe>
        <el-table-column label="序号" type="index"></el-table-column>
        <el-table-column label="相册名" :show-overflow-tooltip="true" prop="albums"></el-table-column>
        <el-table-column fixed="right" label="操作" width="180px">
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" size="mini" @click="addAlb(scope.row)"></el-button>
            <el-button type="primary" icon="el-icon-share" size="mini" @click="toAlbum(scope.row)"></el-button>
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              @click="deleteAlb(scope.row)"
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

    <!-- 添加用户信息的对话框 -->
    <el-dialog :title="title" :visible.sync="addDialogVisible" width="50%" @close="addDialogClose">
      <!-- 内容主体区域 -->
      <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="70px">
        <el-form-item label="相册名" prop="albums">
          <el-input v-model="addForm.albums"></el-input>
        </el-form-item>
      </el-form>
      <!-- 底部按钮区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addAlbum">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      addForm: {
        albums: null
      },
      addDialogVisible: false,
      queryInfo: {
        query: '',
        page: 1,
        pagesize: 5
      },
      albumList: [],
      addFormRules: {
        albums: [
          { required: true, message: '请输入相册名', trigger: 'blur' },
          {
            min: 2,
            max: 10,
            message: '相册名长度在2-10个字符',
            trigger: 'blur'
          }
        ]
      },
      total: null,
      title: '添加相册',
      name: null
    }
  },
  mounted () {
    this.getAlbumList()
  },
  methods: {
    // 获取所有相册
    async getAlbumList () {
      const { status, albums } = await this.$api.admin.getAllAlbum(this.query)
      if (status === 200) {
        this.albumList = albums
      } else {
        this.$message.info('相册信息获取失败！')
      }
    },
    // 添加相册
    addAlbum () {
      if (this.name) {
        // 修改
        if (this.name === this.addForm.albums) { return this.$message.info('未做任何修改！') }
        // console.log(this.name); // 旧名称
        // console.log(this.addForm.albums); //新名称
        this.$api.admin.editAlbum(this.name, this.addForm.albums).then(res => {
          this.addDialogVisible = false
          this.getAlbumList()
          if (res.status === 200) return this.$message.success('修改成功')
          return this.$message.info('修改失败')
        })
      } else {
        // 添加
        const albumName = this.addForm.albums
        this.$refs.addFormRef.validate(async valid => {
          // 预验证
          if (!valid) return
          this.$api.admin.addAlbum(albumName).then(res => {
            this.addDialogVisible = false
            this.getAlbumList()
            if (res.status === 200) return this.$message.success('添加成功')
            return this.$message.error('添加失败')
          })
        })
      }
    },
    addDialogClose () {
      // 重置输入框
      this.$refs.addFormRef.resetFields()
    },
    async deleteAlb (item) {
      // console.log(item);
      const albumName = item.albums
      const confirmResult = await this.$confirm(
        '删除相册 ' + albumName + ' ？',
        '删除',
        {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).catch(err => err)
      if (confirmResult == 'cancel') return this.$message.info('操作取消')
      // 执行删除
      const { status, msg } = await this.$api.admin.delAlbum(albumName)
      if (status === 200) {
        this.$message.success(msg)
        return this.getAlbumList()
      }
      return this.$message.info('删除失败')
    },

    // 监听pagesize改变的事件
    handleSizeChange (newSize) {
      this.queryInfo.pagesize = newSize
      this.getAlbumList()
    },
    // 监听 页码值 改变的事件
    handleCurrentChange (newPage) {
      this.queryInfo.page = newPage
      this.getAlbumList()
    },
    addAlb (item) {
      this.addDialogVisible = true
      if (item) {
        this.title = '修改名称'
        this.name = item.albums
        this.addForm.albums = item.albums
      } else {
        this.title = '添加相册'
        this.name = null
        this.addForm.albums = ''
      }
    },
    toAlbum (item) {
      this.$router.push(`/picgroup/${item.albums}`)
    }
  }
}
</script>
<style lang='scss' scoped>
</style>
