const mockApiId = '7l45JaF2b370ab73e042befc2c56a925ab511b5116aec98'
// 白名单
const whiteList = ['login', '400', '401', '403', '404', '408', '500', '501', '502', '503', '504', '505']

const isWhiteList = (to) => {
    return whiteList.indexOf(to.name) > -1 || whiteList.indexOf(to.path) > -1
}

export {
    whiteList,
    isWhiteList,
    mockApiId
}