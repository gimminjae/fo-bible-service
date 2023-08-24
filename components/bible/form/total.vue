<template>
    <div :class="`navbar bg-base-100 flex sticky top-0 gap-1 justify-start`"> <!-- ${formType === 'input' ? 'justify-between' : 'justify-start'}` -->
<!--        <select class="select select-primary select-sm max-w-xs" name="" id="" v-model="formType" @change="changeFormType">-->
<!--            <option v-for="option in options" :value="option.value">-->
<!--                {{ option.text }}-->
<!--            </option>-->
<!--        </select>-->
<!--        <BibleFormBibleSearchType1 v-if="formType === 'input'"/>-->
        <div>
            <BibleFormBibleSearchType2 @verse-change="verseChange"/> <!-- v-if="formType === 'select'" -->
<!--            <button class="btn btn-sm">확인</button>-->
        </div>
<!--        <div class="flex justify-between gap-3">-->
<!--            <button class="btn btn-circle btn-sm btn-outline ml-3" @click="clickMoveChapter('left')">-->
<!--                ◀︎-->
<!--            </button>-->
<!--            <button class="btn btn-circle btn-sm btn-outline mr-3" @click="clickMoveChapter('right')">-->
<!--                ▶︎-->
<!--            </button>-->
<!--        </div>-->
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
const emits = defineEmits(['verseChange', 'clickMoveChapter'])
const formType = ref('input')
const verseChange = () => { emits('verseChange', formType.value) }
const clickMoveChapter = (mode) => { emits('clickMoveChapter', mode)}
let formTypeCookie = cookieUtil.get('formType')
if(formTypeCookie != null && formTypeCookie.length > 0) {
    formType.value = formTypeCookie
}

//method
const changeFormType = () => {
    cookieUtil.set('formType', formType.value)
}
</script>