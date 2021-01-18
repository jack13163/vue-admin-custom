import Mock from 'mockjs'

const Random = Mock.Random

// mock需要给三个参数,url(与axios请求是传的url一致,我这个是本地启动的项目就直接用本地域名了)
// 请求类型: get post...其他看文档
// 数据处理函数,函数需要return数据
Mock.mock('http://127.0.0.1:9960/test/user', 'get', () => {
  let users = []
  for (let i = 0; i < 8; i++) {
    let obj = {
      datetime: Random.datetime(),
      name: Random.cfirst() + Random.clast(),
      address: Random.county(true)
    }
    users.push(obj)
  }
  return {users: users}
})

// post请求,带参数,参数会在data中返回,会返回url,type,body三个参数,可以把data打印出来看看
Mock.mock('http://127.0.0.1:9960/test/user', 'post', (data) => {
    var id = JSON.parse(data.body)['id'];
    // 利用Mockjs自定义返回的内容
    return [{
        id: id,
        name: Random.cfirst() + Random.clast(),
        address: Random.county(true)
    }]
})
