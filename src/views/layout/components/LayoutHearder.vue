<template>
    <a-layout-header style="background: #fff; padding: 0">
        <menu-unfold-outlined v-if="store.collapsed" class="trigger" @click="store.changeCollapsed" />
        <menu-fold-outlined v-else class="trigger" @click="store.changeCollapsed" />
    </a-layout-header>
</template>

<script setup>
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons-vue'

import {useMenuStore} from '@stores/index.js'
const store = useMenuStore()


</script>

<style lang="less" scoped>
.trigger {
    font-size: 18px;
    line-height: 64px;
    padding: 0 24px;
    cursor: pointer;
    transition: color 0.3s;
    &:hover {
        color: #1890ff;
    }
}
</style>
