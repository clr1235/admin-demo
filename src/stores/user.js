import { defineStore } from 'pinia'
import {ref} from 'vue'
import {userApi} from '@/api'
import {setToken, removeToken} from '@/utils/cache/cookies'


export const useUserStore = defineStore('userInfo', () => {
    const user = {
        roles: [],
        perms: [],
    }
    const userInfo = ref(user)

    async function getCaptcha() {
        const res = await userApi.getCaptcha();
        console.log(res, 'res-s-s-s-s-s-')
    }
    async function login(params) {
        const {code, data} = await userApi.login(params)
        if (code === '00000') {
            console.log(data, 'data=======')
        }
    }

    return {
        userInfo,
        login,
        getCaptcha
    }
})

export function useUserStoreHook() {
    return useUserStore()
}
