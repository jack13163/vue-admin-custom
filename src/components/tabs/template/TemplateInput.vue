<template>
  <el-card>
      <!-- 分类名称 -->
      <el-row>
        <el-col :span="2">
          <font color='red'>*</font>模板名称
        </el-col>
        <el-col :span="4">
          <el-input v-model="templateName" placeholder="请输入模板名称" />
        </el-col>
      </el-row>

      <el-divider></el-divider>

      <!-- 规格选项 -->
      <el-row>
        <el-col :span="24">
          <font color='red'>*</font>规格选项
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="4">
          <el-input v-model="specs.name" palceholder="规格名称" />
        </el-col>
        <el-col :span="4">
          <el-input v-model="specs.options" palceholder="规格列表，逗号隔开" />
        </el-col>
        <el-col :span="2">
          <i class="el-icon-circle-plus" @click="addSpec"></i>
        </el-col>
      </el-row>

      <el-row v-for="(item, index) in specs.dynamicItem" :key="'s' + index">
        <el-col :span="4">
          <el-input v-model="item.name" placeholder="规格名称"></el-input>
        </el-col>
        <el-col :span="4">
          <el-input v-model="item.options" placeholder="规格列表，逗号隔开"></el-input>
        </el-col>
        <el-col :span="2">
          <i class="el-icon-remove" @click="deleteSpec(item, index)"></i>
        </el-col>
      </el-row>

      <el-divider></el-divider>

      <!-- 参数选项 -->
      <el-row>
        <el-col :span="24">
          <font color='red'>*</font>参数选项
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="4">
          <el-input v-model="paras.name" palceholder="参数名称" />
        </el-col>
        <el-col :span="4">
          <el-input v-model="paras.options" palceholder="参数列表，逗号隔开" />
        </el-col>
        <el-col :span="2">
          <i class="el-icon-circle-plus" @click="addPara" type="primary"></i>
        </el-col>
      </el-row>

      <el-row v-for="(item, index) in paras.dynamicItem" :key="'p' + index" >
        <el-col :span="4">
          <el-input v-model="item.name" placeholder="参数名称"></el-input>
        </el-col>
        <el-col :span="4">
          <el-input v-model="item.options" placeholder="参数列表，逗号隔开"></el-input>
        </el-col>
        <el-col :span="2">
          <i class="el-icon-remove" @click="deletePara(item, index)"></i>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="24">
          <el-button type="success" round @click="addTemplate">提交</el-button>
        </el-col>
      </el-row>
  </el-card>
</template>

<style scoped>
.el-row{
  margin: 8px 10px;
  padding: 5px 5px;
  height: auto;
  line-height: 35px;
}
.el-card {
  height: auto;
}
</style>

<script>
  export default {
    data() {
      return {
        options: [],
        categoryId: 0,
        templateName: '智能手机',
        specs: {
          name: '保修期',
          options: '一年,两年,三年',
          dynamicItem: []
        },
        paras: {
          name: '运行内存',
          options: '4G,8G,16G',
          dynamicItem: []
        }
      }
    },
    methods: {
      addSpec () {
        this.specs.dynamicItem.push({
          name: '',
          options: ''
        })
      },
      addPara () {
        this.paras.dynamicItem.push({
          name: '',
          options: ''
        })
      },
      deleteSpec (item, index) {
        this.specs.dynamicItem.splice(index, 1)
      },
      deletePara (item, index) {
        this.paras.dynamicItem.splice(index, 1)
      },
      // 添加模板
      addTemplate() {
        const url = '/template';
        // 转换为json字符串
        var specs = [];
        var paras = [];
        specs.push({
          name: this.specs.name,
          options: this.specs.options
        });
        for (var i = 0; i < this.specs.dynamicItem.length; i++) {
          specs.push({
            name: this.specs.dynamicItem[i].name,
            options: this.specs.dynamicItem[i].options
          });
        }
        paras.push({
          name: this.paras.name,
          options: this.paras.options
        });
        for (var j = 0; j < this.paras.dynamicItem.length; j++) {
          paras.push({
            name: this.paras.dynamicItem[j].name,
            options: this.paras.dynamicItem[j].options
          });
        }

        const data = JSON.stringify({redirect: url, name: this.templateName, specs: specs, paras: paras});
        this.ajaxPost(url, data, response => {
          this.$message({
            type: 'success',
            message: '保存模板成功!'
          });

          // 跳转到列表Tab页
          this.$emit('tabChanged', 'template_list');
        }, e => {
          console.log(e);
        })
      }
    }
  }
</script>
