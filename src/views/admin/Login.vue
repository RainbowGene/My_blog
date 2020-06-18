<template>
  <div class="login_container">
    <div class="login_box">
      <!-- 头像区域 -->
      <div class="avatar_box">
        <img class="avatar_img" src="/api/img/ava_img/defAvatar.jpg" alt />
      </div>
      <!-- 登录表单区域 -->
      <el-form
        label-width="0px"
        ref="loginFormRef"
        :model="loginForm"
        class="login_form"
        :rules="LoginFormRules"
      >
        <el-form-item prop="username">
          <el-input prefix-icon="iconfont icon-user" v-model="loginForm.username"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            prefix-icon="iconfont icon-3702mima"
            v-model="loginForm.password"
            type="password"
          ></el-input>
        </el-form-item>
        <!-- 按钮区域 -->
        <el-form-item class="btns" prop>
          <el-button type="primary" @click="subimForm">登录</el-button>
          <el-button type="info" @click="resetForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 表单源数据
      loginForm: {
        username: 'admin',
        password: '123456'
      },
      // 验证规则
      LoginFormRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 4, max: 12, message: '长度在 4 到 12 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 18, message: '长度在 6 到 18 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 点击重置按钮
    resetForm () {
      this.$refs.loginFormRef.resetFields() // 因为双向绑定了data，会重置为绑定的data数据
    },
    // 表单提交
    subimForm () {
      this.$refs.loginFormRef.validate(async valid => {
        // 1,valid:表单预验证
        if (!valid) return
        this.$api.admin
          .login(this.loginForm)
          .then(res => {
            if (res.status !== 200) return this.$message.error(res.msg)
            window.sessionStorage.setItem('token', res.token) // token 保存
            // vuex 保存用户信息
            this.$store.dispatch('setUserLogin', {
              username: res.username,
              id: res.id,
              role: res.role
            })
            this.$message.success('登录成功！')
            this.$router.push('/adminHome')
          })
          .catch(err => {
            this.$message.error('登录失败！')
          })
      })
    }
  }
}
</script>
<style lang='scss'>
.login_container {
  background-color: #2b4b6b;
  height: 100vh;
}
.login_box {
  width: 450px;
  height: 300px;
  background-color: #fff;
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.avatar_box {
  height: 130px;
  width: 130px;
  border: 1px solid #eee;
  border-radius: 50%;
  padding: 10px;
  box-shadow: 0 0 10px #ddd;
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
}
.avatar_img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: #eee;
}
.btns {
  display: flex;
  justify-content: flex-end;
}

.login_form {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}
</style>
