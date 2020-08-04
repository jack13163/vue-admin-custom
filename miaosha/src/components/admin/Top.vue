<template>
  <el-container>
    <el-aside class="header_left">
      <img src="../../assets/logo2.png" />
    </el-aside>
    <el-main class="header_right">
      <el-avatar icon="el-icon-user-solid" class="user_acvator"></el-avatar>
    </el-main>
  </el-container>
</template>

<style>
  .header_left {
    width: 200px;
    display: flex;
    justify-content: left;
    align-items: center;
  }

  .header_right {
    width: 100%;
    padding: 0px;
    display: flex;
    justify-content: center;
  }

  section{
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0;
  }

  .user_acvator {
    /* 实现右对齐 */
    margin-left: auto;
  }

</style>

<script>

</script>
