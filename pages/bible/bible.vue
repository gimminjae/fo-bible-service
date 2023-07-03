<template>
    <div class="">
        <BibleFormTotal @click-btn="findBible" />
        <button @click="copyVerse">복사</button>
        <div class="mx-1 my-1" v-if="bibleInfos.length > 0">
            <p class="text-gray-400">{{ bibleInfos[0].bookName }} {{ bibleInfos[0].chapter }}장</p>
            <ul>
                <li v-for="bible in bibleInfos" :class="{'m-2': true, underline: verseClass(bible.verse)}" @click="clickVerse(bible.verse)">
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
import axios from 'axios'
import cookieUtil from '~/composables/cookie';


const recentBible = ref(cookieUtil.get('recentBible'))
const router = useRouter()
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
                clipBoard.value.splice(i)
            }
        }
    } else {
        clipBoard.value.push(verse)
    }
    console.log(clipBoard.value)
}
const verseClass = (verse) => {
    return clipBoard.value.includes(verse) ? true : false
}
 const findBibleType1 = async () => {
    try {
        const result = await axios.get(`/api/bibleverse/input?bookName=${bibleSearchInfo.value.bookName}&chapter=${bibleSearchInfo.value.chapter}&verse=${bibleSearchInfo.value.verse}`)
        bibleInfos.value = result.data
        router.push({ hash: `#verse_${bibleSearchInfo.value.verse - 1}`, behavior: 'smooth' })
        if (bibleInfos.value.length <= 0) {

        }
    } catch (error) {
        console.log(error)
    }
}
const findBibleType2 = async () => {
    try {
        const result = await axios.get(`/api/bibleverse/select?book=${bibleSearchInfo.value.book}&chapter=${bibleSearchInfo.value.chapter}&verse=${bibleSearchInfo.value.verse}`)
        bibleInfos.value = result.data
        router.replace({ hash: `#verse_${bibleSearchInfo.value.verse - 1}` });
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
    if(recentBible.value.length === 0 || recentBible.value == null) {
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