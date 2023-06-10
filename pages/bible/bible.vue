<template>
    <div>
        <BibleFormTotal @click-btn="findBible"/>
        bible
    </div>
</template>
<script setup>
const bibleSearchInfo = ref({
    book: '',
    chapter: '',
    verse: ''
})
const bibleInfo = ref({

})
const findBible = () => {
    console.log(bibleSearchInfo)
}
provide('bibleSearchInfo', bibleSearchInfo)
</script>