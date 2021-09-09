<template>
  <div>
    <div>
      <el-date-picker
        size="small"
        v-model="value2"
        type="daterange"
        align="right"
        unlink-panels
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        :picker-options="pickerOptions"
      >
      </el-date-picker>
      <el-select
        v-model="value"
        size="small"
        clearable
        placeholder="请选择类型"
      >
       <el-option label="消费" value="消费"></el-option>
            <el-option label="充值" value="充值"></el-option>
      </el-select>
      <el-select
        v-model="value"
        size="small"
        clearable
        placeholder="请选择状态"
      >
        
      </el-select>
      <el-select v-model="value" size="small" filterable placeholder="顾客编号">
        
      </el-select>
      <el-button
        margin:5px
        type="primary"
        size="small"
        style="margin-right: 10px"
        @click="pageQueryProductions"
        icon="el-icon-search"
        >查询</el-button
      >
    </div>
    <div class="content">
      <el-table  :data="resData" style="width: 100%" size="small">
        <el-table-column type="index" label="编号" prop="id"></el-table-column>
        <el-table-column label="交易金额" prop="transferMoney"></el-table-column>
         <el-table-column label="交易时间">
        <template v-slot="scope">
          {{ scope.row.transferTime | fmtDate }}
        </template>
      </el-table-column>
        <el-table-column label="交易类型" prop="type"></el-table-column>
        <el-table-column label="状态" prop="status"></el-table-column>
        <el-table-column label="描述" ></el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        background
        layout="prev, pager, next, sizes"
        :total="resData.total"
        :page-size="params.pageSize"
        :current-page="params.page"
        @current-change="pageChangeHandler"
        :page-sizes="[5, 10, 15]"
        @size-change="pageSizeChangeHandler"
      >
      </el-pagination>
    </div>
  </div>
</template>
<script>
import requset from "@/utils/request";
import { mapActions } from "vuex";
import moment from 'moment';
export default {
  
  data() {
    return {
     params: {
        page: 1,
        pageSize: 5,
      },
      resData: {},
    };
  },
  methods: {
      
async pageQueryProductions() {
      // 过滤数据将空字符串删除
      for (let key in this.params) {
        if (this.params[key] == "") {
          delete this.params[key];
        }
      }
      let res = await requset.get("/account/pageQueryCustomerAccount", {
        params: this.params,
      });
      // console.log(res);
      if(res.status !== 200){
        return this.$message.error('获取失败！')
      }
      this.resData = res.data.list;
      console.log(this.resData);
    },
    // page改变事件
   pageChangeHandler(page) {
      this.params.page = page;
      this.pageQueryProductions();
    },
    // pageSize改变事件
    pageSizeChangeHandler(pageSize) {
      this.params.pageSize = pageSize;
      this.pageQueryProductions();
    }
  },
  created() {
    this.pageQueryProductions(); // 分页查询
    this.findAllCategories().then((res) => {
      this.categories = res.data.list;
    }); // 查询所有产品栏目
  },
};
</script>