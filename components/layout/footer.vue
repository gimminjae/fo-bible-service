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
        <NuxtLink to="/plan" :class="{ 'disabled': !store().$state.member.memId }">
            <i class="fa-solid fa-chart-simple"></i>
        </NuxtLink>
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
</script>