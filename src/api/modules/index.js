import service from '../request';

export const getList = (data, config) => service.httpPost('/crm/invoice/queryInvoicesInfoPage', data, config)