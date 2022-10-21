<template>
  <el-form label-width="70px" ref="form" :model="form" :rules="rules" class="login-container" :inline="true">
    <h3 class="login-title">登 录</h3>
    <el-form-item label="用户名" prop="username">
        <el-input v-model="form.username" placeholder="请输入用户名"></el-input>
    </el-form-item>
    <el-form-item label="密 码" prop="password">
        <el-input v-model="form.password" placeholder="请输入密码" type="password"></el-input>
    </el-form-item>
    <el-form>
        <el-button @click="dianjiLogin" type="primary" style="margin-left:105px;margin-top:5px">登录</el-button>
    </el-form>
  </el-form>
</template>
<script>
import Mock from 'mockjs'
import Cookie from 'js-cookie'
import { getMenu } from '../api'
export default {
  name: "LoginView",
data(){
    return{
        form:{
            username:'',
            password:''
        },
        rules:{
            username:[
                 { required: true, message: '请输入用户名', trigger: 'blur' },
            ],
            password:[
                 { required: true, message: '请输入密码', trigger: 'blur' },
            ]
        }
    }
},
methods:{
    // 登录
    dianjiLogin(){
        // token
        // const token =  Mock.Random.guid();
        // Cookie.set('token',token);
        // this.$router.push({name:'home'})
        this.$refs.form.validate((val)=>{
            if(val){
                getMenu(this.form).then((data)=>{
                    console.log(data.data.data.menu,'111111111')
                    if(data.data.code == 20000){
                         Cookie.set('token',data.data.data.token);

                        //  拿到menu，存store
                        this.$store.commit('getMenu',data.data.data.menu)
                        this.$store.commit('addMenu',this.$router)
                    setTimeout(()=>{
                        this.$message({
                        message: '登录成功',
                        type: 'success'
                        },100);
                    })
                    this.$router.push({name:'home'})
                    }else{
                        this.$message.error('登陆失败,用户名或密码错误');
                    }
                })

            }
        })
    }
}
}
</script>
<style lang="less" scoped>
.login-container{
    width: 350px;
    border: 1px solid #eaeaea;
    margin: 180px auto;
    padding: 35px 35px 15px 35px;
    background-color: #fff;
    border-radius: 5px;
    box-shadow: 0 0 25px #cac6c6;
    box-sizing: border-box;
    .el-input{
        width: 198px;
    }
    .login-title{
        text-align: center;
        // height: 40px;
        margin-bottom: 40px;
        color: #505458;
    }
}
</style>
