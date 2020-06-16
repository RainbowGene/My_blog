<template>
  <el-container class="home-container">
    <el-header>
      <!-- 头部区域 -->
      <div>
        <a href="/home">
          <img src="@/assets/img/other/1.jpg" class="img-logo" alt />
        </a>
        <span>后台管理</span>
      </div>
      <el-button type="info" @click="logout">退出</el-button>
    </el-header>
    <!-- 内容区域 -->
    <el-container>
      <!-- 侧边栏 -->
      <el-aside :width="isCollapse ? '64px':'200px'">
        <div class="toggle-button" @click="toggleCollapse">|||</div>
        <el-menu
          background-color="#333744"
          text-color="#fff"
          active-text-color="#409EFF"
          unique-opened
          :collapse="isCollapse"
          :collapse-transition="false"
          router
          :default-active="activePath"
        >
          <!-- 一级菜单 -->
          <el-submenu :index="item.id +''" v-for="item in menuList" :key="item.id">
            <!-- 模板区域 -->
            <template slot="title">
              <!-- 图标 -->
              <i :class="iconsObj[item.id]"></i>
              <span>{{item.authName}}</span>
            </template>
            <!-- 二级菜单 -->
            <el-menu-item
              :index="'/'+  items.path"
              v-for="items in item.children"
              :key="items.id"
              @click="saveNavState('/'+  items.path)"
            >
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>{{items.authName}}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- 右侧主体 -->
      <el-main>
        <!-- 子路由路由占位符 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data () {
    return {
      iconsObj: {
        1: 'iconfont icon-user',
        0: 'iconfont icon-tijikongjian',
        2: 'iconfont icon-shangpin',
        3: 'iconfont icon-danju',
        4: 'iconfont icon-showpassword',
        5: 'iconfont icon-users',
        6: 'iconfont icon-3702mima',
        7: 'iconfont icon-morentouxiang',
        8: 'iconfont icon-lock_fill'
      },
      menuList: [
        {
          id: 0,
          authName: '信息配置',
          children: [
            { id: '01', authName: '个人信息', path: 'selfinfo' },
            { id: '02', authName: '友链配置', path: 'friendlink' }
          ]
        },
        {
          id: 1,
          authName: '用户管理',
          children: [
            { id: '11', authName: '用户列表', path: 'user' },
            { id: '12', authName: '角色列表', path: 'role' }
          ]
        },
        {
          id: 4,
          authName: '文章管理',
          children: [
            { id: '21', authName: '类别管理', path: 'art-type' },
            { id: '22', authName: '文章管理', path: 'article' }
            // { id: "22", authName: "文章添加", path: "article-add" }
          ]
        },
        {
          id: 3,
          authName: '相册管理',
          children: [{ id: '31', authName: '相册列表', path: 'picgroup' }]
        }
      ],
      isCollapse: false, // 是否折叠
      activePath: '/user' // 被激活的链接地址:开发时按需配置
    }
  },
  created () {
    this.activePath = window.sessionStorage.getItem('activePath')
  },
  methods: {
    logout () {
      // window.sessionStorage.clear();
      this.$store.dispatch('logOut')
      this.$router.push('/adminLogin')
    },
    // 折叠/展开
    toggleCollapse () {
      this.isCollapse = !this.isCollapse
    },
    // 保存链接的激活状态，来改变菜单项的高亮效果
    saveNavState (activePath) {
      window.sessionStorage.setItem('activePath', activePath)
      this.activePath = activePath
    }
  }
}
</script>
<style lang='scss' scoped>
.home-container {
  min-height: 700px;
}
.el-header {
  background-color: #373d41;
  display: flex;
  justify-content: space-between;
  padding-left: 10px;
  align-items: center;
  color: #fff;
  font-size: 20px;
  > div {
    display: flex;
    align-items: center;
  }
}
.img-logo {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  margin-right: 15px;
}
.el-aside {
  background-color: #373d44;
  .el-menu {
    border: 0;
  }
}
.el-main {
  background-color: #eaedf1;
}
.home-container {
  height: 100%;
}

.iconfont {
  margin-right: 10px;
}

// 折叠栏
.toggle-button {
  background-color: #4a5064;
  color: #fff;
  font-size: 10px;
  line-height: 24px;
  text-align: center;
  letter-spacing: 0.2em;
  cursor: pointer;
}
</style>
