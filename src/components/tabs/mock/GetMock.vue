<template>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column prop="datetime" label="日期" width="180"></el-table-column>
    <el-table-column prop="name" label="姓名" width="180"></el-table-column>
    <el-table-column prop="address" label="地址"></el-table-column>
  </el-table>
</template>

<script>
export default {
  data() {
    return {
      tableData: []
    };
  },
  methods: {
    updateData() {
      // 测试请求mock数据
      this.$axios
        .get('http://127.0.0.1:9960/test/user')
        .then(response => {
          this.tableData = response.data.users;
          console.log(this.tableData);
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  mounted() {
    this.updateData();
  }
};
</script>
