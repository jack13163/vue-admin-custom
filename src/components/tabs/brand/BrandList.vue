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
          prop="name"
          label="名称">
        </el-table-column>
        <el-table-column
          align="center"
          label="图片"
          prop="image">
          <template slot-scope="scope">
            <img :src="scope.row.image" width="40" height="40" />
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="seq"
          label="排序">
        </el-table-column>
        <el-table-column
          align="center"
          label="操作">
          <template slot-scope="scope">
            <el-button @click="edit(scope.row.id)" size="small" type="primary">编辑</el-button>
            <el-button @click="remove(scope.row.id)" size="small"  type="primary">删除</el-button>
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
        tableData: [] // 分类集合
      }
    },

    methods: {
      edit(id) {
      },
      remove(id) {
        this.$confirm('确定要删除该品牌吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          const url = '/brand/' + id;
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
      pageChange(page) {
        this.pageNo = page;
        // 在页面加载完成后请求数据
        this.updateData();
      },
      updateData() {
        // 在页面加载完成后请求数据
        var url = '/brand/search/' + this.pageNo + '/' + this.pageSize;
        this.queryGet(url, {redirect: url}, response => {
          const data = response.data.data;
          this.tableData = data.list;
          this.pages = data.pages;
          this.pageNo = data.pageNum;
          this.total = data.total;
          console.log(this.total)
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
