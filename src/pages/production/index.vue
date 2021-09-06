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
          <el-input v-model="params.name" placeholder="请输入名称"></el-input>
        </el-form-item>
        <el-form-item>
          <el-select clearable v-model="params.status" placeholder="请选择状态">
            <el-option label="正常" value="正常"></el-option>
            <el-option label="下架" value="下架"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-select
            v-model="params.productCategoryId"
            placeholder="请选择栏目"
            clearable
          >
            <el-option
              v-for="(item, index) of categories"
              :label="item.name"
              :value="item.id"
              :key="index"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-button
          type="primary"
          size="small"
          style="margin-right: 10px"
          @click="pageQueryProductions"
          >查询</el-button
        >
      </el-form>
    </div>
    <div class="content">
      <!-- 表格 -->
      <el-table :data="resData.list" style="width: 100%" size="small">
        <el-table-column type="index" label="序号"></el-table-column>
        <el-table-column label="产品编号" prop="id"></el-table-column>
        <el-table-column label="名称" prop="name"></el-table-column>
        <el-table-column label="图片" prop="">
          <template v-slot="scope">
            <el-popover placement="right" width="225" trigger="hover">
              <img :src="scope.row.photo" width="200" alt="图片丢失" />
              <img
                slot="reference"
                :src="scope.row.photo"
                width="50"
                alt="图片丢失"
              />
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="价格" prop="price"></el-table-column>
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
        <el-table-column
          label="所属栏目"
          prop="category.name"
        ></el-table-column>
        <el-table-column label="操作">
          <template v-slot="scope">
            <el-button type="text">编辑</el-button>
            <el-button v-if="scope.row.status == '正常'" type="text"
              >下架</el-button
            >
            <el-button v-else type="text">上架</el-button>
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
            label="产品名称"
            :label-width="formLabelWidth"
            prop="name"
          >
            <el-input v-model="production.name"></el-input>
          </el-form-item>
          <el-form-item
            label="所属栏目"
            :label-width="formLabelWidth"
            prop="productCategoryId"
          >
            <el-select
              v-model="production.productCategoryId"
              placeholder="请选择所属栏目"
            >
              <el-option
                v-for="(item, index) of categories"
                :label="item.name"
                :value="item.id"
                :key="index"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            label="产品价格"
            :label-width="formLabelWidth"
            prop="price"
          >
            <el-input v-model="production.price"></el-input>
          </el-form-item>
          <el-form-item
            label="产品图片"
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
          <el-form-item label="产品简介" :label-width="formLabelWidth">
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
    </div>
  </div>
</template>
<script>
import requset from "@/utils/request";
import { mapActions } from "Vuex";
import qs from "qs";
export default {
  data() {
    return {
      params: {
        page: 1,
        pageSize: 5,
      },
      resData: {},
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
      let res = await requset.get("/product/pageQuery", {
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
            .post("/product/saveOrUpdate", qs.stringify(this.production))
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
    this.findAllCategories().then((res) => {
      this.categories = res.data.list;
    }); // 查询所有产品栏目
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