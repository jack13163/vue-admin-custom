<template>
  <el-container>
    <el-header class="main_header">
      <top></top>
    </el-header>
    <el-container class="main_container">
      <el-aside class="main_left">
        <left v-on:navClicked="addTab"></left>
      </el-aside>
      <el-main class="main_right">
        <right :data="tabData" v-on:tabDeleted="deleteTab" ref="tagFlag"></right>
      </el-main>
    </el-container>
  </el-container>
</template>

<style>
html, body {
  height: 100%;
}

.main_header {
  width: 100%;
}

.main_container {
  width: 100%;
  display: flex;
  justify-content: left;
  align-items: flex-start;
}

.main_left {
  width: 300px;
  height: 100%;
}

.main_right {
  width: 100%;
  height: 100%;
}

.el-menu {
  border: none;
}
</style>

<script>
import top from '@/components/admin/Top.vue';
import left from '@/components/admin/Nav.vue';
import right from '@/components/admin/Main.vue';

export default {
  // 注册子组件
  components: {
    top,
    left,
    right
  },
  data() {
    return {
      // 需要传递给right子组件的数据
      tabData: {
        editableTabsValue: 'index',
        editableTabs: [{
          title: '首页',
          name: 'index',
          content: 'goods'
        }]
      }
    }
  },
  methods: {
    // Nav组件事件事件监听：点击导航时会触发该方法，添加选项卡
    addTab(targetName) {
      // 判断是否已经打开，若已经打开，则不要重复打开
      let tmp = this.tabData.editableTabs.filter(e => e.name === targetName);
      if (tmp.length > 0) {
        this.tabData.editableTabsValue = targetName;
        return;
      }
      // 为了将所有子组件的调用集中在Main组件中完成，因此，这里需要调用Main组件中的addTab方法，实现选项卡的添加
      this.$refs.tagFlag.addTab(targetName);
    },
    // Main组件事件事件监听：删除选项卡
    deleteTab(targetName) {
      let tabs = this.tabData.editableTabs;
      let activeName = this.tabData.editableTabsValue;
      tabs.forEach((tab, index) => {
        if (tab.name === targetName) {
          let nextTab = tabs[index + 1] || tabs[index - 1];
          if (nextTab) {
            activeName = nextTab.name;
          }
        }
      });
      this.tabData.editableTabsValue = activeName;
      this.tabData.editableTabs = tabs.filter(tab => tab.name !== targetName);
    },
    // Main组件事件事件监听：选中的选项卡发生变化
    changeTab(targetName) {
      this.tabData.editableTabsValue = targetName;
    }
  }
}
</script>
