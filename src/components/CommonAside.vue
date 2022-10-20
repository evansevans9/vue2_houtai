<template>
  <el-menu
    default-active="1-4-1"
    class="el-menu-vertical-demo"
    @open="handleOpen"
    @close="handleClose"
    :collapse="isCollapse"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
  >
  <div>
    <h3>{{ isCollapse ? '后台' : '天成医疗后台管理系统'}}</h3>
  </div>
    
    <el-menu-item
    @click="clickMenu(item)"
      v-for="item in nochildren"
      :key="item.name"
      :index="item.name"
    >
      <i :class="`el-icon-${item.icon}`"></i>
      <span slot="title">{{ item.label }}</span>
    </el-menu-item>

    <el-submenu index="1" v-for="(item, index) in haschildren" :key="index">
      <template slot="title">
        <i :class="`el-icon-${item.location}`"></i>
        <span slot="title">{{ item.label }}</span>
      </template>
      <el-menu-item-group  v-for="subitem in item.children" :key="subitem.name" >
        <el-menu-item :index="subitem.name" @click="clickMenu(subitem)">{{ subitem.label }}</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
  </el-menu>
</template>

<script>
import Cookie from 'js-cookie'
export default {
  data() {
    return {

    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    clickMenu(item){
        // console.log(item);
        // console.log(this.$route)
        if(this.$route.path !== item.path &&!(this.$route.path == '/home'&& item.path == '/')){
            this.$router.push(item.path)
        }
        this.$store.commit('selectMenu',item)
        
    }
  },
  computed: {
    nochildren() {
      return this.menuData.filter((item) => !item.children);
    },
    haschildren() {
      return this.menuData.filter((item) => item.children);
    },
    isCollapse(){
      return this.$store.state.isCollapse
    },
    menuData(){
      return JSON.parse(Cookie.get('menu')) || this.$store.state.Menu
    }
  },
};
</script>
<style lang="less" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px; 
  min-height: 400px;
}
.el-menu{
  border-right:none;
  height: 100vh;
    h3 {
        color: #fff;
        text-align: center;
        line-height: 48px;
        font-size: 16px;
    }
}
</style>
