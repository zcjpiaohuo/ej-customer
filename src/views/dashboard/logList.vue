<!--
 * @Author: your name
 * @Date: 2021-09-07 11:27:37
 * @LastEditTime: 2021-09-07 15:25:22
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ej-houtai\src\views\dashboard\logList.vue
-->

<template>
  <div class="logContainer">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <a :href="github" target="_blank">
           <!-- <icon-svg icon-class="iconGithub" /> -->
        </a>
        <span>项目管理备忘录：</span>
      </div>
      <el-scrollbar>
      <div class="logArea el-scrollbar">
            <div class="item" v-for="(item,index) in logsData" :key="index">
              <p class="timeArea">
                <span class="title">日期：</span>
                <span class="title time">{{item.createTime}}</span>
              </p>
              <div class="logContent">
                  <p class="title">待处理内容：</p>
                  <ul class="logUl">
                    <li v-for="(citem,cindex) in item.data" :key="cindex">{{citem}}</li>
                </ul>
              </div>
          </div>
      </div>
       </el-scrollbar>
   
  </el-card>
  </div>
</template>

<script>
  import logsData from "@/assets/logs.json";
  import { github } from "@/utils/env";

  export default {
    name:'logList',
    data() {
      return {
        logsData:logsData.data,
        github:github
      };
    }
  }
</script>

<style scoped>
.logContainer{
    padding: 10px;
    background: #fff;
    box-sizing: border-box;
    height:370px;
    max-height: 370px;
    overflow: hidden;
    border-radius: 6px;}
    .logArea{
       overflow: auto;
       height: 100%;
    }
    .item
       .title{
         font-size: 13px;
       }
       .item .time{
         color:#87DE75;
       }
     .item .logContent
          .logUl{
            padding-left: 30px;}
   li{
              font-size: 12px;
              list-style: disc;
              line-height: 20px;
            }
          
      
    

</style>

