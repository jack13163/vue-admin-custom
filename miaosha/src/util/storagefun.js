export default {
  install(Vue, options) {
    // 封装操作localstorage 本地存储的方法，这是模块化的文件，
    Vue.prototype.setStorage = function (key, value) {
      //  将传入的 value 转换成 JSON 字符串后保存
      localStorage.setItem(key, JSON.stringify(value))
    }

    Vue.prototype.getStorage = function (key) {
      // 反序列化，将 JSON 字符串转换成 JSON 对象
      return JSON.parse(localStorage.getItem(key))
    }

    Vue.prototype.removeStorage = function (key) {
      //  删除
      localStorage.removeItem(key)
    }
  }
}
