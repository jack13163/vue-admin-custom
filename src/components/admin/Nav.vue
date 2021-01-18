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
      <el-menu-item index="2-1" @click="nav_clicked('goods')">商品列表</el-menu-item>
      <el-menu-item index="2-1" @click="nav_clicked('goods_input')">添加商品</el-menu-item>
    </el-submenu>

    <el-submenu index="3">
      <template slot="title">
        <i class="el-icon-orange"></i>
        <span>分类管理</span>
      </template>
      <el-menu-item index="4-1" @click="nav_clicked('category_list')">分类列表</el-menu-item>
      <el-menu-item index="4-1" @click="nav_clicked('category_input')">添加分类</el-menu-item>
    </el-submenu>

    <el-submenu index="5">
      <template slot="title">
        <i class="el-icon-menu"></i>
        <span>品牌管理</span>
      </template>
      <el-menu-item index="5-1" @click="nav_clicked('brand_list')">品牌列表</el-menu-item>
      <el-menu-item index="5-1" @click="nav_clicked('brand_input')">添加品牌</el-menu-item>
    </el-submenu>

    <el-submenu index="6">
      <template slot="title">
        <i class="el-icon-s-check"></i>
        <span>模板管理</span>
      </template>
      <el-menu-item index="6-1" @click="nav_clicked('template_list')">模板列表</el-menu-item>
      <el-menu-item index="6-1" @click="nav_clicked('template_input')">添加模板</el-menu-item>
    </el-submenu>

    <el-submenu index="7">
      <template slot="title">
        <i class="el-icon-guide"></i>
        <span>相册管理</span>
      </template>
      <el-menu-item index="7-1" @click="nav_clicked('images')">图片列表</el-menu-item>
      <el-menu-item index="7-1" @click="nav_clicked('image_upload')">添加图片</el-menu-item>
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
