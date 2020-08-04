<template>
<el-row class="tac">
  <el-menu
      default-active="2"
      @open="handleOpen"
      @close="handleClose">
    <el-submenu index="1">
      <template slot="title">
        <i class="el-icon-user"></i>
        <span>用户管理</span>
      </template>
      <el-menu-item index="1-1" @click="nav_clicked('user')">编辑用户</el-menu-item>
      <el-menu-item index="1-2" @click="nav_clicked('pass')">修改密码</el-menu-item>
    </el-submenu>

    <el-submenu index="2">
      <template slot="title">
        <i class="el-icon-goods"></i>
        <span>商品管理</span>
      </template>
      <el-menu-item index="2-1" @click="nav_clicked('goods')">编辑商品</el-menu-item>
    </el-submenu>
  </el-menu>
</el-row>
</template>

<style>
.tac {
  height: 100%;
}
</style>

<script>
  export default {
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      nav_clicked (name) {
        // 当导航被点击时，通知父容器添加选项卡
        this.$emit('navClicked', name);
      }
    }
  }
</script>
