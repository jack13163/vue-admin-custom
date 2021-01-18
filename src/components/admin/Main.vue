<template>
    <el-row>
      <el-col :span="24">
        <el-tabs v-model="tab_data.editableTabsValue" type="card" closable @tab-remove="removeTab" >
          <el-tab-pane
            v-for="(item) in tab_data.editableTabs"
            :key="item.name"
            :label="item.title"
            :name="item.name">
            <!-- {{item.content}} -->
            <!-- tabChanged事件实现不同Tab之前的相互调用 -->
            <tab-component v-on:tabChanged="changeTab" :is=item.content></tab-component>
          </el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>
</template>

<style>

</style>

<script>
// 引入要用的组件
import goodsList from '@/components/tabs/goods/GoodsList.vue'
import goodsInput from '@/components/tabs/goods/GoodsInput.vue'
import imageUpload from '@/components/tabs/image/ImageUpload.vue'
import imageList from '@/components/tabs/image/ImageList.vue'
import categoryInput from '@/components/tabs/category/CategoryInput.vue'
import categoryList from '@/components/tabs/category/CategoryList.vue'
import brandInput from '@/components/tabs/brand/BrandInput.vue'
import brandList from '@/components/tabs/brand/BrandList.vue'
import templateInput from '@/components/tabs/template/TemplateInput.vue'
import templateList from '@/components/tabs/template/TemplateList.vue'
import getMock from '@/components/tabs/mock/GetMock.vue'
import postMock from '@/components/tabs/mock/PostMock.vue'

export default {
    components: {
      // 特别提醒，哪里使用这个组件，就在哪里注册
      goodsList,
      goodsInput,
      imageUpload,
      imageList,
      categoryInput,
      categoryList,
      brandInput,
      brandList,
      templateInput,
      templateList,
      getMock,
      postMock
    },
    props: {
      data: {}
    },
    data() {
      return {
        tab_data: this.data
      }
    },
    methods: {
      // 通知Layout父组件删除选项卡
      removeTab(targetName) {
        this.$emit('tabDeleted', targetName);
      },
      // 通知Layout父组件切换选项卡
      changeTab(targetName) {
        this.$emit('tabChanged', targetName);
      },
      // 根据Nav组件的传参创建选项卡
      addTab (targetName) {
        if (targetName === 'goods') {
          this.tab_data.editableTabs.push({
            title: '商品列表',
            name: targetName,
            content: 'goodsList'
          });
          this.tab_data.editableTabsValue = targetName;
        } else if (targetName === 'goods_input') {
          this.tab_data.editableTabs.push({
            title: '添加商品',
            name: targetName,
            content: 'goodsInput'
          });
          this.tab_data.editableTabsValue = targetName;
        } else if (targetName === 'images') {
          this.tab_data.editableTabs.push({
            title: '相册列表',
            name: targetName,
            content: 'imageList'
          });
          this.tab_data.editableTabsValue = targetName;
        } else if (targetName === 'image_upload') {
          this.tab_data.editableTabs.push({
            title: '添加相片',
            name: targetName,
            content: 'imageUpload'
          });
          this.tab_data.editableTabsValue = targetName;
        } else if (targetName === 'category_list') {
          this.tab_data.editableTabs.push({
            title: '分类列表',
            name: targetName,
            content: 'categoryList'
          });
          this.tab_data.editableTabsValue = targetName;
        } else if (targetName === 'category_input') {
          this.tab_data.editableTabs.push({
            title: '添加分类',
            name: targetName,
            content: 'categoryInput'
          });
          this.tab_data.editableTabsValue = targetName;
        } else if (targetName === 'brand_list') {
          this.tab_data.editableTabs.push({
            title: '品牌列表',
            name: targetName,
            content: 'brandList'
          });
          this.tab_data.editableTabsValue = targetName;
        } else if (targetName === 'brand_input') {
          this.tab_data.editableTabs.push({
            title: '添加品牌',
            name: targetName,
            content: 'brandInput'
          });
          this.tab_data.editableTabsValue = targetName;
        } else if (targetName === 'template_list') {
          this.tab_data.editableTabs.push({
            title: '模板列表',
            name: targetName,
            content: 'templateList'
          });
          this.tab_data.editableTabsValue = targetName;
        } else if (targetName === 'template_input') {
          this.tab_data.editableTabs.push({
            title: '添加模板',
            name: targetName,
            content: 'templateInput'
          });
          this.tab_data.editableTabsValue = targetName;
        } else if (targetName === 'mock_test_get') {
          this.tab_data.editableTabs.push({
            title: '测试Get',
            name: targetName,
            content: 'getMock'
          });
          this.tab_data.editableTabsValue = targetName;
        } else if (targetName === 'mock_test_post') {
          this.tab_data.editableTabs.push({
            title: '测试Post',
            name: targetName,
            content: 'postMock'
          });
          this.tab_data.editableTabsValue = targetName;
        }
      }
    }
  }
</script>
