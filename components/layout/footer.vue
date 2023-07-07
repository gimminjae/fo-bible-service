<template>
    <div class="btm-nav sticky bottom-0">
        <button @click="changeActive('')" :class="{'active': active === '' }" disabled>
            <i class="fa-solid fa-chart-simple"></i>
        </button>
        <NuxtLink to="/bible/bible" :class="{'active': active === 'bible' }" @click="changeActive('bible')">
            <i class="fa-solid fa-book-bible"></i>
        </NuxtLink>
        <NuxtLink to="/setting" @click="changeActive('setting')" :class="{'active': active === 'setting' }">
            <i class="fa-solid fa-gear"></i>
        </NuxtLink>
    </div>
</template>
<script setup>
const active = ref('bible')
const changeActive = (pageType) => {
    active.value = pageType
}
</script>