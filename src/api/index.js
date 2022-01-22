import axios from 'axios'
import { getToken, removeToken } from '@/utils/auth.js'
import { baseApiUrl } from '@/config.js'
import router from '@/router'
// import { Message } from 'element-ui'

// 创建一个 axios 实例
const service = axios.create({
  baseURL: baseApiUrl,
  method: 'post',
  timeout: 10000 // 请求超时时间
})

service.interceptors.request.use(
  config => {
    if (getToken()) {
      config.headers.authorization = getToken()
    }
    return config
  },
  error => {
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  response => {
    const dataAxios = response
    // console.log(response)
    const { code } = dataAxios.data
    if (code === undefined) {
      // 如果没有 code 代表这不是项目后端开发的接口 比如可能是 D2Admin 请求最新版本
      return dataAxios
    } else {
      // 有 code 代表这是一个后端接口 可以进行进一步的判断
      switch (parseInt(code)) {
        case 2000:
          // [ 示例 ] code === 0 代表没有错误
          return dataAxios
        case 3003:
          // token失效
          dataAxios.data.msg = '身份凭证失效，请重新登录！'
          removeToken()
          router.push({
            path: '/login/login'
          }) // 为了重新实例化vue-router对象 避免bug
          return dataAxios
        default:
          // 不是正确的 code
          return dataAxios
      }
    }
  },
  error => {
    if (error && error.response) {
      switch (error.response.status) {
        case 400:
          error.message = '请求错误'
          break
        case 401:
          error.message = '身份凭证失效，请重新登录！'
          removeToken()
          router.push({
            path: '/login/login'
          }) // 为了重新实例化vue-router对象 避免bug
          break
        default:
          break
      }
    }
    return Promise.reject(error)
  }
)
export default service
