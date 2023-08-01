import Axios from 'axios'
import {getToken, getSSID} from "@/utils/index.js";
import {useUserStore} from '@/stores/index'
import {sign} from '@/utils/crypto'

const userStore = useUserStore();

const getHeaders = () => {
    const config_ = {
        'X-Kcrm-SSID': '',
        'X-Kcrm-Nonce': '',
        'X-Kcrm-Timestamp': '',
        'X-Kcrm-Sign': '',
    };
    // 随机数
    const nonce = Math.ceil(Math.random() * 1000000000000000); // 16位随机数
    config_["X-Kcrm-Nonce"] = nonce;
    // 时间戳
    const timestamp = new Date().getTime(); // 时间戳 整数 毫秒数
    config_["X-Kcrm-Timestamp"] = timestamp;
    // 获取SSID
    let ssid = userStore.ssid;
    if (!ssid) {
        ssid = getSSID();
    }
    config_["X-Kcrm-SSID"] = ssid;
    return config_
};

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
            'Content-Type': 'application/x-www-form-urlencoded'
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
            const config_ = getHeaders();
            config.headers['X-Kcrm-SSID'] = config_["X-Kcrm-SSID"];
            config.headers['X-Kcrm-Nonce'] = config_["X-Kcrm-Nonce"];
            config.headers['X-Kcrm-Timestamp'] = config_["X-Kcrm-Timestamp"];
            // 签名串
            // 获取key
            const keyString = getToken() || '';
            const key = keyString.substring(0, 16);
            const KP = {
                key: key, // 秘钥 16*n:
                iv: key // 偏移量
            };
            const url = config.url.split('?')[0]; // 截取接口，摒弃参数
            const signstr = sign(KP, config_["X-Kcrm-SSID"], config_["X-Kcrm-Nonce"], config_["X-Kcrm-Timestamp"],url);
            config.headers['X-Kcrm-Sign'] = signstr;
            console.log(config, 'http请求config===>>>')
            // get请求添加时间戳
            if (config.method === 'get') {
                // console.log(params, '========')
                config.params = Object.assign({}, config.param, {
                    timestamp: Date.parse(new Date()) / 1000
                })
            }
            
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