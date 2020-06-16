<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>文章管理</el-breadcrumb-item>
      <el-breadcrumb-item>类别列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图 -->
    <el-card>
      <!-- 搜索/添加 -->
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input
            placeholder="请输入内容"
            v-model="queryInfo.query"
            clearable
            @clear="getArticleTypeList"
          >
            <el-button slot="append" icon="el-icon-search" @click="getArticleTypeList"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="addType()">添加类别</el-button>
        </el-col>
      </el-row>
      <!-- 类别列表区域 -->
      <el-table :data="arttypeList" border stripe>
        <el-table-column label="序号" type="index"></el-table-column>
        <el-table-column label="类别名" prop="typename"></el-table-column>
        <!-- <el-table-column label="类别状态" prop="typeStatus">
          <template slot-scope="scope">{{scope.row.typeStatus===0?'已启用':'已禁用'}}</template>
        </el-table-column>-->
        <el-table-column label="禁用状态" prop="typeStatus">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.typeStatus"
              :active-value="1"
              :inactive-value="0"
              @change="userStatusChanged(scope.row)"
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180px">
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" size="mini" @click="addType(scope.row)"></el-button>
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              @click="deleteType(scope.row)"
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

      <!-- 添加类别的对话框 -->
      <el-dialog
        :title="formTitle"
        :visible.sync="addDialogVisible"
        width="50%"
        @close="addDialogClose"
      >
        <!-- 内容主体区域 -->
        <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="70px">
          <el-form-item label="类别名" prop="typename">
            <el-input v-model="addForm.typename"></el-input>
          </el-form-item>
        </el-form>
        <!-- 底部按钮区域 -->
        <span slot="footer" class="dialog-footer">
          <el-button @click="addDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="submit">确 定</el-button>
        </span>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      queryInfo: {
        query: null,
        page: 1,
        pagesize: 5
      },
      arttypeList: [],
      total: null,
      addDialogVisible: false,
      addForm: {
        typename: ''
      },
      typename: null, // 存储typename
      id: null,
      formTitle: '',
      addFormRules: {
        typename: [
          { required: true, message: '请输入类别名', trigger: 'blur' },
          {
            min: 2,
            max: 10,
            message: '长度在2-10个字符',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  mounted () {
    this.getArticleTypeList()
  },
  methods: {
    // 类别列表
    async getArticleTypeList () {
      const { data, status } = await this.$api.admin.getArttype(this.queryInfo)
      // console.log(data);
      if (status === 200) {
        this.arttypeList = data.records
        this.total = data.total
        return
      }
      return this.$message.error('加载失败！')
    },
    // 删除类别
    async deleteType (item) {
      const confirmResult = await this.$confirm(
        '删除类别 ' + item.typename + ' ？',
        '删除',
        {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).catch(err => err)
      if (confirmResult == 'cancel') return this.$message.info('操作取消')
      const id = item._id
      const { status, msg } = await this.$api.admin.delArttype({ id })
      if (status === 200) {
        this.getArticleTypeList()
        return this.$message.success(msg)
      }
      return this.$message.info('操作失败')
    },
    // 编辑类别
    showEditDialog (id) {},
    // 监听pagesize改变的事件
    handleSizeChange (newSize) {
      this.queryInfo.pagesize = newSize
      this.getArticleTypeList()
    },
    // 监听 页码值 改变的事件
    handleCurrentChange (newPage) {
      this.queryInfo.page = newPage
      this.getArticleTypeList()
    },
    // 改变类别状态
    async userStatusChanged (item) {
      const { _id, typeStatus } = item
      // console.log(typeStatus);
      const { status, msg } = await this.$api.admin.setArttype({
        _id,
        typeStatus
      })
      if (status && status === 200) {
        this.getArticleTypeList()
        return this.$message.success(msg)
      } else {
        return this.$message.error('操作失败!')
      }
    },
    // 关闭添加对话框
    addDialogClose () {
      // 重置输入框
      this.$refs.addFormRef.resetFields()
    },
    // 显示表单
    addType (item) {
      this.addDialogVisible = true
      if (item) {
        // 修改类别
        this.formTitle = '修改类别'
        this.addForm.typename = item.typename
        this.typename = item.typename
        this.id = item._id
        // console.log(item.typename);
      } else {
        // 添加类别
        this.addForm.typename = ''
        this.typename = null
        this.formTitle = '添加类别'
      }
    },
    // 提交 添加/修改
    async submit () {
      if (this.typename) {
        if (this.addForm.typename === this.typename) {
          // 没有作任何更改
          this.addDialogVisible = false
          return this.$message.info('未做任何更改！')
        } else {
          // 作了更改，实现修改
          const { status, msg } = await this.$api.admin.upArttype({
            id: this.id,
            typename: this.addForm.typename
          })
          if (status === 200) {
            this.addDialogVisible = false
            this.getArticleTypeList()
            return this.$message.success(msg)
          }
          return this.$message.info('操作失败！')
          // console.log(this.id);
        }
      } else {
        // 实现添加
        const { status, msg } = await this.$api.admin.addArttype(this.addForm)
        if (status === 200) {
          this.addDialogVisible = false
          this.getArticleTypeList()
          return this.$message.success(msg)
        }
        return this.$message.info('操作失败！')
      }
    }
  }
}
</script>
<style lang='scss' scoped>
</style>
