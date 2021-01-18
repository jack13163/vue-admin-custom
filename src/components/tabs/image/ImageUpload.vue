<template>
  <div>
    <!--相册封面预览-->
    <el-input v-model="title" placeholder="请输入相册名称"></el-input>
    <el-upload
      class="avatar-uploader"
      action="http://127.0.0.1:18025/upload"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload">
      <img v-if="imageUrl" :src="imageUrl" class="avatar">
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
    <!--相册图片列表-->
    <el-upload
      ref="upload"
      action="http://127.0.0.1:18025/upload"
      :multiple="ture"
      :on-preview="handlePreview"
      :file-list="fileList"
      :limit="5"
      :auto-upload="true"
      :on-exceed="handleExceed"
      :on-remove="uploadRemove"
      :on-success="successUpload"
      list-type="picture">
      <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
      <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
    </el-upload>
    <!--图片预览-->
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
    <el-button size="small" type="primary" @click="saveAlbum">保存相册</el-button>
  </div>
</template>

<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
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

<script>
  export default {
    data() {
      return {
        title: '',
        imageUrl: '',
        fileList: [], // name,url
        dialogImageUrl: '', // 图片预览地址
        dialogVisible: false
      };
    },
    methods: {
      // 上传的文件被移除
      uploadRemove(files, fileList) {
        this.fileList = fileList;
      },
      // 上传文件个数超出限制
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 5 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      // 保存相册
      saveAlbum() {
        const url = '/album';
        // 转换为json字符串
        var imageList = this.fileList.map(function(cur, index, arr) {
          return cur.response.data;
        })
        const images = JSON.stringify(imageList);
        console.log(images)
        const data = JSON.stringify({redirect: url, title: this.title, image: this.imageUrl, imageItems: images});
        this.ajaxPost(url, data, response => {
          this.$message({
            type: 'success',
            message: '保存相册成功!'
          });

          // 跳转到列表Tab页
          this.$emit('tabChanged', 'images');
          const data = response.data.data;
          console.log(data);
        }, e => {
          console.log(e);
        })
      },
      // 相册封面上传成功
      handleAvatarSuccess(res) {
        this.imageUrl = res.data;
      },
      // 上传相册封面之前检验
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
      // 相册中的相片上传成功
      successUpload(response, file, fileList) {
        const h = this.$createElement;
        this.$notify({
          title: '图片上传成功',
          message: h('i', {style: 'color: teal'}, file.name + '上传成功')
        });
        this.fileList = fileList;
      },
      // 保存相册
      submitUpload() {
        this.$refs.upload.submit();
      },
      // 图片预览
      handlePreview(file) {
        console.log(file);
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      }
    }
  }
</script>
