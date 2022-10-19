import Vue from 'vue'
import Vuex from 'vuex'

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
    },]
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
    }
  },
  actions: {
  },
  modules: {
  }
})
