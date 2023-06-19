<template>
    <div class="">
        <BibleFormTotal @click-btn="findBible" />
        <div class="mx-1 my-1" v-if="bibleInfos.length > 0">
            <p class="text-gray-400">{{ bibleInfos[0].bookName }} {{ bibleInfos[0].chapter }}장</p>
            <ul>
                <li v-for="bible in bibleInfos" class="m-2">
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

/**
 * method
 */
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