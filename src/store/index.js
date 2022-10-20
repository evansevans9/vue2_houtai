import Vue from 'vue'
import Vuex from 'vuex'
import Cookie from 'js-cookie'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isCollapse: false,
    tablist: [{
      path: "/",
      name: "home",
      label: "首页",
      icon: "s-home",
      url: "Home/Home",
    },],
    Menu:[]
  },
  getters: {
  },
  mutations: {
    isCollapsed(){
      this.state.isCollapse = !this.state.isCollapse
    },
    // 更新面包屑
    selectMenu(state,val){
      // console.log(val,111)
      if(val.name !== 'home'){
        const index =  state.tablist.findIndex(item => item.name === val.name)
        if(index == -1){
          state.tablist.push(val)
        }
      }
    },
    // 删除tag
    changeMenutag(state,item){
      console.log(item,'item')
      const index =  state.tablist.findIndex(val => val.name === item.name)
      state.tablist.splice(index,1)
    },
    // 设置menu，动态的aside
    getMenu(state,val){
      state.Menu = val
      // 。。。。。json
      Cookie.set('menu',JSON.stringify(val))
    },
    // 动态注册路由
  },
  actions: {
  },
  modules: {
  }
})
