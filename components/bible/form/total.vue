<template>
    <div class="flex justify-stretch">
        <select name="" id="" v-model="formType" @change="changeFormType">
            <option v-for="option in options" :value="option.value">
                {{ option.text }}
            </option>
        </select>
        <BibleFormBibleSearchType1 v-if="formType === 'input'"/>
        <BibleFormBibleSearchType2 v-if="formType === 'select'"/>
        <button class="btn btn-sm" @click="clickBtn">검색</button>
    </div>
</template>
<script setup>
import cookieUtil from '~/composables/cookie';

const options = ref([
    {
        text: '입력',
        value: 'input',
    },
    {
        text: '한줄입력',
        value: 'inputString',
    },
    {
        text: '선택',
        value: 'select',
    }
])
const emits = defineEmits(['clickBtn'])
const formType = ref('input')
const clickBtn = () => { emits('clickBtn') }

let formTypeCookie = cookieUtil.get('formType')
if(formTypeCookie != null && formTypeCookie.length > 0) {
    formType.value = formTypeCookie
}

//method
const changeFormType = () => {
    cookieUtil.set('formType', formType.value)
}
</script>