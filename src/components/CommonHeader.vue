<template>
  <div class="header__container">
    <div class="left__container">
      <el-button
        icon="el-icon-menu"
        size="small"
        @click="clickchange" style="margin-right:20px"
      ></el-button>
      <!-- 面包屑 -->
      <el-breadcrumb separator="/">
        <el-breadcrumb-item v-for="item in tags" :key="item.path" :to="{ path: item.path }">{{item.label}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="right__container">
      <el-dropdown @command="handleCommand">
        <span class="el-dropdown-link">
          <img src="../assets/images/user.png" alt="" class="user" />
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="a">个人中心</el-dropdown-item>
          <el-dropdown-item command="b">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import Cookie from 'js-cookie'
export default {
  data() {
    return {};
  },
  methods: {
    clickchange() {
      this.$store.commit("isCollapsed");
    },
    // 退出，清空当前cookie
    handleCommand(command){
      if(command == 'b'){
      Cookie.remove('token');
      Cookie.remove('menu');
      setTimeout(() => {
         this.$router.push('/login')
      }, 500);

      }
    }
  },
    computed:{
        ...mapState({
          tags:state =>state.tablist
        }),
   
    },
    mounted(){
       console.log(this.tags,'000')
       setTimeout(()=>{
        console.log(this.tags)
       },4000)
    }

};
</script>
<style lang="less" scoped>
.header__container {
  background-color: #333;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px 0 20px;
  .left__container__text {
    font-size: 14px;
    color: #fff;
    margin-left: 10px;
  }
  .user {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
}
.left__container{
  display: flex;
  align-items: center;
  /deep/ .el-breadcrumb__item{
    .el-breadcrumb__inner{
      color: #666;
    }
    &:last-child{
      .el-breadcrumb__inner{
        color:#fff;
      }
    }
  }
}
</style>
