<template>
   <div>首页</div>
</template>

<script setup>
import {getList} from '@/api/modules/index.js'
import { onMounted } from 'vue';


onMounted(() => {
    getList({})
})

</script>

<style lang="less" scoped>

</style>