import service from '../request';
import {mockApiId} from '@/constants'

const getList = (data, config) => service.httpPost('/crm/invoice/queryInvoicesInfoPage', data, config)

const getAjCaptcha = (data, config) => service.httpPost('/crm/sys/getAjCaptcha', data, config)
const checkAjCaptcha = (data, config) => service.httpPost('/crm/sys/checkAjCaptcha', data, config)
const getLoginSecretKey = (params, config) => service.httpGet('/crm/sys/getLoginSecretKey', params, config)

const login = (data, config) => service.httpPost(`/${mockApiId}/api/user/login`, data, config)
const logout = (data, config) => service.httpPost(`/${mockApiId}/api/user/logout`, data, config)

const getUserInfo = (params, config) => service.httpGet(`/${mockApiId}/api/user/userInfo`, params, config)

export default {
    getList,
    getAjCaptcha,
    checkAjCaptcha,
    getLoginSecretKey,
    login,
    logout,
    getUserInfo
}