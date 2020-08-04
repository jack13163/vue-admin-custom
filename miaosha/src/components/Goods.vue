<template>
    <el-table
      :data="tableData"
      border
      style="width: 100%">
      <el-table-column
        prop="id"
        label="编号">
      </el-table-column>
      <el-table-column
        prop="name"
        label="名称">
      </el-table-column>
      <el-table-column
        label="图片"
        prop="imageUrl">
        <template slot-scope="scope">
          <img :src="scope.row.imageUrl" width="40" height="40" />
        </template>
      </el-table-column>
      <el-table-column
        prop="price"
        label="价格">
      </el-table-column>
      <el-table-column
        prop="stock"
        label="库存">
      </el-table-column>
      <el-table-column
        prop="note"
        label="备注">
      </el-table-column>
      <el-table-column
        label="操作">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text">详情</el-button>
        </template>
      </el-table-column>
    </el-table>
</template>

<script>
  export default {
    data() {
      return {
        tableData: []
      }
    },
    mounted() {
      // 在页面加载完成后请求数据
      this.queryGet('/goods', {redirect: '/goods'}, response => {
        console.log(response.data.data)
        this.tableData = response.data.data
      }, e => {
        alert('ok');
      })
    }
  }
</script>
