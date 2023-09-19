<template>
    <a-config-provider
        :locale="locale"
        :theme="{
            token: {
                colorPrimary: '#00b96b',
            },
        }"
    >
        <a-layout class="layout-wrapper">
            <layout-sider></layout-sider>
            <a-layout>
                <layout-header></layout-header>
                <layout-content></layout-content>
            </a-layout>
        </a-layout>
    </a-config-provider>
</template>

<script setup>
import { ref } from 'vue'

import LayoutHeader from './components/LayoutHearder.vue'
import LayoutSider from './components/LayoutSider.vue'
import LayoutContent from './components/LayoutContent.vue'

import zhCN from 'ant-design-vue/es/locale/zh_CN';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
dayjs.locale('zh-cn');
const locale = ref(zhCN)


</script>

<style lang="less" scoped>
.layout-wrapper {
    height: 100%;
    width: 100%;
}
</style>
