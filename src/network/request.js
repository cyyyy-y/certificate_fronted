import axios from "axios"

export function request(config) {

  //1、创建axios实例
  const instance = axios.create({
    // baseURL: '/api',
    baseURL: 'http://localhost:8081',
    // headers: {'access-control-allow-origin': '*'},
    // res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild'),
    // baseURL: 'http://152.136.185.210:8000/api/w6',
    timeout: 5000
  })

  //2、axios的拦截器
  // 添加请求拦截器，在请求头中加token
  instance.interceptors.request.use(config => {
    if (localStorage.getItem('Authorization')) {
      config.headers.Authorization = localStorage.getItem('Authorization');
    }
    console.log(config)

    return config;
  }, error => {
    return Promise.reject(error);
    console.log(error)
  })

  //响应拦截
  // instance.interceptors.request.use(res => {
  //   return res.data
  // }, error => {
  //   console.log(error);
  // })

  //3、发送真正的网络请求
  return instance(config)
}
