import service from '../request';
import {mockApiId} from '@/constants'

// const getList = (data, config) => service.httpPost('/crm/invoice/queryInvoicesInfoPage', data, config)

const getCaptcha = (params) => {
    return service({
        url: '/v1/user/captcha',
        method: 'get',
        params,
    })
}
// const checkAjCaptcha = (data, config) => service.httpPost('/crm/sys/checkAjCaptcha', data, config)
// const getLoginSecretKey = (params, config) => service.httpGet('/crm/sys/getLoginSecretKey', params, config)

const login = (data) => {
    return service({
        url: '/v1/user/login',
        method: 'post',
        data,
    })
}
// const logout = (data, config) => service.httpPost(`/${mockApiId}/api/user/logout`, data, config)

const getUserInfo = (params) => {
    return service({
        url: `/${mockApiId}/api/user/userInfo`,
        method: 'get',
        params
    })
}

export default {
    // getList,
    getCaptcha,
    // checkAjCaptcha,
    // getLoginSecretKey,
    login,
    // logout,
    getUserInfo
}