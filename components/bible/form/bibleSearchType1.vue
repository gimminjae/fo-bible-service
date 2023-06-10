<template>
    <div class="grid grid-flow-col justify-stretch mx-1 gap-1">
        <BasicInputForm v-model="pBook"/>
        <BasicInputForm v-model="pChapter"/>
        <BasicInputForm v-model="pVerse"/>
    </div>
</template>
<script setup>
const props = defineProps({
    bibleSearchInfo: {
        type: String,
        default: {
        }
    }
})
const pBook = ref(props.bibleSearchInfo.book)
const pChapter = ref(props.bibleSearchInfo.chapter)
const pVerse = ref(props.bibleSearchInfo.verse)

watch(props.bibleSearchInfo, (newBibleSearchInfo) => {
    pBook.value = newBibleSearchInfo.book
    pChapter.value = newBibleSearchInfo.chapter
    pVerse.value = newBibleSearchInfo.verse
});
</script>