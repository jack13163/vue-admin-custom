<template>
  <el-card>
    <el-form label-width="80px">
      <el-form-item label="品牌名称">
        <el-input v-model="name"></el-input>
      </el-form-item>
      <el-form-item label="图片">
        <el-col :span="11">
          <el-upload :action="uploadUrl" :on-success="(value)=>uploadImageSuccess(value)" :show-file-list="false">
            <el-button size="small" type="primary">上传图片</el-button>
          </el-upload>
        </el-col>
      </el-form-item>
      <el-form-item label="排序">
        <el-col :span="11">
          <el-input placeholder="品牌排序" v-model="seq" style="width: 100%;" />
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<style scoped>
.el-row{
  margin: 8px 0;
  height: 35px;
  line-height: 35px;
}
.classA{
  height: auto;
}
</style>

<script>
  export default {
    data() {
      return {
        uploadUrl: 'http://127.0.0.1:18025/upload', // 图片上传路径
        name: '',
        seq: '',
        image: ''
      }
    },
    methods: {
      // 图片上传成功
      uploadImageSuccess(value) {
        this.$message({
          type: 'success',
          message: '品牌图片上传成功!'
        });
        this.image = value.data;
        console.log(this.image)
      },
      // 点击某一页
      pageChange(page) {
        this.pageNo = page;
        // 在页面加载完成后请求数据
        this.updateData();
      },
      // 更新数据
      updateData() {
        var url = '/brand';
        // 转换为json字符串
        const data = JSON.stringify({redirect: url, name: this.name, image: this.image, seq: this.seq});
        this.ajaxPost(url, data, response => {
          this.$message({
            type: 'success',
            message: '添加品牌成功!'
          });

          // 跳转到列表Tab页
          this.$emit('tabChanged', 'brand_list');
        }, e => {
          console.log(e);
        })
      },
      // 添加品牌
      onSubmit() {
        this.updateData();
      }
    }
  }
</script>
