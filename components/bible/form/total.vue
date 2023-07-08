<template>
    <div :class="`navbar bg-base-100 flex sticky top-0 gap-1 justify-start`"> <!-- ${formType === 'input' ? 'justify-between' : 'justify-start'}` -->
<!--        <select class="select select-primary select-sm max-w-xs" name="" id="" v-model="formType" @change="changeFormType">-->
<!--            <option v-for="option in options" :value="option.value">-->
<!--                {{ option.text }}-->
<!--            </option>-->
<!--        </select>-->
<!--        <BibleFormBibleSearchType1 v-if="formType === 'input'"/>-->
        <BibleFormBibleSearchType2/> <!-- v-if="formType === 'select'" -->
        <button v-if="formType === 'select'" class="btn btn-sm" @click="clickBtn">확인</button>
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
        text: '선택',
        value: 'select',
    }
])
const emits = defineEmits(['clickBtn'])
const formType = ref('input')
const clickBtn = () => { emits('clickBtn', formType.value) }

let formTypeCookie = cookieUtil.get('formType')
if(formTypeCookie != null && formTypeCookie.length > 0) {
    formType.value = formTypeCookie
}

//method
const changeFormType = () => {
    cookieUtil.set('formType', formType.value)
}
</script>