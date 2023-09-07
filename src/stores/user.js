import { defineStore } from 'pinia'

import {userApi} from '@/api'
import {setToken, removeToken} from '@/utils/cache/cookies'

export const useUserStore = defineStore('userInfo', {
    state: () => {
        return {
            ssid: '',
            userInfo: {}
        }
    },
    actions: {
        setSsid(str) {
            this.ssid = str;
        },
        async getUserInfo() {
           const res = await userApi.getUserInfo()
           this.userInfo = res;
        },
        async login(params) {
            const {code, data} = await userApi.login(params)
            if (code === 0) {
                setToken(data.key)
            }
        },
        async logout() {
            const res = await userApi.logout()
            console.log(res, 'res===>>>>>>')
            removeToken()
        }
    }
})

export function useUserStoreHook() {
    return useUserStore()
}
