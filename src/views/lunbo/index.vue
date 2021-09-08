<!--
 * @Author: your name
 * @Date: 2021-09-06 17:52:25
 * @LastEditTime: 2021-09-08 17:56:44
 * @LastEditors: LAPTOP-CC091CC3
 * @Description: In User Settings Edit
 * @FilePath: \code\houtai\src\lunbo\index.vue
-->
<template>
  <div class="carousel">
    <div class="btns">
      <el-form :inline="true" :model="params" size="small">
        <el-button
          @click="toAddHandler"
          type="success"
          size="small"
          style="margin-right: 12px" >新增</el-button>
        <el-button
          type="success"
          size="small"
          style="margin-right: 12px"
          @click="showPhoto"
          >预览</el-button>
      </el-form>
    </div>
    <div class="content">
      <!-- 表格 -->
      <el-table :data="resData" style="width: 100%" size="small">
        <el-table-column label="序号"  prop="id"></el-table-column>
        <el-table-column label="轮播图名称" prop="name" ></el-table-column>
        <el-table-column label="轮播图描述" prop="introduce" ></el-table-column>
        <el-table-column label="轮播图图片" prop="url">
          <template v-slot="scope">
              <img :src="scope.row.url" width="200" alt="图片丢失" />
          </template>
        </el-table-column>
        <el-table-column label="状态" prop="status" >
          <template v-slot="scope">
            <el-tag
              v-if="scope.row.status == '正常'"
              size="mini"
              type="success"
              >{{ scope.row.status }}</el-tag
            >
            <el-tag v-else size="mini" type="danger" >{{
              scope.row.status
            }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作"> 
          <template v-slot="scope">
            <el-button type="text">编辑</el-button>
            <el-button type="text" @click="carouselDel(scope.row.id)">删除</el-button>
            <el-button  type="text">停用</el-button>
          </template>
        </el-table-column>
      </el-table>
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
            label="轮播图片"
            :label-width="formLabelWidth"
            prop="photo"
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
          <el-form-item label="描述" :label-width="formLabelWidth">
            <el-input
              type="textarea"
              v-model="production.description"
            ></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="visible = false">取 消</el-button>
          <el-button type="primary" @click="toSavehandler">确 定</el-button>
        </div>
      </el-dialog>
      <el-dialog
        :title="title"
        :visible.sync="visible1"
        @close="dialogCloseHandler"
      >
      <el-input v-model="production.name"></el-input>
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
          { required: true, message: "产品名称不能为空", trigger: "blur" },
        ],
        productCategoryId: [
          {
            required: true,
            message: "产品所属栏目不能为空",
            trigger: "change",
          },
        ],
        price: [
          { required: true, message: "产品价格不能为空", trigger: "blur" },
        ],
        photo: [{ required: true, message: "请上传产品封面", trigger: "blur" }],
      },
    };
  },
  methods: {
    // 分页查询产品表格
    async pageQueryProductions() {
      let res = await requset.get("/carousel/findAll");

      if(res.status !== 200){
        return this.$message.error('获取失败！')}
        this.$message.success('获取成功！')
              this.resData = res.data;
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
      this.title = "新增轮播图";
      this.visible = true;
    },
    showPhoto(){
 this.production = {};
      this.imageUrl = null;
      this.title = "大屏预览";
      this.visible1 = true;
    },
    async carouselDel(id){
      let res = await requset.get('/carousel/deleteById?id='+id)
      if(res.status !== 200){
        return this.$message.error('删除失败！')
      }
      this.$message.success('删除成功！')
      this.pageQueryProductions()
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
            .post("/carousel/saveOrUpdate", qs.stringify(this.carousel))
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
