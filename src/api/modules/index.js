import service from '../request';

export const getList = (data, config) => service.httpPost('/crm/invoice/queryInvoicesInfoPage', data, config)

// 登录相关
export const getAjCaptcha = (data, config) => service.httpPost('/crm/sys/getAjCaptcha', data, config)
export const checkAjCaptcha = (data, config) => service.httpPost('/crm/sys/checkAjCaptcha', data, config)
export const getLoginSecretKey = (params, config) => service.httpGet('/crm/sys/getLoginSecretKey', params, config)
export const login = (data, config) => service.httpPost('/crm/sys/login', data, config)