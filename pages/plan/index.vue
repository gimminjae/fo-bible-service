<template>
    <div>
        <div class="navbar bg-base-100 flex justify-around sticky top-0 z-10">
            <h1><b>{{ store().$state.member.nickname }}</b>님의 성경읽기표</h1>
        </div>
        <div class="flex justify-end mr-3 mb-3">
            <NuxtLink class="btn btn-primary btn-sm" to="/plan/new"><i class="fa-solid fa-square-poll-vertical mr-1"></i>읽기표 만들기</NuxtLink>
            <!-- Open the modal using ID.showModal() method -->
        </div>
        <div class="flex justify-center flex-wrap gap-3 overflow-auto">
            <div class="card w-96 bg-neutral text-neutral-content" v-for="plan in planList">
                <NuxtLink class="card-body" :to="{ path: `/plan/detail`, query: { planId: plan.planId } }">
                    <h2 class="card-title">
                        <i class="fa-solid fa-square-poll-vertical mr-1"></i>
                        {{ plan.planName }}
                        <div class="badge badge-secondary">{{ plan.goalPercent }} %</div>
                    </h2>
                    <p>구약 {{ plan.oldGoalCount }}독! 신약 {{ plan.newGoalCount }}독!</p>
                    <progress class="progress progress-primary w-56" :value="plan.goalPercent" max="100"></progress>
                    <div class="card-actions justify-end">
                        <div class="badge badge-outline"><i class="fa-regular fa-calendar mr-1"></i> 시작일 {{ plan.startDate }}</div>
                        <div class="badge badge-outline"><i class="fa-regular fa-calendar mr-1"></i> 종료일 {{ plan.endDate }}</div>
                    </div>
                </NuxtLink>
            </div>
        </div>
    </div>
</template>
<script setup>
import {ref} from 'vue'
import {store} from "~/composables/store";
import {api} from "~/composables/api";
import routes from "~/composables/route";

const planList = ref([])
const callDatas = async () => {
    const result = await api.get(`/api/plan`)
    planList.value = result.data
}
callDatas()
onMounted(() => {
    routes.alertRouteQuery()
})
</script>