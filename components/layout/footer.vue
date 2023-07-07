<template>
    <div class="btm-nav fixed bottom-0">
<!--        <button @click="changeActive('')" :class="{'active': active === '' }" disabled>-->
<!--            <i class="fa-solid fa-chart-simple"></i>-->
<!--        </button>-->
<!--        <NuxtLink to="/bible/bible" :class="{'active': active === 'bible-bible' }" @click="changeActive('bible-bible')">-->
<!--            <i class="fa-solid fa-book-bible"></i>-->
<!--        </NuxtLink>-->
<!--        <NuxtLink to="/setting" @click="changeActive('setting')" :class="{'active': active === 'setting' }">-->
<!--            <i class="fa-solid fa-gear"></i>-->
<!--        </NuxtLink>-->
        <button disabled>
            <i class="fa-solid fa-chart-simple"></i>
        </button>
        <NuxtLink to="/bible/bible">
            <i class="fa-solid fa-book-bible"></i>
        </NuxtLink>
        <NuxtLink to="/setting">
            <i class="fa-solid fa-gear"></i>
        </NuxtLink>
    </div>
</template>
<script setup>
const route = useRoute()
const active = ref('bible-bible')
const routeName = ref('')
routeName.value = route.name;
const changeActive = (pageType) => {
    active.value = pageType
}
</script>