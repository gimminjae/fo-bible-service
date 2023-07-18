<template>
    <div>
        <div class="navbar bg-base-100 flex justify-around sticky top-0">
            <h1>성경읽기표</h1>
        </div>
        <div class="flex justify-end mr-3">
            <NuxtLink class="btn btn-primary btn-sm" to="/plan/new">읽기표 만들기</NuxtLink>
            <!-- Open the modal using ID.showModal() method -->
        </div>
        <div>
            {{ planList }}
        </div>
    </div>
</template>
<script setup>
import {ref} from 'vue'

const planList = ref([])
const callDatas = async () => {
    const result = await api.get(`/api/plan`)
    planList.value = result.data
}
callDatas()
</script>