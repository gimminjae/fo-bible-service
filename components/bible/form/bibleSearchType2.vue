<template>
    <NuxtLink to="/bible/search">
        <div class="grid grid-flow-col justify-around mx-1 gap-2">
            <button class="btn btn-sm">
                {{ bibleSearchInfo.bookName }}
                <div class="badge badge-secondary ml-2">
                    {{ bibleSearchInfo.chapter }}
                </div>
            </button>
        </div>
    </NuxtLink>
    <BasicInputForm v-model="bibleSearchInfo.verse" @input="verseChange" :placeholder="'절'" style="width: 20%"/>
</template>
<script setup>
import bibles from '~/bible/objects/bibles';
const bibleSearchInfo = inject('bibleSearchInfo')
const emits = defineEmits(['verseChange'])
const bibleList = bibles.getKoBible()
bibleList.forEach(bible => {
    bible.text = bible.bookName
    bible.value = bible.bibleIndex
});
const verseChange = () => {
    emits('verseChange')
}
</script>