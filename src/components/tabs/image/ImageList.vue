<template>
  <div>
    <el-table
      :data="tableData"
      border
      style="width: 100%">
      <el-table-column
        align="center"
        prop="id"
        label="编号">
      </el-table-column>
      <el-table-column
        align="center"
        prop="title"
        label="名称">
      </el-table-column>
      <el-table-column
        align="center"
        label="封面"
        prop="image">
        <template slot-scope="scope">
          <img :src="scope.row.image" width="40" height="40" />
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="操作">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text">详情</el-button>
          <el-button @click="deleteClick(scope.row)" type="text">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--仅有一页时不显示分页插件-->
    <el-pagination
      background
      :hide-on-single-page="true"
      layout="prev, pager, next"
      :current-page="pageNo"
      :page-size="pageSize"
      :total="total"
      @current-change="pageChange">
    </el-pagination>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        pageNo: 1,
        pageSize: 5,
        total: 1,
        pages: 1,
        tableData: []
      }
    },
    methods: {
      updateData() {
        // 在页面加载完成后请求数据
        this.queryGet('/album/' + this.pageNo + '/' + this.pageSize, {redirect: '/album'}, response => {
          const data = response.data.data;
          this.tableData = data.list;
          this.pages = data.pages;
          this.pageNo = data.pageNum;
          this.total = data.total;
          console.log(this.tableData);
        }, e => {
          console.log(e)
        })
      },
      pageChange(page) {
        this.pageNo = page;
        // 在页面加载完成后请求数据
        this.updateData();
      },
      deleteClick(row) {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          const url = '/album/' + row.id;
          this.ajaxDelete(url, {redirect: url}, response => {
            // 更新表格中的数据
            this.updateData();
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
          }, e => {
            console.log(e);
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      }
    },
    mounted() {
      // 在页面加载完成后请求数据
      this.updateData();
    }
  }
</script>
