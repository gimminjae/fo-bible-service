<template>
    <div>
        <div class="navbar bg-base-100 flex justify-around sticky top-0"> <!--bg-primary text-primary-content-->
            <h1>마이페이지</h1>
        </div>
        <div class="stats shadow flex justify-center" v-if="store().$state.member.memId">

            <div class="stat">
                <!--                <div class="stat-figure text-primary">-->
                <!--                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-8 h-8 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>-->
                <!--                </div>-->
                <div class="stat-title"><i class="fa-solid fa-at mr-1"></i>{{ store().$state.member.email }}</div>
                <div class="stat-value text-primary">{{ store().$state.member.nickname }}</div>
                <div class="stat-desc"><i class="fa-solid fa-calendar mr-1"></i>가입일 :
                    {{ store().$state.member.createDateTime }}
                </div>
            </div>
        </div>
        <div class="">
            <ul>
                <NuxtLink to="/member/login">
                    <li v-if="!store().$state.member.memId" class="mx-5 my-10"><i
                            class="fa-solid fa-arrow-right-to-bracket mr-1"></i>로그인
                    </li>
                </NuxtLink>
                <li v-if="store().$state.member.memId" class="mx-5 my-10" @click="logout"><i
                        class="fa-solid fa-arrow-right-from-bracket mr-1"></i>로그아웃
                </li>
                <!--                <NuxtLink to="/setting/email" v-if="store().$state.member.memId"><li class="mx-5 my-10">이메일 변경</li></NuxtLink>-->
                <NuxtLink to="/setting/nickname">
                    <li v-if="store().$state.member.memId" class="mx-5 my-10"><i class="fa-solid fa-user-pen mr-1"></i>닉네임
                        변경
                    </li>
                </NuxtLink>
                <NuxtLink to="/setting/password">
                    <li v-if="store().$state.member.memId" class="mx-5 my-10"><i class="fa-solid fa-key mr-1"></i>비밀번호
                        변경
                    </li>
                </NuxtLink>
                <NuxtLink to="/member/signup">
                    <li v-if="!store().$state.member.memId" class="mx-5 my-10"><i
                            class="fa-solid fa-user-plus mr-1"></i>회원가입
                    </li>
                </NuxtLink>
                <NuxtLink to="/setting/proposal" v-if="store().$state.member.memId">
                    <li class="mx-5 my-10"><i class="fa-solid fa-circle-exclamation mr-1"></i>건의/오류 신고</li>
                </NuxtLink>
                <li class="mx-5 my-10">
                    <div class="flex gap-3 justify-between">
                        <div class="align-middle">
                            <h3><i class="fa-solid fa-mobile-screen mr-1"></i>테마</h3>
                            <p class="text-xs text-warning whitespace-nowrap">일부 테마에서 글씨가 잘 보이지 않을 수 있습니다.</p>
                        </div>
                        <select class="select select-bordered" v-model="colorMode.preference">
                            <option disabled selected>Theme</option>
                            <option v-for="theme of themes" :key="theme">{{ theme }}</option>
                        </select>
                    </div>
                </li>
                <li class="mx-5 my-10">
                    <div class="flex gap-3 justify-between">
                        <div class="align-middle">
                            <h3><i class="fa-solid fa-mobile-screen mr-1"></i>폰트</h3>
                            <p class="text-xs text-info">원하는 폰트가 있으시다면</p>
                            <p class="text-xs text-info">'눈누'사이트를 참고하셔서 건의사항으로 남겨주세요^^</p>
                        </div>
                        <button class="btn btn-outline" @click="fontPopup = true">폰트 변경</button>
                    </div>
                </li>
            </ul>
        </div>
        <div class="flex justify-center mx-auto my-auto">
            <div v-if="fontPopup" class="fixed top-20 modal-box z-10">
                <div class="mb-3 flex justify-between">
                    <h1 class="text-4xl">폰트 선택</h1>
                    <button class="btn btn-square" @click="fontPopup = false">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                             stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                  d="M6 18L18 6M6 6l12 12"/>
                        </svg>
                    </button>
                </div>
                <ul>
                    <li class="mb-2" v-for="font in fonts">
                        <div class="flex justify-between align-middle">
                            <p :style="'font-family: ' + font.value">{{ font.text }}</p>
                            <button :class="'btn btn-outline'" :disabled="selectedFont === font.value" @click="changeFont(font.value)">선택</button>
                        </div>
                        <hr class="my-1">
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script setup>
import cookieUtil from "~/composables/cookie";
import router from "~/composables/router";
import {api} from "~/composables/api";
import {store} from "~/composables/store";
import routes from "~/composables/route";
import {ref} from "vue";

api.getMe()
const logout = () => {
    if (!confirm('로그아웃 하시겠습니까?')) {
        return
    }
    api.remove(`/api/members/logout`)
    cookieUtil.remove('accessToken')
    cookieUtil.remove('refreshToken')
    store().logout()
    router.push({path: '/bible/bible'})
}
const fontPopup = ref(false)
const colorMode = useColorMode();
const selectedFont = ref(cookieUtil.get('font') ? cookieUtil.get('font') : '폰트선택')
const changeFont = (font) => {
    cookieUtil.set('font', font)
    location.reload()
}
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
const fonts = [
    {
        text: '기본 폰트',
        value: 'basic'
    },
    {
        text: '학교안심 우주',
        value: 'HakgyoansimWoojuR',
    },
    {
        text: '학교안심 가을소풍',
        value: 'HakgyoansimGaeulsopungB',
    },
    {
        text: '강원특별자지도체',
        value: 'GangwonState'
    },
    {
        text: '교보문고 2022',
        value: 'KyoboHandwriting2022khn'
    },
    {
        text: '오뮤 다예쁨체',
        value: 'omyu_pretty'
    },
    {
        text: '태백 은하수체',
        value: 'TAEBAEKmilkyway'
    },
    {
        text: 'KCC차쌤체',
        value: 'KCCChassam'
    }
]
onMounted(() => {
    routes.alertRouteQuery()
})
</script>