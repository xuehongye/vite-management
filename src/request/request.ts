import { rejects } from 'assert'
import axios from 'axios'
import Cookies from 'js-cookie'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'

const instance = axios.create({
    baseURL: 'http://120.24.64.5:8088/mall-admin',
    timeout: 15000
})

// 请求拦截器
instance.interceptors.request.use(config => {
    let token = Cookies.get('token')
    if(token) {
        config.headers && (config.headers['Authorization'] = token)
    }
    return config
}, err => {
    return Promise.reject(err)
})

// 响应拦截器
instance.interceptors.response.use(result => {
    const router = useRouter()
    if(result.data.code === 403) {
        ElMessage.error('result.data.data,'+ '请先换个账号进行登录')
        Cookies.remove('token')
        // console.log(router)
        return router.push('/login')
    }
    return result.data
}, err => {
    return Promise.reject(err)
})

export default instance
