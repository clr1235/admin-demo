<template>
    <a-layout-header style="background: #fff; padding: 0">
        <div class="header-wrapper">
            <div class="left">
                <menu-unfold-outlined v-if="menuStore.collapsed" class="icon" @click="menuStore.changeCollapsed" />
                <menu-fold-outlined v-else class="icon" @click="menuStore.changeCollapsed" />
            </div>
            <div class="right">
                <a-dropdown placement="bottom">
                    <user-outlined class="icon" @click.prevent/>
                    <template #overlay>
                        <a-menu>
                            <a-menu-item>
                                个人中心
                            </a-menu-item>
                            <a-menu-item>
                                设置
                            </a-menu-item>
                            <a-menu-item @click="onClick">
                                退出登录
                            </a-menu-item>
                        </a-menu>
                    </template>
                </a-dropdown>
            </div>
        </div>
    </a-layout-header>
</template>

<script setup>
import { MenuUnfoldOutlined, MenuFoldOutlined, UserOutlined } from '@ant-design/icons-vue'
import {useRouter} from 'vue-router'

import {useUserStore, useMenuStore} from '@stores/index'

const userStore = useUserStore()
const menuStore = useMenuStore()
const router = useRouter()

const onClick = async () => {
    await userStore.logout();
    router.push({path: '/login'})
}
</script>

<style lang="less" scoped>
.header-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .left {
        padding-left: 24px;
    }
    .right {
        padding-right: 24px;
    }
}
.icon {
    font-size: 18px;
    line-height: 64px;
    cursor: pointer;
    transition: color 0.3s;
    &:hover {
        color: #1890ff;
    }
}
</style>
