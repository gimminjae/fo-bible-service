<template>
    <div>
        <BibleFormTotal @click-btn="findBible" />
        <div>
            <ul>
                <li v-for="bible in bibleInfos" class="m-1">
                    <p>{{ bible.verse }} {{ bible.content }}</p>
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
    } catch(error) {
        console.log(error)
    }
}
const findBible = () => {
    findBibleType1()
}
provide('bibleSearchInfo', bibleSearchInfo)
</script>