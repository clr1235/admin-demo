import service from '../request';

export const getList = (data, config) => service.httpPost('/crm/invoice/queryInvoicesInfoPage', data, config)

export const getLoginSecretKey = (params, config) => service.httpGet('/crm/sys/getLoginSecretKey', params, config)
export const login = (data, config) => service.httpPost('/crm/sys/login', data, config)