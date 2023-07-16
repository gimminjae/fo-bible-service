<template>
    <div class="">
        <BibleFormTotal @click-btn="findVerse" class=""/>
<!--        <button @click="copyVerse">복사</button>-->
        <div class="" v-if="bibleInfos.length > 0"> <!--style="padding-bottom: 20%; padding-top: 5%;"-->
<!--            <p class="text-gray-400">{{ bibleInfos[0].bookName }} {{ bibleInfos[0].chapter }}장</p>-->
            <ul>
                <li v-for="bible in bibleInfos" :class="{'text-sky-400': verseCorrect(bible.verse), 'm-2': true, 'underline decoration-dashed': verseClass(bible.verse)}" @click="clickVerse(bible.verse)">
                    <div class="flex" :id="`verse_${bible.verse}`">
                        <p class="mr-2">{{ bible.verse }}</p>
                        <p>{{ bible.content }}</p>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>
<script setup>
import cookieUtil from '~/composables/cookie';
import {api} from "~/composables/api";
import {routers} from "~/composables/router"


const recentBible = ref(cookieUtil.get('recentBible'))
const bibleSearchInfo = ref({
    book: '',
    bookName: '',
    chapter: '',
    verse: ''
})
const bibleInfos = ref({})
const clipBoard = ref([])

/**
 * method
 */
const copyVerse = () => {
    this.$copyText('text').then(() => alert('복사'))
}
const clickVerse = (verse) => {
    if(clipBoard.value.includes(verse)) {
        for(let i = 0; i < clipBoard.value.length; i++) {
            if(clipBoard.value[i] === verse) {
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
 const findBibleType1 = async () => {
    try {
        const result = await api.get(`/api/bibleverse/input?bookName=${bibleSearchInfo.value.bookName}&chapter=${bibleSearchInfo.value.chapter}&verse=${bibleSearchInfo.value.verse}`)
        bibleInfos.value = result.data
        // router.push({ hash: `#verse_${bibleSearchInfo.value.verse - 1}`, behavior: 'smooth' })
        if (bibleInfos.value.length <= 0) {

        }
    } catch (error) {
        console.log(error)
    }
}
const findVerse = () => {
    routers.push({ hash: `#verse_${bibleSearchInfo.value.verse-2}` }).then(() => {
        // Adjust the scroll position after navigation
        // const element = document.querySelector(`#verse_${bibleSearchInfo.value.verse}`);
        // window.scrollTo({ top: -10, behavior: 'smooth' });
    });
}
const findBibleType2 = async () => {
    try {
        const result = await api.get(`/api/bibleverse/select?book=${bibleSearchInfo.value.book}&chapter=${bibleSearchInfo.value.chapter}&verse=${bibleSearchInfo.value.verse}`)
        bibleInfos.value = result.data
        if (bibleInfos.value.length <= 0) {

        }
    } catch (error) {
        console.log(error)
    }
}
const findBible = (formType) => {
    if (formType === 'input') {
        findBibleType1()
    } else if (formType === 'select') {
        findBibleType2
    }
}
const loadRecentBible = () => {
    if(recentBible.value.length === 0) {
        recentBible.value = '창세기 1'
    }
    bibleSearchInfo.value.bookName = recentBible.value.split(' ')[0]
    bibleSearchInfo.value.chapter = recentBible.value.split(' ')[1]
    findBible('input')
}
/**
 * method end
 */

loadRecentBible()
provide('bibleSearchInfo', bibleSearchInfo)
</script>