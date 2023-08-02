<template>
    <div class="login-wrapper">
        <a-form
            ref="formRef"
            :model="formState"
            :label-col="{ span: 8 }"
            :wrapper-col="{ span: 16 }"
            autocomplete="off"
        >
            <a-form-item label="账号" name="username" :rules="[{ required: true, message: '请输入用户名' }]">
                <a-input v-model:value="formState.username" placeholder="请输入用户名" />
            </a-form-item>

            <a-form-item label="密码" name="password" :rules="[{ required: true, message: '请输入密码' }]">
                <a-input-password v-model:value="formState.password" placeholder="请输入密码" />
            </a-form-item>

            <a-form-item name="remember" :wrapper-col="{ offset: 8, span: 16 }">
                <a-checkbox v-model:checked="formState.remember">记住密码</a-checkbox>
            </a-form-item>

            <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
                <a-button type="primary" @click="onSubmit">登录</a-button>
            </a-form-item>
        </a-form>
    </div>
</template>

<script setup>
import { ref, toRaw, reactive } from 'vue'
import {useUserStore} from '@/stores/user'
import { uname, encryptPassword, aesEncrypt } from '@/utils/crypto'
import { login, getLoginSecretKey, getAjCaptcha, checkAjCaptcha } from '@/api/modules/index'

const formRef = ref()
const formState = reactive({
    username: '',
    password: '',
    remenber: true
})

const userStore = useUserStore()
userStore.setSsid('4293530c3beeb8595abbbedf99705f32')

const uuid = () => {
    var s = []
    var hexDigits = '0123456789abcdef'
    for (var i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1)
    }
    s[14] = '4' // bits 12-15 of the time_hi_and_version field to 0010
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1) // bits 6-7 of the clock_seq_hi_and_reserved to 01
    s[8] = s[13] = s[18] = s[23] = '-'

    var slider = 'slider' + '-' + s.join('')
    var point = 'point' + '-' + s.join('')
    // 判断下是否存在 slider
    console.log(localStorage.getItem('slider'))
    if (!localStorage.getItem('slider')) {
        localStorage.setItem('slider', slider)
    }
    if (!localStorage.getItem('point')) {
        localStorage.setItem('point', point)
    }
}

uuid()

let backImgBase = ref('')
let blockBackImgBase = ref('')
let backToken = ref('')
let secretKey = ref('')

const onSubmit = () => {
    formRef.value.validate().then(async () => {
        // 伪造图形验证码
        const result = await getAjCaptcha({
            captchaType: 'blockPuzzle',
            clientUid: localStorage.getItem('slider'),
            ts: Date.now() // 现在的时间戳
        })
        const {repCode, repData} = result.data;
        if (repCode === '0000') {
            backImgBase.value = repData.originalImageBase64
            blockBackImgBase.value = repData.jigsawImageBase64
            backToken.value = repData.captchaToken
            secretKey.value = repData.secretKey
        }
        const moveLeftDistance = 478.787878787878;
        const repCheckData = {
            captchaType: 'blockPuzzle',
            pointJson: secretKey.value ? aesEncrypt(JSON.stringify({ x: moveLeftDistance, y: 5.0 }), secretKey.value) : JSON.stringify({ x: moveLeftDistance, y: 5.0 }),
            captchaToken: backToken.value
        }
        await checkAjCaptcha(repCheckData)
        const captchaVerification = secretKey.value ? aesEncrypt(backToken.value + '---' + JSON.stringify({ x: moveLeftDistance, y: 5.0 }), secretKey.value) : backToken.value + '---' + JSON.stringify({ x: moveLeftDistance, y: 5.0 })

        console.log(result, 'result------')

        const { code, data } = await getLoginSecretKey()
        const transferKey = data.substring(0, 32) //传的key
        const key = data.substring(data.length - 32) //加密key
        const iv = key.substring(0, 16) //偏移量
        const KP = {
            key: key,
            iv: iv
        }
        const { username, password } = toRaw(formState)
        const params = {
            userName: uname(KP, username.toLowerCase()),
            password: encryptPassword(KP, password),
            key: transferKey,
            captcha: '',
            captchaId: 0,
            captchaVerification,
            checked: false
        }
        if (code === 0) {
            login(params)
        }
    })
}
</script>

<style lang="less" src="./index.less" scoped></style>
