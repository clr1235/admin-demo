import Cookies from 'js-cookie'

const ssidKey = 'ssid';
const TokenKey = 'key';

export function getSSID() {
    return Cookies.get(ssidKey)
}

export function getToken() {
    return Cookies.get(TokenKey)
}