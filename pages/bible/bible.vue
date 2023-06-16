<template>
    <div class="">
        <BibleFormTotal @click-btn="findBible" />
        <div class="mx-1 my-1" v-if="bibleInfos.length > 0">
            {{ bibleInfos[0].bookName }} {{ bibleInfos[0].chapter }}장
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
import bibles from '~/bible/objects/bibles';

const router = useRouter()
const bibleSearchString = ref('')
const bibleSearchInfo = ref({
    book: '',
    bookName: '',
    chapter: '',
    verse: ''
})
const bibleInfos = ref({

})
const findBibleType1 = async () => {
    try {
        const result = await axios.get(`/api/bibleverse/input?bookName=${bibleSearchInfo.value.bookName}&chapter=${bibleSearchInfo.value.chapter}&verse=${bibleSearchInfo.value.verse}`)
        bibleInfos.value = result.data
        router.replace({ hash: `#verse_${bibleSearchInfo.value.verse-1}` });
        if(bibleInfos.value.length <= 0) {
            
        }
    } catch(error) {
        console.log(error)
        alert(error)
    }
}
const findBibleType3 = async () => {
    try {
        const result = await axios.get(`/api/bibleverse/inputString?bibleSearchString=${bibleSearchString.value}`)
        bibleInfos.value = result.data
        let searchParams = bibleSearchString.value.split(' ')
        if(searchParams.length > 2) {
            router.replace({ hash: `#verse_${bibleSearchString.value.split(' ')[2]-1}` });
        }
        if(bibleInfos.value.length <= 0) {
            
        }
    } catch(error) {
        console.log(error)
        alert(error)
    }
}
const findBible = (formType) => {
    console.log(bibles.getKoBible())
    if(formType === 'input') {
        findBibleType1()
    } else if (formType === 'inputString') {
        findBibleType3()
    }
}
provide('bibleSearchInfo', bibleSearchInfo)
provide('bibleSearchString', bibleSearchString)
</script>