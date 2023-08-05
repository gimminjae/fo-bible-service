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
        <div @click="goPlan"> <!-- :class="{ 'disabled': !store().$state.member.memId }" -->
            <i class="fa-solid fa-chart-simple"></i>
        </div>
        <NuxtLink to="/bible/bible">
            <i class="fa-solid fa-book-bible"></i>
        </NuxtLink>
        <NuxtLink to="/setting">
            <i class="fa-solid fa-gear"></i>
        </NuxtLink>
    </div>
</template>
<script setup>
import {store} from "~/composables/store";

const goPlan = () => {
    api.getMe()
    if(!store().$state.member.memId) {
        alert('로그인이 필요한 서비스입니다.')
        router.push({ path: '/member/login' })
    } else {
        router.push({ path: '/plan' })
    }
}
</script>