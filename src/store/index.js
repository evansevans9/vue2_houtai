import Vue from "vue";
import Vuex from "vuex";
import Cookie from "js-cookie";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isCollapse: false,
    tablist: [
      {
        path: "/",
        name: "home",
        label: "首页",
        icon: "s-home",
        url: "Home/Home",
      },
    ],
    menu: [],
  },
  getters: {},
  mutations: {
    isCollapsed() {
      this.state.isCollapse = !this.state.isCollapse;
    },
    // 更新面包屑
    selectMenu(state, val) {
      // console.log(val,111)
      if (val.name !== "home") {
        const index = state.tablist.findIndex((item) => item.name === val.name);
        if (index == -1) {
          state.tablist.push(val);
        }
      }
    },
    // 删除tag
    changeMenutag(state, item) {
      console.log(item, "item");
      const index = state.tablist.findIndex((val) => val.name === item.name);
      state.tablist.splice(index, 1);
    },
    // 设置menu，动态aside
    getMenu(state, val) {
      state.menu = val;
      // 。。。。。json
      Cookie.set("menu", JSON.stringify(val));
    },
    // 动态注册路由
    addMenu(state, router) {
      if (!Cookie.get("menu")) return;
      const menu = JSON.parse(Cookie.get("menu"));
      state.menu = menu;
      // 动态路由
      const menuArray = [];
      menu.forEach((item) => {
        if (item.children) {
          item.children = item.children.map((item) => {
            // console.log(item,'99999999')
            item.component = () => import(`../views/${item.url}`);
            return item;
          });
          menuArray.push(...item.children);
        } else {
          item.component = () => import(`../views/${item.url}`);
          menuArray.push(item);
        }
        //   console.log(menuArray,'hahaha1')
        // // 动态路由
        // menuArray.forEach(item =>{
        //   router.addRoute('Main',item)
        // })
      });
      console.log(menuArray, "hahaha11111111");
      // 动态路由
      menuArray.forEach((item) => {
        router.addRoute("Main", item);
      });
    },
  },
  actions: {},
  modules: {},
});
