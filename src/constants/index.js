// 白名单
const whiteList = ['login', '400', '401', '403', '404', '408', '500', '501', '502', '503', '504', '505']

const isWhiteList = (to) => {
    return whiteList.indexOf(to.name) > -1 || whiteList.indexOf(to.path) > -1
}

export {
    whiteList,
    isWhiteList
}