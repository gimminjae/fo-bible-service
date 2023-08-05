<template>
    <div>
        <div class="navbar bg-base-100 flex justify-around sticky top-0 z-10">
            <h1>{{ planInfo.planName }}</h1>
        </div>
        <div class="flex justify-center">
            <div v-if="modifiedBibleDetail.bookName" class="fixed modal-box z-10">
                <div method="dialog">
                    <div class="flex justify-between">
                        <h3 class="font-bold text-lg">{{ modifiedBibleDetail.bookName }}</h3>
                        <div class="flex gap-3">
                            <div class="form-control">
                                <label class="label cursor-pointer">
                                    <span class="mr-2">{{ mode ? '+ 모드' : '- 모드' }}</span>
                                    <!-- :class="`badge badge-${mode ? 'primary' : 'ghost'} label-text mr-2`" -->
                                    <input type="checkbox" class="toggle" checked @change="changeMode"/>
                                </label>
                            </div>
                            <button class="btn btn-square" @click="emptyBible">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                                     stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                          d="M6 18L18 6M6 6l12 12"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                    <div class="py-4">
                        <div class="grid grid-cols-5 gap-3">
                            <div class="indicator" v-for="(verse, index) in modifiedBibleDetail.verseStatus">
                                <span class="indicator-item badge badge-xs badge-secondary">{{ verse }}</span>
                                <button :class="`btn ${verse > 0 ? modifiedBibleDetail.testament ? verse >= planInfo.oldGoalCount ? 'btn-success' : 'btn-info' : verse >= planInfo.newGoalCount ? 'btn-success' : 'btn-info' : ''} : ''}`"
                                        @click="plusOrMinus(index)">
                                    {{ index + 1 }}
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="flex justify-center gap-3">
                        <button class="btn btn-primary" @click="savePlanStatus(modifiedBibleDetail.verseStatus)">
                            저장
                        </button>
                        <button class="btn btn-info" @click="allClick">
                            모두체크
                        </button>
                        <!--                        <button class="btn btn-wide">닫기</button>-->
                    </div>
                </div>
            </div>
        </div>
        <div class="tabs">
            <a :class="`tab tab-bordered ${ tab === 'Main' ? 'tab-active' : ''}`" @click="changeTab('Main')">Main</a>
            <a :class="`tab tab-bordered ${ tab === 'old' ? 'tab-active' : ''}`" @click="changeTab('old')">구약</a>
            <a :class="`tab tab-bordered ${ tab === 'new' ? 'tab-active' : ''}`" @click="changeTab('new')">신약</a>
        </div>
        <div v-if="tab === 'Main'">
            <div class="flex justify-end mr-3">
                <div class="flex gap-2">
                    <NuxtLink :to="{ path: `/plan/modify`, query: { planId: planInfo.planId } }" class="btn btn-secondary btn-sm">수정</NuxtLink>
                    <button class="btn btn-error btn-sm" @click="deletePlan">삭제</button>
                </div>
            </div>
            <div class="flex gap-3 mt-3 justify-center">
                <div class="stats shadow">
                    <div class="stat">
                        <!--                    <div class="stat-figure text-primary">-->
                        <!--                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-8 h-8 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>-->
                        <!--                    </div>-->
                        <div class="stat-title">기간</div>
                        <div class="stat-value text-primary text-lg">{{ planInfo.startDate }}</div>
                        <div class="stat-value text-primary text-lg">~ {{ planInfo.endDate }}</div>
                        <div class="stat-desc">{{ planInfo.restDay }}일 남았습니다.</div>
                    </div>
                </div>
                <div class="stats shadow">
                    <div class="stat">
                        <!--                    <div class="stat-figure text-secondary">-->
                        <!--                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-8 h-8 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>-->
                        <!--                    </div>-->
                        <div class="stat-title">목표</div>
                        <div class="stat-value text-secondary text-lg">구약 {{ planInfo.oldGoalCount }}독 신약
                            {{ planInfo.newGoalCount }}독
                        </div>
                    </div>
                </div>
            </div>
            <div class="flex justify-center mt-3">
                <div class="stats bg-primary text-primary-content">

                    <div class="stat">
                        <div class="stat-title">진행도</div>
                        <div class="stat-value text-lg">하루에 <b class="text-yellow-50">{{ planInfo.readCountPerDay}}</b>장씩 읽으세요!</div>
<!--                        <div class="stat-actions">-->
<!--                            <button class="btn btn-sm btn-success">체크하러 가기</button>-->
<!--                        </div>-->
                    </div>

                    <div class="stat">
                        <div class="stat-title"></div>
<!--                        <div class="stat-value">{{ planInfo.goalPercent }} %</div>-->
                        <div class="radial-progress bg-primary text-primary-content border-4 border-primary" :style="`--value: ${planInfo.goalPercent};`">{{ planInfo.goalPercent }}%</div>
                    </div>

                </div>
            </div>
        </div>
        <div @click="pickBible(status)" class="stats stats-vertical lg:stats-horizontal shadow overflow-auto"
             v-for="status in planInfo.goalStatus">
            <div v-if="tab === 'old' && status.testament" class="stat">{{ status.bookName }}</div>
            <div v-if="tab === 'old' && status.testament" class="stat">
                <div class="grid grid-cols-10 gap-x-3 gap-y-1">
                    <div class="indicator" v-for="(verse, index) in status.verseStatus">
                        <button :class="`btn btn-xs ${verse > 0 ? verse >= planInfo.oldGoalCount ? 'btn-success' : 'btn-info' : ''}`">{{ index + 1 }}</button>
                    </div>
                </div>
            </div>
            <div v-if="tab === 'new' && !status.testament" class="stat">{{ status.bookName }}</div>
            <div v-if="tab === 'new' && !status.testament" class="stat">
                <div class="grid grid-cols-10 gap-3">
                    <div class="indicator" v-for="(verse, index) in status.verseStatus">
                        <button :class="`btn btn-xs ${verse > 0 ? verse >= planInfo.newGoalCount ? 'btn-success' : 'btn-info' : ''}`">{{ index + 1 }}</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import {api} from "~/composables/api";
import {ref} from "vue";

const tab = ref('Main')
const planId = ref('')
const route = useRoute()
planId.value = route.query.planId
const planInfo = ref({})
const bibleDetail = ref({})
const modifiedBibleDetail = ref({})
const mode = ref(true)
const getPlan = async () => {
    try {
        const {data} = await api.get(`/api/plan/${planId.value}`)
        planInfo.value = data
    } catch (error) {
        console.log(error)
    }
}
const changeTab = (value) => {
    tab.value = value
}
const pickBible = (bible) => {
    bibleDetail.value = bible
    modifiedBibleDetail.value = JSON.parse(JSON.stringify(bible))
    mode.value = true
}
const emptyBible = () => {
    bibleDetail.value = {}
    modifiedBibleDetail.value = {}
}
const changeMode = () => {
    mode.value = !mode.value
}
const deletePlan = async () => {
    if(!confirm('삭제되면 복구할 수 없습니다.\n삭제하시겠습니까?')) {
        return
    }
    try {
        await api.remove(`/api/plan/${planInfo.value.planId}`)
        alert('삭제되었습니다.')
        router.replace({ path: '/plan'})
    } catch(error) {
        console.log(error)
    }
}
const savePlanStatus = async (verseStatus) => {
    try {
        bibleDetail.value.verseStatus = verseStatus
        await api.patch(`/api/plan/${planInfo.value.planId}`, planInfo.value)
        const { data } = await api.get(`/api/plan/${planInfo.value.planId}`)
        planInfo.value = data
        modifiedBibleDetail.value = {}
    } catch(error) {
        console.log(error)
        alert('저장 실패: 다시 시도하세요')
    }
}
const allClick = () => {
    for (let i = 0; i < modifiedBibleDetail.value.verseStatus.length; i++) {
        plusOrMinus(i)
    }
}
const plusOrMinus = (index) => {
    if(!mode.value && modifiedBibleDetail.value.verseStatus[index] <= 0) {
        return
    }
    mode.value ? modifiedBibleDetail.value.verseStatus[index]++ : modifiedBibleDetail.value.verseStatus[index]--
}
getPlan()
</script>