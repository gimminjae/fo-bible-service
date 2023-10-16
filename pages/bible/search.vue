<template>
    <div class="mx-3">
        <div class="navbar bg-base-100 fixed top-0 z-10">
            <div>
                <div class="flex-none">
                    <button class="btn btn-square btn-ghost" @click="useRouter().back()">
                        <i class="fa-solid fa-chevron-left"></i>
                    </button>
                </div>
                <div class="flex-1">
                    <a class="btn btn-ghost normal-case text-xl">성경찾기</a>
                </div>
            </div>
        </div>
        <div class="flex justify-center">
            <div class="tabs mt-20 mb-5">
                <a :class="`text-2xl tab tab-bordered ${ tab === 'old' ? 'tab-active' : ''}`" @click="changeTab('old')">구약</a>
                <a :class="`text-2xl tab tab-bordered ${ tab === 'new' ? 'tab-active' : ''}`" @click="changeTab('new')">신약</a>
            </div>
        </div>
        <div>
            <div  v-for="bible in bibleList">
                <div v-if="tab === 'old' ? bible.bookIndex <= 39 : bible.bookIndex > 39" :id="bible.bookIndex" class="collapse collapse-arrow border border-base-300 bg-base-200">
                    <input type="checkbox" />
                    <div class="collapse-title text-xl font-light">
                        {{ bible.bookName }}
                    </div>
                    <div class="collapse-content grid grid-cols-5 gap-4">
                        <button v-for="chapter in bible.totalChapter" class="btn" @click="goBible(bible, chapter)">{{ chapter
                            }}</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import bibles from '~/bible/objects/bibles'
import cookieUtil from '~/composables/cookie';
import { ref } from "vue"

const router = useRouter()
const bibleList = bibles.getKoBible()
const tab = ref('old')

const changeTab = (selectedTab) => {
    tab.value = selectedTab
}

const goBible = (bible, chapter) => {
    cookieUtil.set('recentBible', bible.bookIndex + ' ' + chapter)
    router.replace({ path: '/bible/bible' })
}
</script>