<template>
    <div>
        <BibleFormTotal @click-btn="findBible" />
        <div class="mx-1 my-1" v-if="bibleInfos.length > 0">
            {{ bibleInfos[0].bookName }} {{ bibleInfos[0].chapter }}장
            <ul>
                <li v-for="bible in bibleInfos" class="m-2">
                    <div class="flex">
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

const bibleSearchInfo = ref({
    book: '',
    bookName: '',
    chapter: '',
    verse: ''
})
const bibleInfos = ref({

})
const findBibleType1 = async () => {
    console.log(bibleSearchInfo)
    try {
        const result = await axios.get(`/api/bibleverse/type1?bookName=${bibleSearchInfo.value.bookName}&chapter=${bibleSearchInfo.value.chapter}&verse=${bibleSearchInfo.value.verse}`)
        console.log(result)
        bibleInfos.value = result.data
        if(bibleInfos.value.length <= 0) {
            
        }
    } catch(error) {
        console.log(error)
        alert(error)
    }
}
const findBible = () => {
    findBibleType1()
}
provide('bibleSearchInfo', bibleSearchInfo)
</script>