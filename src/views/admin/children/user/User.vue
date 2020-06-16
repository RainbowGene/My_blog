<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图 -->
    <el-card>
      <!-- 搜索/添加 -->
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input placeholder="请输入内容" v-model="queryInfo.query" clearable @clear="getUserList">
            <el-button slot="append" icon="el-icon-search" @click="getUserList"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="addDialogVisible = true">添加用户</el-button>
        </el-col>
      </el-row>
      <!-- 用户列表区域 -->
      <el-table :data="userList" border stripe>
        <el-table-column label="序号" type="index"></el-table-column>
        <el-table-column label="用户名" prop="username"></el-table-column>
        <el-table-column label="邮箱" prop="email"></el-table-column>
        <el-table-column label="角色" prop="role"></el-table-column>
        <el-table-column label="注册时间" prop="regtime">
          <template slot-scope="scope">{{scope.row.regtime | formatDate}}</template>
        </el-table-column>
        <el-table-column label="禁用状态" prop="ustate">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.ustate"
              :active-value="1"
              :inactive-value="0"
              @change="userStatusChanged(scope.row)"
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180px">
          <template slot-scope="scope">
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
              @click="showEditDialog(scope.row._id)"
            ></el-button>
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              @click="deleteUser(scope.row._id)"
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
    <el-dialog title="添加用户" :visible.sync="addDialogVisible" width="50%" @close="addDialogClose">
      <!-- 内容主体区域 -->
      <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="70px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="addForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="addForm.password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="addForm.email"></el-input>
        </el-form-item>
      </el-form>
      <!-- 底部按钮区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUser">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { dateFormat } from '@/plugins/dateFormat'
export default {
  data () {
    // 验证邮箱的验证规则
    var checkEmail = (rule, value, cb) => {
      const regEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/
      if (regEmail.test(value)) {
        // 合法执行 callback
        return cb()
      }
      cb(new Error('请输入合法的邮箱!'))
    }
    return {
      // 获取用户列表的参数对象
      queryInfo: {
        query: '', // 关键字查询
        page: 1,
        pagesize: 5
      },
      userList: [],
      total: 0, // 数据总条数
      addDialogVisible: false,
      // 添加用户的表单数据
      addForm: {
        username: '',
        password: '',
        email: '',
        role: 'normal',
        ustate: 0
      },
      // 添加表单的验证规则对象
      addFormRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          {
            min: 2,
            max: 10,
            message: '用户名长度在2-10个字符',
            trigger: 'blur'
          }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          {
            min: 6,
            max: 12,
            message: '密码长度在6-12个字符',
            trigger: 'blur'
          }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { validator: checkEmail } // 自定义的验证规则（回调函数）
        ]
      }
    }
  },
  created () {
    this.getUserList()
  },
  methods: {
    // 获取用户表单数据
    async getUserList () {
      const { data: res, status } = await this.$api.admin.getUserlist(
        this.queryInfo
      )
      // console.log(res);
      if (status === 200) {
        this.userList = res.records
        this.total = res.total
        // return this.$message.success("用户列表加载成功！");
        return
      }
      return this.$message.error('加载失败！')
    },
    // 改变用户状态
    async userStatusChanged (userinfo) {
      const id = userinfo._id
      const ustate = userinfo.ustate // 判断是启用还是禁用
      // console.log(ustate); // 1 就是要禁用
      const { status, msg } = await this.$api.admin.unbanUser({ id, ustate })
      if (status && status === 200) {
        return this.$message.success(msg)
      } else {
        userinfo.state = !userinfo.state
        return this.$message.error('操作失败!')
      }
    },
    // 监听pagesize改变的事件
    handleSizeChange (newSize) {
      this.queryInfo.pagesize = newSize
      this.getUserList()
    },
    // 监听 页码值 改变的事件
    handleCurrentChange (newPage) {
      this.queryInfo.page = newPage
      this.getUserList()
    },
    // 删除用户
    async deleteUser (id) {
      // console.log(id); // 用户id
      const { status, msg } = await this.$api.admin.delUser(id)
      if (status && status == 200) {
        this.getUserList()
        return this.$message.success(msg)
      } else {
        return this.$message.error('删除失败!')
      }
    },
    // 添加对话框关闭
    addDialogClose () {
      // 重置输入框
      this.$refs.addFormRef.resetFields()
    },
    // 用户添加
    addUser () {
      this.$refs.addFormRef.validate(async valid => {
        // 预验证
        if (!valid) return
        this.$api.admin.register(this.addForm).then(res => {
          if (res.status !== 200) return this.$message.error(res.msg)
          this.$message.success('添加用户成功！')
          this.addDialogVisible = false
          this.getUserList()
        })
      })
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
