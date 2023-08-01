import { defineStore } from 'pinia'

export const useUserStore = defineStore('userInfo', {
    state: () => {
        return {
            ssid: ''
        }
    },
    actions: {
        setSsid(str) {
            this.ssid = str;
        }
    }
})
