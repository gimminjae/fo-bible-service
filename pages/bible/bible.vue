<template>
    <div class="">
        <BibleFormTotal @verse-change="findVerse" class="" @click-move-chapter="moveChapter"/>
        <!--        <div id="verse_0"></div>-->
        <!--        <button @click="copyVerse">복사</button>-->
        <div class="" v-if="bibleInfos.length > 0"> <!--style="padding-bottom: 20%; padding-top: 5%;"-->
            <!--            <p class="text-gray-400">{{ bibleInfos[0].bookName }} {{ bibleInfos[0].chapter }}장</p>-->
            <ul>
                <li v-for="bible in bibleInfos"
                    :class="{'text-sky-400': verseCorrect(bible.verse), 'm-2': true, 'underline decoration-dashed': verseClass(bible.verse)}"
                    @click="clickVerse(bible.verse)">
                    <div class="flex" :id="`verse_${bible.verse}`">
                        <p class="mr-2">{{ bible.verse }}</p>
                        <p>{{ bible.content }}</p>
                    </div>
                </li>
            </ul>
        </div>
        <div class="">
            <button class="fixed bottom-20 left-5 btn btn-circle btn-outline ml-3" @click="moveChapter('left')">
                <!--                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>-->
                ◀︎
            </button>
            <button class="fixed bottom-20 right-5 btn btn-circle btn-outline mr-3" @click="moveChapter('right')">
                <!--                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>-->
                ▶︎
            </button>
        </div>
    </div>
</template>
<script setup>
import cookieUtil from '~/composables/cookie';
import {api} from "~/composables/api";
import router from "~/composables/router"
import bibles from "~/bible/objects/bibles";
import routes from "~/composables/route";

const recentBible = ref(cookieUtil.get('recentBible'))
const bibleSearchInfo = ref({
    book: '',
    bookName: '',
    chapter: '',
    verse: ''
})
const bibleInfos = ref({})
const clipBoard = ref([])

onMounted(() => {
    routes.alertRouteQuery()
})
/**
 * method
 */
const copyVerse = () => {
    this.$copyText('text').then(() => alert('복사'))
}
const moveChapter = async (mode) => {
    if (mode === 'left') {
        if (bibleSearchInfo.value.bookName === '창세기' && Number(bibleSearchInfo.value.chapter) === 1) return
        bibleSearchInfo.value.chapter = Number(bibleSearchInfo.value.chapter) - 1
    } else {
        if (bibleSearchInfo.value.bookName === '요한계시록' && Number(bibleSearchInfo.value.chapter) === 22) return
        bibleSearchInfo.value.chapter = Number(bibleSearchInfo.value.chapter) + 1
    }
    if (Number(bibleSearchInfo.value.chapter) === 0) {
        let presentBible = bibles.getBibleByBookName(bibleSearchInfo.value.bookName)
        let bible = bibles.getBibleByBookIndex(presentBible.bookIndex - 1)
        bibleSearchInfo.value.bookName = bible.bookName
        bibleSearchInfo.value.chapter = bible.totalChapter
    }
    try {
        await findBible()
    } catch (error) {
        let presentBible = bibles.getBibleByBookName(bibleSearchInfo.value.bookName)
        let bible = bibles.getBibleByBookIndex(presentBible.bookIndex + 1)
        bibleSearchInfo.value.bookName = bible.bookName
        bibleSearchInfo.value.chapter = 1
        await findBible()
    }
}
const clickVerse = (verse) => {
    if (clipBoard.value.includes(verse)) {
        for (let i = 0; i < clipBoard.value.length; i++) {
            if (clipBoard.value[i] === verse) {
                clipBoard.value.splice(i, 1)
            }
        }
    } else {
        clipBoard.value.push(verse)
    }
    console.log(clipBoard.value)
}
const verseCorrect = (verse) => {
    return verse.toString() === bibleSearchInfo.value.verse
}
const verseClass = (verse) => {
    return clipBoard.value.includes(verse)
}
const findVerse = () => {
    router.push({hash: `#verse_${bibleSearchInfo.value.verse - 2 < 0 ? 1 : bibleSearchInfo.value.verse - 2}`}).then(() => {
        // Adjust the scroll position after navigation
        // const element = document.querySelector(`#verse_${bibleSearchInfo.value.verse}`);
        // window.scrollTo({ top: -10, behavior: 'smooth' });
    });
}
const findBible = async () => {
    cookieUtil.set('recentBible', `${bibleSearchInfo.value.bookName} ${bibleSearchInfo.value.chapter}`)
    bibleInfos.value = await getBible()
}
const getBible = async () => {
    return (await api.get(`/api/bibleverse/input?bookName=${bibleSearchInfo.value.bookName}&chapter=${bibleSearchInfo.value.chapter}&verse=${bibleSearchInfo.value.verse}`)).data
}
const loadRecentBible = () => {
    if (recentBible.value.length === 0) {
        recentBible.value = '창세기 1'
    }
    bibleSearchInfo.value.bookName = recentBible.value.split(' ')[0]
    bibleSearchInfo.value.chapter = recentBible.value.split(' ')[1]
    findBible()
}
/**
 * method end
 */

loadRecentBible()
provide('bibleSearchInfo', bibleSearchInfo)
</script>