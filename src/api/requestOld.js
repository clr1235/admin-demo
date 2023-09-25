import Axios from 'axios'
import {useUserStore} from '@/stores'


// 自定义Axios类
class Service {

    constructor() {
        this.timeout = 5000;
        // 请求地址的前缀
        this.baseURL = '';

    }

    // request
    request = (options, config) => {
        const opts = this.mergeOptions(options ?? {})
        const instance = Axios.create();
        // 设置拦截
        this.httpRequestInterceptors(instance, config);
        this.httpResponseInterceptors(instance, config)
        // 返回实例
        return instance(opts)
    }

    // 合并传入的配置和默认的配置
    mergeOptions = (options) => {
        const contentHeader = {
            'Content-Type': 'application/json;charset=UTF-8'
        }
        const {headers: optionsHeader={}, ...baseOptions} = options;
        const headersObj = {...contentHeader, ...optionsHeader}
        return {
            timeout: this.timeout,
            baseUrl: this.baseURL,
            ...baseOptions,
            ...{headers: headersObj}
        }
    }

    // 封装get请求
    httpGet = async(
        url,
        params,
        config,
        options,
    ) => {
        return this.request({
            url,
            method: 'get',
            params,
            ...options,
        }, config)
    }
    // 封装post请求
    httpPost = async(
        url,
        data,
        config,
        options,
    ) => {
        return this.request({
            url,
            method: 'post',
            data,
            ...options,
        }, config)
    }

    // 发送请求拦截  一般此处处理一些请求头的设置
    httpRequestInterceptors(axiosInstance, messageConfig) {
        axiosInstance.interceptors.request.use((config) => {
            // 发送请求之前做的事情：设置请求头、cookie、tonken等
            const userStore = useUserStore()
            console.log(userStore.token, 'userStore-=s=s=s==s==s')
            if (userStore.token) {
                config.headers.Authorization = userStore.token;
            }
            // get请求添加时间戳
            // if (config.method === 'get') {
            //     config.params = Object.assign({}, config.param, {
            //         timestamp: Date.parse(new Date()) / 1000
            //     })
            // }
            
            return config;
        }, (error) => {
            // 对请求错误所做的处理

            return Promise.reject(error)
        })
    }

    // 接收响应拦截
    httpResponseInterceptors(axiosInstance, messageConfig) {
        axiosInstance.interceptors.response.use((response) => {
            // 处理响应数据,完事之后返回处理之后的结果
            console.log(response, 'http响应===>>>')
            const {status} = response
            if (status === 200) {
                return Promise.resolve(response.data)
            } else {
                return Promise.resolve(response.data);
            }
        }, (error) => {
            // 响应的错误处理
            
            return Promise.reject(error)
        })
    }

    

}

export default new Service()