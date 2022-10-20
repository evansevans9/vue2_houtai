import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import UserView from '../views/UserView.vue'
import MallView from '../views/Mall.vue'
import PageOne  from '../views/PageOne.vue'
import PageTwo  from '../views/PageTwo.vue'
import MainView  from '../views/Main.vue'
import LoginView from '../views/Login'
import Cookie from 'js-cookie'

Vue.use(VueRouter)

const routes = [
  // { path: "/", redirect: "/home" },
  {
    path: '/',
    name: 'Main',
    component: MainView,
    redirect: "/home" ,
    children:[
      { path: 'home', name:'home',component: HomeView },//首页
      { path: 'user', name:'user',component: UserView },//用户管理
      { path: 'mall', name:'mall',component: MallView },//商品管理
      { path: 'page1', name:'page1',component: PageOne },
      { path: 'page2', name:'page2',component: PageTwo },
    ]
  },
  {
    path:'/login',
    name:'Login',
    component: LoginView,
  }
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  // }
]

const router = new VueRouter({
  routes
})


router.beforeEach((to, from, next) => {
  const token = Cookie.get('token')
  if(!token && to.name !== 'Login'){
    next({name:'Login'})
  }else if(token && to.name == 'Login'){
    next({name:'home'})
  }else{
    next()
  }
})
export default router
