export default {
  install(Vue, options) {
    // 封装GET请求方法
    Vue.prototype.queryGet = function (url, params, successCallback, errorCallback) {
        // 跨域携带cookie
        Vue.http.get(url, { withCredentials: true }).then((response) => {
          // 可以在这里判断ajax请求的code是否为95101、95102和95103，然后回到登录页
          let code = response.data.code;
          console.log(code)
          if (code !== '95101' && code !== '95102' && code !== '95103') {
             successCallback(response);
          } else {
            // 根据响应码，判断是否需要跳转到登录页
            console.log(params.redirect)
            this.$router.push({
              path: '/login',
              query: {redirect: params.redirect}
            })
          }
        }, (error) => {
          errorCallback(error);
        });
    }

    // 封装POST请求方法，直接访问相对路径即可
    Vue.prototype.ajaxPost = (url, params, successCallback, errorCallback) => {
      Vue.http.interceptors.push((request, next) => {
        // 跨域携带cookie
        request.withCredentials = true;
        next();
      });

      // 以Json格式提交数据
      Vue.http.post(url, params, {emulateJSON: true}).then((response) => {
        successCallback(response)
      }, (error) => {
        errorCallback(error)
      })
    }
  }
}
