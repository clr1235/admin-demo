<template>
    <a-config-provider
        :locale="locale"
        :theme="{
            token: {
                colorPrimary: '#00b96b',
            },
        }"
    >
        <Layout/>
    </a-config-provider>
</template>

<script setup>
import {ref} from 'vue';
import zhCN from 'ant-design-vue/es/locale/zh_CN';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
dayjs.locale('zh-cn');
import Layout from '@/views/layout/index.vue';

const locale = ref(zhCN)

</script>

<style lang="less" scoped>

</style>