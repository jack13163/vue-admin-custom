<template>
  <el-card>
      <!-- 分类名称 -->
      <el-row>
        <el-col :span="2">
          分类名称
        </el-col>
        <el-col :span="5">
          <el-input v-model="categoryName" aria-placeholder="请输入分类名称" />
        </el-col>
      </el-row>

      <!-- 分类选项 -->
      <el-row>
        <el-col :span="2">
          父分类
        </el-col>
        <el-col :span="5">
          <el-cascader
            placeholder="默认为一级菜单"
            :options="categorys"
            clearable
            @change="handleChange"
            filterable></el-cascader>
        </el-col>
      </el-row>

      <!-- 所在模板 -->
      <el-row>
        <el-col :span="2">
          模板
        </el-col>
        <el-col :span="5">
          <el-select v-model="templateId" placeholder="请选择">
            <el-option
              v-for="item in templates"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-col>
      </el-row>

      <!-- 是否为菜单和是否显示 -->
      <el-row>
        <el-checkbox v-model="isMenu">是否为菜单</el-checkbox>
        <el-checkbox v-model="isShow">是否显示</el-checkbox>
      </el-row>

      <!-- 排序 -->
      <el-row>
        <el-col :span="2">
          排序
        </el-col>
        <el-col :span="5">
          <el-input v-model="seq" placeholder="请输入分类排序" />
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="24">
          <el-button type="success" round @click="addCategory">提交</el-button>
        </el-col>
      </el-row>
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
        categorys: [],
        templates: [],
        parentId: 0, // 父类别编号
        categoryName: '', // 分类名称
        templateId: null, // 模板编号
        isShow: null, // 是否显示
        seq: 0, // 优先级
        isMenu: 1// 是否为菜单
      }
    },
    methods: {
      // 选择的商品分类改变
      handleChange(node) {
        if (node.length === 0) {
          this.parentId = 0;
        } else if (node.length === 1) {
          this.parentId = node[0];
        } else if (node.length === 2) {
          this.parentId = node[1];
        } else {
          this.parentId = node[2];
        }
      },
      // 添加分类
      addCategory() {
        const url = '/category';
        // 转换为json字符串
        const data = JSON.stringify({
          redirect: url,
          parentId: this.parentId,
          templateId: this.templateId,
          name: this.categoryName,
          isShow: this.isShow ? '1' : '0',
          seq: this.seq,
          isMenu: this.isMenu ? '1' : '0'
        });
        this.ajaxPost(url, data, response => {
          this.$message({
            type: 'success',
            message: '保存分类成功!'
          });

          // 跳转到列表Tab页
          this.$emit('tabChanged', 'category_list');
        }, e => {
          console.log(e);
        })
      }
    },
    mounted() {
      // 在页面加载完成后请求数据
      var url = '/category/menu'
      this.queryGet(url, {redirect: url}, response => {
        this.categorys = response.data.data
      }, e => {
        console.log(e)
      })

      // 在页面加载完成后请求数据
      url = '/template'
      this.queryGet(url, {redirect: url}, response => {
        this.templates = response.data.data
      }, e => {
        console.log(e)
      })
    }
  }
</script>
