<!--
 * @Author: your name
 * @Date: 2021-09-09 18:38:17
 * @LastEditTime: 2021-09-09 18:39:44
 * @LastEditors: LAPTOP-CC091CC3
 * @Description: In User Settings Edit
 * @FilePath: \houtai-ej\src\pages\order\index.vue
-->
<template>
  <div class="order">
    <!-- 标签导航 -->
    <el-tabs v-model="activeName" @tab-click="tabClickHandler">
      <el-tab-pane label="所有订单" name="first">
        <order-table></order-table>
      </el-tab-pane>
      <el-tab-pane label="待支付" name="second">
        <order-table status="待支付"></order-table>
      </el-tab-pane>
      <el-tab-pane label="待派单" name="third">
        <order-table status="待派单"></order-table>
      </el-tab-pane>
      <el-tab-pane label="待接单" name="fourth">
        <order-table status="待接单"></order-table>
      </el-tab-pane>
      <el-tab-pane label="待服务" name="five">
        <order-table status="待服务"></order-table>
      </el-tab-pane>
      <el-tab-pane label="待确认" name="six">
        <order-table status="待确认"></order-table>
      </el-tab-pane>
      <el-tab-pane label="已完成" name="none">
        <order-table status="已完成"></order-table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import OrderTable from "@/components/Order/index";
export default {
  data() {
    return {
      activeName: "first",
    };
  },
  methods: {
    tabClickHandler(tab, e) {
      // console.log(tab, e);
    },
  },
  components: {
    OrderTable,
  },
};
</script>
<style scoped>
</style>