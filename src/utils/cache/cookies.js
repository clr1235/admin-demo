import Cookies from 'js-cookie'

import cacheKey from '@/constants/cache-key'

export function getToken() {
    return Cookies.get(cacheKey.token)
}

export function setToken(token) {
    Cookies.set(cacheKey.token, token)
}

export function removeToken() {
    Cookies.remove(cacheKey.token)
}