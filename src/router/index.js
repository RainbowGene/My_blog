import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// 前台
const Home = () => import('@/views/home/Home')
const HomeLogin = () => import('@/views/home/Login')
const HomeRegisrer = () => import('@/views/home/Register')
const HomeIndex = () => import('@/views/home/children/index/HomeContent')
const HomeArticle = () => import('@/views/home/children/article/Article')
const HomeArticleDetail = () => import('@/views/home/children/article/ArticleDetail')
const HomeAlbum = () => import('@/views/home/children/album/Album')
const HomeAbout = () => import('@/views/home/children/about/About')
const HomeContact = () => import('@/views/home/children/contact/Contact')

// 后台
const AdminLogin = () => import('@/views/admin/Login')
const AdminHome = () => import('@/views/admin/Home')
const Welcome = () => import('@/views/admin/children/Welcome')
const SelfInfo = () => import('@/views/admin/children/Welcome')
const FriendLink = () => import('@/views/admin/children/Welcome')
const User = () => import('@/views/admin/children/user/User')
const Role = () => import('@/views/admin/children/Welcome')
const Article = () => import('@/views/admin/children/article/Article')
const ArticleType = () => import('@/views/admin/children/article/ArticleType')
const AddArticle = () => import('@/views/admin/children/article/AddArticle')
const AlbumList = () => import('@/views/admin/children/album/AlbumList')
const PicGroup = () => import('@/views/admin/children/album/PicGroup')

const routes = [
  // { path: '/', redirect: '/adminLogin' },
  { path: '/', redirect: '/home' },
  // 前台展示路由
  {
    path: '/home', component: Home, redirect: '/index', children: [
      { path: '/index', component: HomeIndex },
      { path: '/arts', component: HomeArticle }, 
      { path: '/art/:aid', component: HomeArticleDetail },
      { path: '/album', component: HomeAlbum },
      { path: '/about', component: HomeAbout },
      { path: '/contact', component: HomeContact }
    ]
  },
  { path: '/login', component: HomeLogin },
  { path: '/register', component: HomeRegisrer },
  // 后台管理路由
  { path: '/adminLogin', component: AdminLogin },
  {
    path: '/adminHome',
    component: AdminHome,
    redirect: '/welcome',
    children: [
      { path: '/welcome', component: Welcome, meta: { requireAuth: true } },
      { path: '/selfinfo', component: SelfInfo, meta: { requireAuth: true } },
      { path: '/friendlink', component: FriendLink },
      { path: '/user', component: User },
      { path: '/role', component: Role },
      { path: '/article', component: Article },
      { path: '/art-type', component: ArticleType },
      { path: '/article-add', component: AddArticle },
      { path: '/picgroup', component: AlbumList },
      { path: '/picgroup/:album', component: PicGroup }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
