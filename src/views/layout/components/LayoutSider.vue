<template>
    <a-layout-sider v-model:collapsed="store.collapsed" :trigger="null" collapsible>
        <div class="logo" />
        <a-menu 
            v-model:selectedKeys="selectedKeys" 
            theme="dark" 
            mode="inline"
            :items="menu"
            @select="onSelect"
        />
    </a-layout-sider>
</template>

<script setup>
import {ref, reactive} from 'vue'
import {useRouter} from 'vue-router'
import {useMenuStore, usePermissionStore} from '@/stores/index.js'


const store = useMenuStore()
const permissionStore = usePermissionStore()
const router = useRouter()
const selectedKeys = ref([])
const menu = reactive(permissionStore.asyncRoutes);


const onSelect = ({key}) => {
    router.push({
        name: key,
    })
}

</script>

<style lang="less" scoped>
.logo {
    height: 32px;
    background: rgba(255, 255, 255, 0.3);
    margin: 16px;
}
.site-layout .site-layout-background {
    background: #fff;
}
</style>