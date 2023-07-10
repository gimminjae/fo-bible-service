<template>
    <div>
        <div class="navbar bg-base-100 flex justify-around sticky top-0">
            <h1>마이페이지</h1>
        </div>
        <div class="stats shadow" v-if="store.$state.member.memId">

            <div class="stat">
<!--                <div class="stat-figure text-primary">-->
<!--                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-8 h-8 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>-->
<!--                </div>-->
                <div class="stat-title">{{ store.$state.member.email }}</div>
                <div class="stat-value text-primary">{{ store.$state.member.nickname }}</div>
                <div class="stat-desc">가입일 : {{ store.$state.member.createDateTime }}</div>
            </div>

            <div class="stat">
                <div class="stat-title">읽은 장수</div>
                <div class="stat-value">n 장</div>
<!--                <div class="stat-desc text-secondary">31 tasks remaining</div>-->
            </div>

        </div>
        <div class="">
            <ul>
                <NuxtLink to="/member/login"><li v-if="!store.$state.member.memId" class="mx-5 my-10">로그인</li></NuxtLink>
                <li v-if="store.$state.member.memId" class="mx-5 my-10" @click="logout">로그아웃</li>
                <NuxtLink to="/setting/email" v-if="store.$state.member.memId"><li class="mx-5 my-10">이메일 변경</li></NuxtLink>
                <li v-if="store.$state.member.memId" class="mx-5 my-10">닉네임 변경</li>
                <li v-if="store.$state.member.memId" class="mx-5 my-10">비밀번호 변경</li>
                <li v-if="!store.$state.member.memId" class="mx-5 my-10"><NuxtLink to="/member/signup">회원가입</NuxtLink></li>
                <NuxtLink to="/" v-if="store.$state.member.memId"><li class="mx-5 my-10">개발자에게 건의/신고</li></NuxtLink>
            </ul>
        </div>
    </div>
</template>
<script setup>
import cookieUtil from "~/composables/cookie";
import {routers} from "~/composables/router";
import {api} from "~/composables/api";
import {useStore} from "~/composables/store";

const store = useStore()
const logout = () => {
    api.remove(`/api/members/logout`)
    cookieUtil.remove('accessToken')
    cookieUtil.remove('refreshToken')
    store.logout()
    routers.push({ path: '/bible/bible' })
}
</script>