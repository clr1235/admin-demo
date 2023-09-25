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
            <a-form-item label="验证码" name="verifyCode" :rules="[{ required: true, message: '请输入验证码' }]">
                <div class="captcha-box">
                    <a-input placeholder="请输入验证码" v-model="formState.verifyCode"></a-input>
                    <img class="captcha" :src="captchaBase64" alt="" @click="getCaptcha">
                </div>
            </a-form-item>
            <a-form-item name="remember" :wrapper-col="{ offset: 8, span: 16 }">
                <a-checkbox v-model:checked="formState.remember">记住密码</a-checkbox>
            </a-form-item>

            <div class="btn-box">
                <a-button type="primary" @click="onSubmit">登录</a-button>
            </div>
        </a-form>
    </div>
</template>

<script setup>
import { ref, toRaw, reactive, onMounted } from 'vue'

import router from '@/router'
import {useUserStore} from '@/stores/user'
import {userApi} from '@/api'

onMounted(() => {
    getCaptcha()
})

const formRef = ref()
const formState = reactive({
    username: '',
    password: '',
    verifyCodeKey: '',
    verifyCode: '',
})
// 验证码
const captchaBase64 = ref();

const userStore = useUserStore()



function getCaptcha() {
    userApi.getCaptcha().then(({ data }) => {
    const { verifyCodeBase64, verifyCodeKey } = data
    formState.verifyCodeKey = verifyCodeKey
    captchaBase64.value = verifyCodeBase64
  });
}

const onSubmit = () => {
    formRef.value.validate().then(async () => {
        console.log(123344)
        const { username, password } = toRaw(formState)
        const params = {
            username: username,
            password,
        }
        await userStore.login(params)
        router.push({path: '/'})
    })
}
</script>

<style lang="less" src="./index.less" scoped></style>
