<template>
  <div class="production">
    <div class="btns">
      <!-- 检索框 -->
      <el-form :inline="true" :model="params" size="small">
        <el-button
          @click="toAddHandler"
          type="primary"
          size="small"
          style="margin-right: 10px"
          >添加</el-button
        >
        <el-form-item>
          <el-input v-model="params.username" placeholder="请输入用户名称"></el-input>
        </el-form-item>
        <el-form-item>
          <el-select clearable v-model="params.status" placeholder="请选择状态">
            <el-option label="正常" value="正常"></el-option>
            <el-option label="禁用" value="禁用"></el-option>
          </el-select>
        </el-form-item>
       
        <el-button
          type="primary"
          size="small"
          style="margin-right: 10px"
          @click="pageQueryProductions"
          icon="el-icon-search"
          >查询</el-button
        >
      </el-form>
    </div>
    <div class="content">
      <!-- 表格 -->
      <el-table :data="resData.list" style="width: 100%" size="small">
        <el-table-column  label="编号" prop="id"></el-table-column>
        <el-table-column label="用户名" prop="username"></el-table-column>
        <el-table-column label="姓名" prop="realname"></el-table-column>
        <el-table-column label="手机号" prop="telephone">
          <!-- <template v-slot="scope">
            <el-popover placement="right" width="225" trigger="hover">
              <img :src="scope.row.photo" width="200" alt="图片丢失" />
              <img
                slot="reference"
                :src="scope.row.photo"
                width="50"
                alt="图片丢失"
              />
            </el-popover>
          </template> -->
        </el-table-column>
        <el-table-column label="性别" prop="gender" >
          <!-- <template v-slot="scope"> {{ scope.row.price }}  </template> -->
        </el-table-column>
        <el-table-column label="状态" prop="status">
          <template v-slot="scope">
            <el-tag
              v-if="scope.row.status == '正常'"
              size="mini"
              type="success"
              >{{ scope.row.status }}</el-tag
            >
            <el-tag v-else size="mini" type="danger">{{
              scope.row.status
            }}</el-tag>
          </template>
        </el-table-column>
      
        <el-table-column label="操作">
          <template v-slot="scope">
            <el-button type="text" @click="editHandler(scope.row)"
              >编辑</el-button
            >
            <el-button
              v-if="scope.row.status == '正常'"
              type="text"
              style="color: red"
              @click="offlineHandler(scope.row.id, $event)"
              >禁用</el-button
            >
            <el-button
              v-else
              type="text"
              @click="offlineHandler(scope.row.id, $event)"
              style="color: green"
              >正常</el-button
            >
             <el-button type="text" @click="editDelete(scope.row.id)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        background
        layout="prev, pager, next, sizes"
        :total="resData.total"
        :page-size="params.pageSize"
        :current-page="params.page"
        @current-change="pageChangeHandler"
        :page-sizes="[6, 12, 18]"
        @size-change="pageSizeChangeHandler"
      >
      </el-pagination>
      <!-- 模态框 -->
      <el-dialog
        :title="title"
        :visible.sync="visible"
        @close="dialogCloseHandler"
      >
        <el-form :model="production" :rules="rules" ref="saveForm">
          <el-form-item
            label="用户名"
            :label-width="formLabelWidth"
            prop="username"
          >
            <el-input v-model="production.username"></el-input>
          </el-form-item>
          <el-form-item
            label="姓名"
            :label-width="formLabelWidth"
            prop="realname"
          >
           <el-input v-model="production.realname"></el-input>
          </el-form-item>
          <el-form-item
            label="手机号"
            :label-width="formLabelWidth"
            prop="telephone"
          >
            <el-input v-model="production.telephone"></el-input>
          </el-form-item>
          <el-form-item
            label="性别"
            :label-width="formLabelWidth"
            prop="gender"
          >
            <el-radio v-model="production.gender" label="男">男</el-radio>
          <el-radio v-model="production.gender" label="女">女</el-radio>
          </el-form-item>
          <el-form-item label="状态"
           :label-width="formLabelWidth"
            prop="status"
           >
          <el-radio v-model="production.status" label="正常">正常</el-radio>
          <el-radio v-model="production.status" label="禁用">禁用</el-radio>
   
          
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="visible = false">取 消</el-button>
          <el-button type="primary" @click="toSavehandler">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import requset from "@/utils/request";
import { mapActions } from "Vuex";
import qs from "qs";
import _ from "lodash";
export default {
  data() {
    return {
      params: {
        page: 1,
        pageSize: 6,
      },
      resData: {},
      categories: [],
      title: "",
      visible: false,
      production: {},
      formLabelWidth: "80px",
      rules: {
        username: [
          { required: true, message: "用户名称不能为空", trigger: "blur" },
        ],
        realname: [
          {
            required: true,
            message: "真实名称不能为空",
            trigger: "change",
          },
        ],
        telephone: [
          { required: true, message: "电话不能为空", trigger: "blur" },
        ],
        
      },
    
       radio: '1'
    };
  },
  methods: {
    // 导入状态机中的方法
    ...mapActions("category", ["findAllCategories"]),
    // 分页查询产品表格
    async pageQueryProductions() {
      // 过滤数据将空字符串删除
      for (let key in this.params) {
        if (this.params[key] == "") {
          delete this.params[key];
        }
      }
      let res = await requset.get("/baseUser/pageQuery", {
        params: this.params,
      });
      this.resData = res.data;
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
    },
    // 新增按钮点击事件
    toAddHandler() {
      this.production = {};
    
      this.title = "新增商品";
      this.visible = true;
    },
  
    // 表单保存事件
    toSavehandler() {
      this.$refs["saveForm"].validate((valid) => {
        if (valid) {
          requset
            .post("/baseUser/saveOrUpdate", qs.stringify(this.production))
            .then((res) => {
              this.pageQueryProductions(); // 重载数据
              this.$message.success(res.message); // 提示操作结果信息
              this.visible = false; // 关闭模态框
            });
        } else {
          return false;
        }
      });
    },
    // 模态框关闭的回调
    dialogCloseHandler() {
      this.$refs["saveForm"].resetFields(); // 置空表单验证
    },
    // 编辑按钮点击事件
    editHandler(row) {
      this.production = _.clone(row); // 将当前行数据赋值给数据模型
      this.title = "编辑产品信息";
      this.visible = true;
    },
     // 删除按钮点击事件
    editDelete(id) {
       this.$confirm("此操作将永久删除该用户, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        requset.get("/baseUser/deleteById", { params: { id } }).then((res) => {
           this.pageQueryProductions(); // 重载数据
          this.$message({
            type: "success",
            message: res.message,
          }); // 提示成功信息
        });
      });
    },
    // 下架、上架执行处理程序
    offlineHandler(id, e) {
      this.$confirm("是否确认该操作?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        if (e.target.innerText == "禁用") {
          requset.get("/baseUser/saveOrUpdate", { params: { id } }).then((res) => {
            this.production.status="禁用"
            this.pageQueryProductions(); // 重载数据
            this.$message.success(res.message); // 提示信息
          });
        } else {
          requset.get("/baseUser/saveOrUpdate", { params: { id } }).then((res) => {
               this.production.status="正常"
            this.pageQueryProductions(); // 重载数据
            this.$message.success(res.message); // 提示信息
          });
        }
      });
    },
  },
  created() {
    this.pageQueryProductions(); // 分页查询产品
    this.findAllCategories().then((res) => {
      this.categories = res.data.list;
    }); // 查询所有产品栏目
  },
};
</script>
<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>