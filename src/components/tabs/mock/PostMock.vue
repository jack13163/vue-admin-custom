<template>
  <div>
    <el-button @click="getUserById" round>根据ID获取用户信息</el-button>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="id" label="编号" width="180"></el-table-column>
      <el-table-column prop="name" label="姓名" width="180"></el-table-column>
      <el-table-column prop="address" label="地址"></el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: []
    };
  },
  methods: {
    getUserById () {
      // 测试请求mock数据
      this.$axios
        .post('http://127.0.0.1:9960/test/user', {
          id: 3
        })
        .then(response => {
          this.tableData = response.data;
        })
        .catch(e => {
          console.log(e);
        });
    }
  }
};
</script>
