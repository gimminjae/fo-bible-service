<template>
    <div class="mx-3">
        <div v-for="bible in bibleList" tabindex="0" class="collapse collapse-arrow border border-base-300 bg-base-200">
            <input type="checkbox" />
            <div class="collapse-title text-xl font-medium">
                {{ bible.bookName}}
            </div>
            <div class="collapse-content grid grid-cols-5 gap-4">
                <button v-for="chapter in bible.chapterCount" class="btn" @click="findBibleEvent(bible, chapter)">{{ chapter }}</button>
            </div>
        </div>
    </div>
</template>
<script setup>
import bibles from '~/bible/objects/bibles'
import cookieUtil from '~/composables/cookie';

const router = useRouter()
const emits=defineEmits(['findBible'])
const bibleList = bibles.getKoBible()
console.log(bibleList)

const findBibleEvent = (bible, chapter) => {
    emits('findBible', bible)
    cookieUtil.set('recentBible', `${bible.bookName} ${chapter}`)
    router.replace({ path: '/bible/bible' })
}
</script>