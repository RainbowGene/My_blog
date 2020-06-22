<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>文章管理</el-breadcrumb-item>
      <el-breadcrumb-item>添加文章</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图 -->
    <el-card>
      <el-form ref="addFormRef" :rules="addFormRules" :model="formData">
        <el-form-item label="标题" prop="title">
          <el-input v-model="formData.title"></el-input>
        </el-form-item>
        <el-form-item label="作者">
          <el-input v-model="formData.username" disabled></el-input>
        </el-form-item>
        <el-row>
          <!--类别选择-->
          <el-col :span="12">
            <el-form-item label="类别" prop="type">
              <el-select v-model="formData.typeval" placeholder="请选择">
                <el-option
                  v-for="(item,index) in typeList"
                  :key="index"
                  :label="item.typename"
                  :value="item._id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <!-- 标签选择 -->
          <!-- <el-col :span="12">
            <el-select v-model="typeval" placeholder="请选择">
              <el-option
                v-for="(item,index) in typeList"
                :key="index"
                :label="item.typename"
                :value="item._id"
              ></el-option>
            </el-select>
          </el-col>-->
        </el-row>
        <el-form-item label="id" hidden>
          <el-input v-model="formData.id" disabled hidden></el-input>
        </el-form-item>
        <!-- {{ msg }} -->
        <el-form-item label="封面" prop="cover">
          <el-upload
            class="upload-demo"
            action="/api/admin/upload-cover"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :on-success="handleSuccess"
            :before-remove="beforeRemove"
            multiple
            :limit="1"
            :on-exceed="handleExceed"
            :file-list="fileList"
          >
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-form-item>
        <el-form-item label="内容" prop="content"></el-form-item>
        <tinymce-editor ref="editor" v-model="formData.content" :disabled="disabled"></tinymce-editor>
        <!-- <el-button type="primary" @click="clear">清空内容</el-button>
      <el-button type="info" v-show="!disabled" @click="disabled = true">禁用</el-button>
        <el-button type="success" v-show="disabled" @click="disabled = false">启用</el-button>-->
      </el-form>

      <br />
      <!-- <span slot="footer" class="dialog-footer"> -->
      <el-button type="primary" v-if="isShow" @click="createArticle">发 布</el-button>
      <el-button type="primary" v-else @click="editArticle">提交修改</el-button>
      <el-button type="info" @click="cencel">取 消</el-button>
      <!-- </span> -->
    </el-card>
  </div>
</template>

<script>
import TinymceEditor from "@/components/common/Tinymce";
export default {
  data() {
    return {
      isShow: true,
      aid: null,
      disabled: false,
      formData: {
        aid: null,
        id: sessionStorage.getItem("id"),
        username: sessionStorage.getItem("username"),
        title: null,
        cover: null, // 封面地址
        content: null,
        typeval: null, // 文章所属类别
        label: null // 标签
      },
      // 添加表单的验证规则对象
      addFormRules: {
        title: [
          { required: true, message: "请填写标题", trigger: "blur" },
          {
            max: 50,
            message: "标题不能超过50个字符",
            trigger: "blur"
          }
        ],
        content: [{ required: true, message: "请填写内容", trigger: "blur" }]
      },
      fileList: [],
      typeList: []
    };
  },
  components: {
    TinymceEditor
  },
  mounted() {
    this.getArttype();
    if (this.$route.query.aid) {
      // 有文章id传入，为编辑文章
      this.isShow = false;
      this.formData.aid = this.$route.query.aid;
      this.editPage(this.$route.query.aid);
    }
  },
  methods: {
    // 编辑时的数据填充
    async editPage(aid) {
      const { data, status } = await this.$api.admin.getArtOne({ aid });
      if (status === 200 && data) {
        // 填充页面数据
        this.formData.id = data.author._id;
        this.formData.title = data.title;
        this.formData.content = data.content;
        this.formData.label = data.label;
        this.aid = aid;
        // 图片上传控件填充
        this.formData.cover = data.cover;
        const cname = data.cover.split("cover_img/")[1];
        const coverItem = { name: cname, url: data.cover };
        this.fileList.push(coverItem);
        // 下拉框处理
        this.formData.typeval = data.type._id;
      }
    },
    async getArttype() {
      const { data } = await this.$api.admin.getArttype({ all: "all" });
      if (data) return (this.typeList = data.records);
      return this.$message.info("类别选择器加载失败");
    },
    handleRemove(file, fileList) {
      this.fileList = [];
      // console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 1 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      );
    },
    // 文件移除
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    // 上传成功
    handleSuccess(res) {
      if (res.status === 200) {
        const coverItem = { name: res.name, url: res.url };
        this.formData.cover = coverItem.url;
        this.fileList.push(coverItem);
      } else {
        this.$message.error("上传失败！");
      }
    },
    // 发布文章
    createArticle() {
      // console.log(this.formData);
      this.$refs.addFormRef.validate(valid => {
        // 预验证
        if (!valid) return;
        if (!this.formData.typeval) return this.$message.info("请选择类别");
        this.$api.admin
          .addArticle(this.formData)
          .then(res => {
            if (res.status === 200) {
              this.$message.success("添加成功");
              this.$router.push("/article");
            }
          })
          .catch(err => {
            return this.$message.info("添加失败");
          });
      });
    },
    editArticle() {
      // 文章修改
      console.log(this.formData);
      this.$refs.addFormRef.validate(valid => {
        // 预验证
        if (!valid) return;
        if (!this.formData.typeval) return this.$message.info("请选择类别");
        this.$api.admin
          .editArticle(this.formData)
          .then(res => {
            console.log(res.msg);
            if (res.status === 200) {
              this.$message.success("修改成功");
              this.$router.push("/article");
            }
          })
          .catch(err => {
            return this.$message.info("修改失败");
          });
      });
    },
    // cencel
    cencel() {
      this.$router.push("/article");
    }
  }
};
</script>
<style lang='scss' scoped>
</style>
