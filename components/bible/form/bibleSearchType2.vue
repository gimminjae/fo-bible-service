<template>
    <div class="grid grid-flow-col justify-around mx-1 gap-1">
        <BasicSelect v-model="bibleSearchInfo.book" :options="bibleList" :defaultValue="'성경'"/>
        <BasicSelect/>
        <BasicSelect/>
    </div>
</template>
<script setup>
import bibles from '~/bible/objects/bibles';

const bibleSearchInfo = inject('bibleSearchInfo')

const bibleList = bibles.getKoBible()
bibleList.forEach(bible => {
    bible.text = bible.bookName
    bible.value = bible.bibleIndex
    
});
</script>