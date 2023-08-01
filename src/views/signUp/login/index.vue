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
import { uname, encryptPassword } from '@/utils/crypto'
import { login, getLoginSecretKey } from '@/api/modules/index'

const formRef = ref()
const formState = reactive({
    username: '',
    password: '',
    remenber: true
})

const onSubmit = () => {
    formRef.value.validate().then(async () => {
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
            captchaVerification:
                'zJtpAmsttaTwIdvVVV4NIttyOL3w+MTrxJCzFT5Nqfmv9t9kzzbwLZhKvSTp5q6ELqKNw8oUtdkDvIW/P3sySpYgUuY4FOnvVF2gUcwRIg0=',
            checked: false
        }
        if (code === 0) {
            login(params)
        }
    })
}
</script>

<style lang="less" src="./index.less" scoped></style>
