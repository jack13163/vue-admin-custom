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

export default {
    components: {
      // 特别提醒，哪里使用这个组件，就在哪里注册
      goodsList,
      goodsInput,
      imageUpload,
      imageList,
      categoryInput,
      categoryList
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
            content: 'categoryInput'
          });
          this.tab_data.editableTabsValue = targetName;
        } else if (targetName === 'category_input') {
          this.tab_data.editableTabs.push({
            title: '添加分类',
            name: targetName,
            content: 'categoryList'
          });
          this.tab_data.editableTabsValue = targetName;
        }
      }
    }
  }
</script>
