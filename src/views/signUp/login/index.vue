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
import {useRouter} from 'vue-router'

import {useUserStore} from '@/stores/user'


const formRef = ref()
const formState = reactive({
    username: '',
    password: '',
    remenber: true
})

const userStore = useUserStore()
const router = useRouter()

const onSubmit = () => {
    formRef.value.validate().then(async () => {
        const { username, password } = toRaw(formState)
        const params = {
            userName: username,
            password,
            key: '',
            captchaId: 0,
            checked: false
        }
        await userStore.login(params)
        router.push({path: '/'})
    })
}
</script>

<style lang="less" src="./index.less" scoped></style>
