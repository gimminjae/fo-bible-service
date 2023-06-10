<template>
    <div class="flex justify-stretch m-1">
        <BibleFormBibleSearchType1 v-if="formType === 'input'" :bibleSearchInfo="bibleSearchInfo"/>
        <BibleFormBibleSearchType2 v-if="formType === 'select'"/>
        <button class="btn btn-sm">검색</button>
    </div>
</template>
<script setup>
const bibleSearchInfo = inject('bibleSearchInfo')
const formType = ref('input')
</script>