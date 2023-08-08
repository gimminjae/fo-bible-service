<template>
    <div>
        <div class="navbar bg-base-100 flex justify-around sticky top-0">
            <h1>마이페이지</h1>
        </div>
        <div class="stats shadow flex justify-center" v-if="store().$state.member.memId">

            <div class="stat">
                <!--                <div class="stat-figure text-primary">-->
                <!--                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-8 h-8 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>-->
                <!--                </div>-->
                <div class="stat-title">{{ store().$state.member.email }}</div>
                <div class="stat-value text-primary">{{ store().$state.member.nickname }}</div>
                <div class="stat-desc">가입일 : {{ store().$state.member.createDateTime }}</div>
            </div>
        </div>
        <div class="">
            <ul>
                <NuxtLink to="/member/login">
                    <li v-if="!store().$state.member.memId" class="mx-5 my-10">로그인</li>
                </NuxtLink>
                <li v-if="store().$state.member.memId" class="mx-5 my-10" @click="logout">로그아웃</li>
                <!--                <NuxtLink to="/setting/email" v-if="store().$state.member.memId"><li class="mx-5 my-10">이메일 변경</li></NuxtLink>-->
                <NuxtLink to="/setting/nickname">
                    <li v-if="store().$state.member.memId" class="mx-5 my-10">닉네임 변경</li>
                </NuxtLink>
                <NuxtLink to="/setting/password">
                    <li v-if="store().$state.member.memId" class="mx-5 my-10">비밀번호 변경</li>
                </NuxtLink>
                <NuxtLink to="/member/signup">
                    <li v-if="!store().$state.member.memId" class="mx-5 my-10">회원가입</li>
                </NuxtLink>
                <NuxtLink to="/setting/proposal" v-if="store().$state.member.memId">
                    <li class="mx-5 my-10">건의/오류 신고</li>
                </NuxtLink>
                <li class="mx-5 my-10">
                    <div class="flex gap-3 justify-between">
                        <div class="align-middle">
                            <h3>테마</h3>
                        </div>
                        <select class="select select-bordered" v-model="colorMode.preference">
                            <option disabled selected>Theme</option>
                            <option v-for="theme of themes" :key="theme">{{ theme }}</option>
                        </select>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>
<script setup>
import cookieUtil from "~/composables/cookie";
import router from "~/composables/router";
import {api} from "~/composables/api";
import {store} from "~/composables/store";

api.getMe()
const logout = () => {
    api.remove(`/api/members/logout`)
    cookieUtil.remove('accessToken')
    cookieUtil.remove('refreshToken')
    store().logout()
    router.push({path: '/bible/bible'})
}
const colorMode = useColorMode();
const themes = [
    'system',
    'light',
    'dark',
    'cupcake',
    'bumblebee',
    'emerald',
    'corporate',
    'synthwave',
    'retro',
    'cyberpunk',
    'valentine',
    'halloween',
    'garden',
    'forest',
    'aqua',
    'lofi',
    'pastel',
    'fantasy',
    'wireframe',
    'black',
    'luxury',
    'dracula',
    'cmyk',
    'autumn',
    'business',
    'acid',
    'lemonade',
    'night',
    'coffee',
    'winter',
];
</script>