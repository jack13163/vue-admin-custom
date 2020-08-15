<template>
  <div>
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item v-for="(spec,index) in props.row.specs" :key="index + 's'" :label="spec.name">
              <span>{{ spec.options }}</span>
            </el-form-item>
            <el-form-item v-for="(para,index) in props.row.paras" :key="index + 'p'" :label="para.name">
              <span>{{ para.options }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column
        label="模板编号"
        prop="id">
      </el-table-column>
      <el-table-column
        label="模板名称"
        prop="name">
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

<style>
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
</style>

<script>
  export default {
    data() {
      return {
        tableData: [],
        pageNo: 1,
        pageSize: 5,
        total: 1
      }
    },
    methods: {
      updateData() {
        // 在页面加载完成后请求数据
        var url = '/template/search/' + this.pageNo + '/' + this.pageSize;
        this.queryGet(url, {redirect: url}, response => {
          const data = response.data.data;
          this.tableData = data.list;
          this.pages = data.pages;
          this.pageNo = data.pageNum;
          this.total = data.total;
        }, e => {
          console.log(e)
        })
      },
      pageChange(page) {
        this.pageNo = page;
        // 在页面加载完成后请求数据
        this.updateData();
      }
    },
    mounted() {
      this.updateData();
    }
  }
</script>
