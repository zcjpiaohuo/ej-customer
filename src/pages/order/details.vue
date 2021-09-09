<!--
 * @Author: your name
 * @Date: 2021-09-09 18:38:46
 * @LastEditTime: 2021-09-09 18:39:12
 * @LastEditors: LAPTOP-CC091CC3
 * @Description: In User Settings Edit
 * @FilePath: \houtai-ej\src\pages\order\details.vue
-->
<template>
  <div class="orderDetail">
    <div class="btn">
      <el-button type="text" @click="$router.go(-1)">返回</el-button>
    </div>
    <!-- 表格 -->
    <el-table :data="resData.orderLines" style="width: 100%">
      <el-table-column prop="id" label="订单编号"></el-table-column>
      <el-table-column prop="productId" label="产品编号"></el-table-column>
      <el-table-column prop="product.name" label="产品"></el-table-column>
      <el-table-column label="产品图片">
        <template v-slot="scope">
          <img :src="scope.row.product.photo" alt="图片丢失" height="50" />
        </template>
      </el-table-column>
      <el-table-column prop="price" label="单价"></el-table-column>
      <el-table-column prop="number" label="数量"></el-table-column>
    </el-table>
    <!-- 卡片 -->
    <el-row :gutter="20" style="margin-top: 20px">
      <el-col :span="8">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>订单基本信息</span>
          </div>
          <div class="text item">订单编号：{{ resData.id }}</div>
          <div class="text item">订单金额：{{ resData.total }}</div>
          <div class="text item">
            下单时间：{{ resData.orderTime | fmtDate }}
          </div>
          <div class="text item">订单状态：{{ resData.status }}</div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>下单者信息</span>
          </div>
          <div v-if="resData.customer" class="text item">
            下单者：{{ resData.customer.realname }}
          </div>
          <div v-if="resData.customer" class="text item">
            手机号：{{ resData.customer.telephone }}
          </div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card class="box-card" v-if="resData.address">
          <div slot="header" class="clearfix">
            <span>雇主信息</span>
          </div>
          <div class="text item">雇主：{{ resData.address.username }}</div>
          <div class="text item">手机号：{{ resData.address.telephone }}</div>
          <div class="text item">
            服务地址：{{
              resData.address.province +
              resData.address.city +
              resData.address.area +
              resData.address.address
            }}
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import request from "@/utils/request";
export default {
  data() {
    return {
      resData: [],
    };
  },
  methods: {
    findOrderDetailById(id) {
      request.get("/order/findById", { params: { id } }).then((res) => {
        this.resData = res.data;
      });
    },
  },
  created() {
    this.findOrderDetailById(this.$route.query.id);
  },
};
</script>
<style scoped>
.item {
  height: 30px;
  line-height: 30px;
}
</style>