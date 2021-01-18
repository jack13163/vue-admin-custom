<template>
  <div>
    <!--flex弹性盒子模型，justify-content：主抽 -->
    <div style="display: flex; justify-content: center; margin-top: 250px;">
      <el-card style="width: 360px">
        <div slot="header" class="clearfix">
          <span>登录</span>
        </div>
        <table>
          <tr>
            <td>用户名</td>
            <td>
              <el-input
                v-model="username"
                placeholder="请输入用户名"
              ></el-input>
            </td>
          </tr>
          <tr>
            <td>密码</td>
            <td>
              <el-input
                type="password"
                v-model="password"
                placeholder="请输入密码"
                @keydown.enter.native="doLogin"
              ></el-input>
              <!-- @keydown.enter.native="doLogin"当按下enter键的时候也会执行doLogin方法-->
            </td>
          </tr>
          <tr>
            <td colspan="2">
              <el-checkbox v-model="rememberMe">7天内记住我</el-checkbox>
            </td>
          </tr>
          <tr>
            <!-- 占两行-->
            <td colspan="2">
              <!-- 点击事件的两种不同的写法v-on:click和 @click-->
              <!--<el-button style="width: 300px" type="primary" v-on:click="doLogin">登录</el-button>-->
              <el-button style="width: 300px" type="primary" @click="doLogin">登录</el-button>
            </td>
          </tr>
        </table>
      </el-card>
    </div>
  </div>
</template>

<style scoped>
     …*{
        margin:0;
        padding:0;
    }
</style>>
<script>
import Vue from 'vue'
export default {
  // 单页面中不支持前面的data:{}方式
  data() {
    // 相当于以前的function data(){},这是es5之前的写法，新版本可以省略掉function
    return {
      // 之前是在里面直接写username，password等等，但是这里要写return
      // 因为一个组件不管要不要被其他组件用，只要这样定义了，它就会认为可能这个组件会在其他的组件中使用
      // 比如说在这里定义了一个变量，然后把这个组件引入到A组件中，A组件中修改了这个变量
      // 同时这个组件也在B组件中引用了，这时候A里面一修改，B里面也变了，它们用的是一个值
      // 可是一般来说可能希望在不同的组件中引用的时候，使用不同的值，所以这里要用return
      // 这样在A组件和B组件分别引用这个变量的时候是不会互相影响的
      username: 'admin',
      password: '123',
      rememberMe: false
    };
  },
  methods: {
    doLogin() {
      // 加载中
      let options = {
          target: 'body',
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
      };
      let loadingInstance = this.$loading(options);

      // 一点击登录按钮，这个方法就会执行
      this.ajaxPost('login', {
          username: this.username,
          password: this.$md5(this.password), // md5加密
          rememberMe: this.rememberMe
        }, response => {
          // 关闭加载中
          loadingInstance.close();
          const h = this.$createElement;

          var data = response.data;
          if (data.code === '95100') {
            this.$notify({
              title: '登陆成功',
              position: 'bottum-right',
              message: h('i', {style: 'color: teal'}, '你好，' + this.username + '。' + data.data)
            });
            // 默认路径
            let path = '/goods'
            // 注意，这里是route，传参和接收不一样
            console.log(this.$route.query)
            if (this.$route.query.redirect) {
              // 重定向路径
              path = this.$route.query.redirect
            }
            // 跳转到指定的路径，注意需要等待cookie写入完成后执行
            this.$router.push({ path: path })
          } else if (data.code === '95101') {
            this.$notify({
              title: '登陆失败',
              position: 'bottum-right',
              message: h('i', {style: 'color: teal'}, data.data)
            });
            // 在localstorage 中删除标记
            Vue.prototype.removeStorage('logined')
          }
        }, response => {
          // 关闭加载中
          loadingInstance.close();
          const h = this.$createElement;
          this.$notify({
            title: '服务器异常',
            position: 'bottum-right',
            message: h('i', {style: 'color: teal'}, '你好，服务器异常，请稍后重试...')
          });
        });
    }
  }
};
</script>
