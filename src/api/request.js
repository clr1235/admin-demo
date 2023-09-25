import Axios from 'axios'
import {useUserStore} from '@/stores'

console.log(import.meta.env.VITE_APP_BASE_API, 'import.meta.env.VITE_APP_BASE_API======')

// 创建axios实例
const service = Axios.create({
    timeout: 5000,
    baseURL: '/api',
    headers: { "Content-Type": "application/json;charset=utf-8" },
})

// 请求拦截器
service.interceptors.request.use((config) => {
    const userStore = useUserStore();
    if (userStore.token) {
        config.headers.Authorization = userStore.token;
    }
    config.headers.apifoxToken = 'hsqt6OJLjvawpAsIvlkwnbMqbeoh3OOf'
    console.log(import.meta.env, 'config==s=s=s=s')
    return config
}, (error) => {
    return Promise.reject(error)
})

// 响应拦截器
service.interceptors.response.use((response) => {
    const { code } = response.data;
    if (code === "00000") {
      return response.data;
    }
    // 响应数据为二进制流处理(Excel导出)
    if (response.data instanceof ArrayBuffer) {
      return response;
    }

    // ElMessage.error(msg || "系统出错");
    // return Promise.reject(new Error(msg || "Error"));
    return Promise.reject('error');
}, (error) => {
    if (error.response.data) {
        const { code } = error.response.data;
        // token 过期,重新登录
        if (code === "A0230") {
        //   ElMessageBox.confirm("当前页面已失效，请重新登录", "提示", {
        //     confirmButtonText: "确定",
        //     type: "warning",
        //   }).then(() => {
        //     localStorage.clear();
        //     window.location.href = "/";
        //   });
        } else {
        //   ElMessage.error(msg || "系统出错");
        }
      }
      return Promise.reject(error.message);
})

export default service