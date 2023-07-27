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
                                    <span class="mr-2">{{ mode ? '+ 모드' : '- 모드' }}</span> <!-- :class="`badge badge-${mode ? 'primary' : 'ghost'} label-text mr-2`" -->
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
                                <button :class="`btn ${verse > 0 ? 'btn-info' : ''}`" @click="mode ? modifiedBibleDetail.verseStatus[index]++ : modifiedBibleDetail.verseStatus[index]--">{{ index + 1 }}</button>
                            </div>
                        </div>
                    </div>
                    <div class="flex justify-center gap-3">
                        <button class="btn btn-primary btn-wide" @click="console.log(modifiedBibleDetail.verseStatus)">저장</button>
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
        <div @click="pickBible(status)" class="stats stats-vertical lg:stats-horizontal shadow overflow-auto"
             v-for="status in planInfo.goalStatus">
            <div v-if="tab === 'old' && status.testament" class="stat">{{ status.bookName }}</div>
            <div v-if="tab === 'old' && status.testament" class="stat">
                <div class="grid grid-cols-10 gap-x-3 gap-y-1">
                    <div class="indicator" v-for="(verse, index) in status.verseStatus">
                        <button :class="`btn btn-xs ${verse > 0 ? 'btn-info' : ''}`">{{ index + 1 }}</button>
                    </div>
                </div>
            </div>
            <div v-if="tab === 'new' && !status.testament" class="stat">{{ status.bookName }}</div>
            <div v-if="tab === 'new' && !status.testament" class="stat">
                <div class="grid grid-cols-10 gap-3">
                    <div class="indicator" v-for="(verse, index) in status.verseStatus">
                        <button :class="`btn btn-xs ${verse > 0 ? 'btn-info' : ''}`">{{ index + 1 }}</button>
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
const getPlan = async () => {
    try {
        const {data} = await api.get(`/api/plan/${planId.value}`)
        console.log(data)
        planInfo.value = data
    } catch (error) {
        console.log(error)
    }
}
const changeTab = (value) => {
    tab.value = value
}
const pickBible = (bible) => {
    console.log(bible)
    bibleDetail.value = bible
    modifiedBibleDetail.value = JSON.parse(JSON.stringify(bible))

}
const emptyBible = () => {
    bibleDetail.value = {}
    modifiedBibleDetail.value = {}
}
const changeMode = () => {
    mode.value = !mode.value
}
const mode = ref(true)
getPlan()
</script>