<template>
  <div class="production">
    <div class="btns">
      <!-- 添加按钮 -->
      <el-form :inline="true" :model="params" size="small">
        <el-button
          @click="toAddHandler"
          type="primary"
          size="small"
          style="margin-right: 10px"
          >添加</el-button
        >
      </el-form>
    </div>
    <div class="content">
      <!-- 表格 -->
      <el-table :data="resData" style="width: 100%" size="small" >
        <el-table-column type="index" label="序号"></el-table-column>
        <el-table-column label="栏目ID" prop="id"></el-table-column>
        <el-table-column label="名称" prop="name"></el-table-column>
        <el-table-column label="库存" prop="num"></el-table-column>
        <el-table-column label="图标" prop="icon" >
          <template v-slot="scope" > 
          <img :src="scope.row.icon" width="200" alt="图片丢失" style="height:25px;width:25px" />
        </template>

        </el-table-column>
        <el-table-column label="操作" >
          <template v-slot="scope" > 
          <el-button type="danger"  size="mini" @click="productCategory(scope.row.id)">删除</el-button>  
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
        :page-sizes="[5, 10, 15]"
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
            label="名称"
            :label-width="formLabelWidth"
            prop="name"
          >
            <el-input v-model="production.name"></el-input>
          </el-form-item>
          <el-form-item
            label="库存"
            :label-width="formLabelWidth"
          >
          <el-input v-model="production.num"></el-input>
          </el-form-item>
          <el-form-item
            label="图标"
            :label-width="formLabelWidth"

          >
           <el-upload
              class="avatar-uploader"
              action="http://81.69.24.232/pet/jz_upload.php"
              :show-file-list="false"
              :on-success="handlePhotoSuccess"
            >
              <img v-if="imageUrl" :src="imageUrl" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
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
import qs from "qs";
export default {
  data() {
    return {
      params: {
        page: 1,
        pageSize: 5,
      },
      resData: [],
      categories: [],
      title: "",
      visible: false,
      production: {},
      formLabelWidth: "80px",
      imageUrl: null,
      rules: {
        name: [
          { required: true, message: "产品名称不能为空", trigger: "blur" }
        ]
      },
    };
  },
  methods: {
    // 分页查询产品表格
    async pageQueryProductions() {
      // 过滤数据将空字符串删除
      for (let key in this.params) {
        if (this.params[key] == "") {
          delete this.params[key];
        }
      }
      let res = await requset.get("/productCategory/pageQuery", {
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
    },
    // 新增按钮点击事件
    toAddHandler() {
      this.production = {};
      this.imageUrl = null;
      this.title = "新增商品";
      this.visible = true;
    },
    // 图片上传成功的回调
    handlePhotoSuccess(res, file) {
      // 将返回的图片在线地址映射到数据模型中
      this.production.photo = res;
      this.imageUrl = res;
    },
    // 表单保存事件
    toSavehandler() {
      this.$refs["saveForm"].validate((valid) => {
        if (valid) {
          requset
            .post("/productCategory/saveOrUpdate", qs.stringify(this.production))
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
    async productCategory(id){
      let res = await requset.get("/productCategory/deleteById?id="+id);
      console.log(this.resData);
      if(res.status !== 200){
        return this.$message.error('删除失败！')
      }
      this.$message.success('删除成功！')
      this.pageQueryProductions()
    },
    // 模态框关闭的回调
    dialogCloseHandler() {
      this.$refs["saveForm"].resetFields(); // 置空表单验证
    },
  },
  
  created() {
    this.pageQueryProductions(); // 分页查询产品
  },
};
</script>
<style scoped>
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