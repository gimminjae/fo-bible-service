<template>
    <div class="grid grid-flow-col justify-around mx-1 gap-2" @click="console.log('click')">
        <button class="btn btn-sm">
            Inbox
            <div class="badge badge-secondary">1</div>
        </button>
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