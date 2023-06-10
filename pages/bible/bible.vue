<template>
    <div>
        <BibleFormTotal/>
        {{ bibleSearchInfo }}
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
provide('bibleSearchInfo', bibleSearchInfo)
</script>