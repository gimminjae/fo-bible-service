<template>
    <div class="grid grid-flow-col justify-stretch mx-1 gap-1">
        <BasicInputForm v-model="bibleSearchInfo.bookName"/>
        <BasicInputForm v-model="bibleSearchInfo.chapter"/>
        <BasicInputForm v-model="bibleSearchInfo.verse"/>
    </div>
</template>
<script setup>
const bibleSearchInfo = inject('bibleSearchInfo', {})
</script>