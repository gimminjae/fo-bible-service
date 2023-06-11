<template>
    <div class="flex justify-stretch m-1">
        <select name="" id="">
            <option value="" v-for="(no, option) in options" :value="option">
                {{ no }}
            </option>
        </select>
        <BibleFormBibleSearchType1 v-if="formType === 'input'"/>
        <BibleFormBibleSearchType2 v-if="formType === 'select'"/>
        <button class="btn btn-sm" @click="clickBtn">검색</button>
    </div>
</template>
<script setup>
const options = ref([
    'input', 'select', 'inputString'
])
const emits = defineEmits(['clickBtn'])
const formType = ref('input')
const clickBtn = () => { emits('clickBtn') }
</script>