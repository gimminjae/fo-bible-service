<template>
    <div class="flex justify-stretch m-1">
        <BibleFormBibleSearchType1 v-if="formType === 'input'"/>
        <BibleFormBibleSearchType2 v-if="formType === 'select'"/>
        <button class="btn btn-sm">검색</button>
    </div>
</template>
<script setup>
const formType = ref('input')
</script>