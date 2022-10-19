<template>
  <el-row>
    <el-col :span="8" style="padding-right:10px">
      <el-card class="box-card">
        <div class="user1">
          <img src="../assets/images/user.png" alt="" class="user-pic" />
          <div class="user-info">
            <p class="info1">Admin</p>
            <p class="info2">超级管理员</p>
          </div>
        </div>
        <div class="login-info">
          <p>上次登录时间：<span>2022-11-11</span></p>
          <p>上次登录地点：<span>上海</span></p>
        </div>
      </el-card>
      <el-card>
        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="name" label="品牌"> </el-table-column>
          <el-table-column prop="todayBuy" label="今日购买"> </el-table-column>
          <el-table-column prop="monthBuy" label="本月购买"> </el-table-column>
          <el-table-column prop="totalBuy" label="总数"> </el-table-column>
        </el-table>
      </el-card>
    </el-col>
    <!-- 右边 -->
    <el-col :span="16" style="padding-left:10px">
      <div class="num">
        <el-card v-for="item in countData" :key="item.name" :body-style='{display:"flex",padding:0}'>
            <i :class="`el-icon-${item.icon}`" class="icon" :style="{background:item.color}"></i>
            <div class="detail">
            <p class="price">￥{{item.value}}</p>
            <p class="desc">{{item.name}}</p>
            </div>
        </el-card>
      </div>
      <el-card style="height:280px">
        <!-- 折线图 -->
        <div ref='echarts1'></div>
      </el-card>
      <div class="graph">
        <el-card style="height:260px"></el-card>
        <el-card style="height:260px"></el-card>
      </div>
    </el-col>
  </el-row>
</template>
<script src="https://cdn.staticfile.org/echarts/4.3.0/echarts.min.js"></script>
<script>
import { getData } from '../api/index'
export default {
  name: "HomeView",
  data() {
    return {
      tableData: [],
      tablabel: {
        name: "品牌",
        todayBuy: "今日购买",
      },
      countData: [
        {
          name: "今日支付订单",
          value: 1234,
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "今日收藏订单",
          value: 210,
          icon: "star-on",
          color: "#ffb980",
        },
        {
          name: "今日未支付订单",
          value: 1234,
          icon: "s-goods",
          color: "#5ab1ef",
        },
        {
          name: "本月支付订单",
          value: 1234,
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "本月收藏订单",
          value: 210,
          icon: "star-on",
          color: "#ffb980",
        },
        {
          name: "本月未支付订单",
          value: 1234,
          icon: "s-goods",
          color: "#5ab1ef",
        },
      ],
    };
  },
  mounted(){
    getData().then(({data})=>{
        // console.log(data)
        const { tableData } = data.data
        // console.log(tableData)
        this.tableData = tableData
    });
//    const echarts1 =  echarts.init(this.$refs.echarts1)
    // var option = {
    //     title: {
    //       text: 'ECharts 入门示例'
    //     },
    //     tooltip: {},
    //     legend: {
    //       data: ['销量']
    //     },
    //     xAxis: {
    //       data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
    //     },
    //     yAxis: {},
    //     series: [
    //       {
    //         name: '销量',
    //         type: 'bar',
    //         data: [5, 20, 36, 10, 10, 20]
    //       }
    //     ]
    //   };

      // 使用刚指定的配置项和数据显示图表。
    //   echarts1.setOption(option);
  }
};
</script>

<style lang="scss">
.box-card{
    margin-bottom: 10px;
}
.user1 {
  display: flex;
  align-items: center;
  padding-bottom: 20px;
  margin-bottom: 20px;
  border-bottom: 1px solid #ccc;
  .user-pic {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    margin-right: 40px;
  }
  .user-info {
    margin-left: 10px;
    .info1 {
      font-size: 32px;
    }
  }
}
.login-info {
  p {
    line-height: 28px;
    font-size: 14px;
    span {
      margin-left: 80px;
    }
  }
}
.num{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .icon{
        width: 80px;
        height: 80px;
        font-size: 30px;
        line-height: 80px;
        color: #fff;
        text-align: center;
      
    }
    .detail{
        display: flex;
        flex-direction: column;
        justify-content: center;
        margin-left: 15px;
        .price{
            font-size: 30px;
            margin-bottom: 10px;
            line-height: 30px;
            height: 30px;
        }
        .desc{
            font-size: 12px;
            color: #999;
            text-align: center;
            // width: 88px;
            line-height: 30px;
            height: 30px;
        }
    }
    .el-card{
        width: 32%;
        margin-bottom: 20px;
    }
}
.graph{
    display: flex;
    justify-content:space-between;
    margin-top: 20px;
    .el-card{
        width: 48%;
    }
}
</style>
