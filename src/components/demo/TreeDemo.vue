<template>
  <div class="tree-demo">
    <el-tree
      ref="tree"
      :data="treeData"
      :props="defaultProps"
      node-key="id"
      highlight-current
      @node-click="handleNodeClick">
    </el-tree>
  </div>
</template>

<script>
export default {
  name: 'TreeDemo',
  data() {
    return {
      treeData: [{
        id: 1,
        label: '一级节点',
        children: [{
          id: 2,
          label: '二级节点 1'
        }, {
          id: 3,
          label: '二级节点 2'
        }]
      }],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  methods: {
    handleNodeClick(data) {
      console.log('点击的节点数据:', data)
    },
    setSelectedNode() {
      this.$nextTick(() => {
        // 通过节点的 key 设置当前选中节点
        this.$refs.tree.setCurrentKey(2) // 选中 id 为 2 的节点
        
        // 如果需要同时展开父节点，可以使用以下代码
        // const node = this.$refs.tree.getNode(2)
        // if (node && node.parent) {
        //   node.parent.expanded = true
        // }
      })
    }
  },
  mounted() {
    // 在组件挂载后执行选中操作
    this.setSelectedNode()
  }
}
</script>

<style scoped>
.tree-demo {
  padding: 20px;
}
</style>
