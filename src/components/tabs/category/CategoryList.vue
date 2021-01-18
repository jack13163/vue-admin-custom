<template>
  <el-card class="box-card">
      <el-tree
        :data="data"
        node-key="id"
        :expand-on-click-node="true">
        <span class="custom-tree-node" slot-scope="{ node, data }">
          <span>{{ node.label }}</span>
          <span>
            <el-button
              type="text"
              size="mini"
              @click="() => remove(node, data)">
              删除
            </el-button>
          </span>
        </span>
      </el-tree>
  </el-card>
</template>

<style>
  .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
  }
</style>

<script>
  export default {
    data() {
      return {
        data: [] // 分类集合
      }
    },
    methods: {
      remove(node, data) {
        var id = node.data.value;
        this.$confirm('确定要删除该分类吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          const url = '/category/' + id;
          this.ajaxDelete(url, {redirect: url}, response => {
            // 更新数据
            this.updateData();
          }, e => {
            console.log(e);
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      updateData() {
        // 在页面加载完成后请求数据
        this.queryGet('/category/menu', {redirect: '/category/menu'}, response => {
          this.data = response.data.data
        }, e => {
          console.log(e)
        })
      }
    },
    mounted() {
      this.updateData();
    }
  };
</script>
