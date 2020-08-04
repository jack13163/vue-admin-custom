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
            <tab-component :is=item.content></tab-component>
          </el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>
</template>

<style>

</style>

<script>
// 引入要用的组件
import goods from '@/components/Goods.vue'

export default {
    components: {
      // 特别提醒，哪里使用这个组件，就在哪里注册
      goods
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
      // 根据Nav组件的传参创建选项卡
      addTab (targetName) {
        if (targetName === 'goods') {
          this.tab_data.editableTabs.push({
            title: '商品列表',
            name: targetName,
            content: 'goods'
          });
          this.tab_data.editableTabsValue = targetName;
        } else {
          this.tab_data.editableTabs.push({
            title: '未指定',
            name: targetName,
            content: 'goods'
          });
          this.tab_data.editableTabsValue = targetName;
        }
      }
    }
  }
</script>
