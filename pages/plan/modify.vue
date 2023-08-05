<template>
    <div>
        <div class="navbar bg-base-100 flex justify-around sticky top-0">
            <h1>{{ planInfo.planName }}</h1>
        </div>
        <div class="mx-auto card w-96 bg-neutral text-neutral-content">
            <div class="card-body items-center text-center">
                <div class="form=control">
                    <label class="label">
                        <span class="label-text">읽기표 이름</span>
                    </label>
                    <label class="">
                        <input class="input input-bordered" type="text" v-model="planInfo.planName" />
                    </label>
                </div>
                <div class="form-control">
                    <label class="label">
                        <span class="label-text">시작</span>
                    </label>
                    <label class="">
                        <VueDatePicker v-model="planInfo.startDate" auto-apply :format="format" />
                    </label>
                    <label class="label">
                        <span class="label-text">종료</span>
                    </label>
                    <label class="">
                        <VueDatePicker v-model="planInfo.endDate" auto-apply :format="format" />
                    </label>
                </div>
                <div class="form-control">
                    <div>
                        <label class="label">
                            <span class="label-text">구약</span>
                        </label>
                        <label class="">
                            <input id="oldGoalCount" type="range" min="1" max="5" :value=planInfo.oldGoalCount class="range" step="1"/>
                            <div class="w-full flex justify-between text-xs px-2">
                                <span>1</span>
                                <span>2</span>
                                <span>3</span>
                                <span>4</span>
                                <span>5</span>
                            </div>
                        </label>

                    </div>
                    <div>
                        <label class="label">
                            <span class="label-text">신약</span>
                        </label>
                        <label class="">
                            <input id="newGoalCount" type="range" min="1" max="5" :value=planInfo.newGoalCount class="range" step="1"/>
                            <div class="w-full flex justify-between text-xs px-2">
                                <span>1</span>
                                <span>2</span>
                                <span>3</span>
                                <span>4</span>
                                <span>5</span>
                            </div>
                        </label>
                    </div>
                </div>
                <div class="card-actions justify-end">
                    <button class="btn btn-primary" @click="updatePlan">저장</button>
                    <NuxtLink to="/plan" class="btn btn-ghost">취소</NuxtLink>
                </div>
            </div>
        </div>
        <div class="justify-center">
        </div>
    </div>
</template>
<script setup>
import { ref } from 'vue'
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import {api} from "~/composables/api";

const planId = ref('')
const route = useRoute()
planId.value = route.query.planId
const planInfo = ref({})

const getPlan = async () => {
    try {
        const {data} = await api.get(`/api/plan/${planId.value}`)
        planInfo.value = data
    } catch (error) {
        console.log(error)
    }
}

const format = (date) => {
    const day = date.getDate()
    const month = date.getMonth() + 1
    const year = date.getFullYear()

    return `${year}-${month}-${day}`
}
const updatePlan = async () => {
    if(!planInfo.value.planName || !planInfo.value.startDate || !planInfo.value.endDate || !planInfo.value.oldGoalCount || !planInfo.value.newGoalCount) {
        alert("비어있는 항목이 있습니다\n확인하고 다시 시도하세요.")
        return
    }
    planInfo.value.oldGoalCount = document.getElementById('oldGoalCount').value
    planInfo.value.newGoalCount = document.getElementById('newGoalCount').value
    try {
        await api.put(`/api/plan`, planInfo.value)
        router.replace({ path: '/plan'})
    } catch(error) {
        alert(error.response.data)
    }
}
getPlan()
// document.getElementById('oldGoalCount').value = planInfo.value.oldGoalCount
// document.getElementById('newGoalCount').value = planInfo.value.newGoalCount
</script>