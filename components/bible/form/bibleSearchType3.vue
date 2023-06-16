<template>
    <div class="grid grid-flow-col justify-stretch mx-1 gap-1">
        <BasicInputForm v-model="bibleSearchString" :placeholder="'성경 장 절 ex) 창세기 1 1'"/>
    </div>
</template>
<script setup>
const bibleSearchString = inject('bibleSearchString', '')
</script>