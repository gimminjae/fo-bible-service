<template>
    <div class="grid grid-flow-col justify-stretch mx-1 gap-1">
        <BasicInputForm v-model="bibleSearchInfo.bookName" :placeholder="'성경'"/>
        <BasicInputForm v-model="bibleSearchInfo.chapter" :placeholder="'장'"/>
        <BasicInputForm v-model="bibleSearchInfo.verse" :placeholder="'절'"/>
    </div>
</template>
<script setup>
const bibleSearchInfo = inject('bibleSearchInfo', {})
</script>