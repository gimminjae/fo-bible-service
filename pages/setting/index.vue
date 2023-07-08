<template>
    <div>
        <div class="navbar bg-base-100 flex justify-around sticky top-0">
            <h1>내정보 변경</h1>
        </div>
        <div>

        </div>
        <div class="">
            <ul>
                <li class="mx-5 my-10"><NuxtLink to="/member/login">로그인</NuxtLink></li>
                <li class="mx-5 my-10" @click="logout">로그아웃</li>
                <li class="mx-5 my-10">이메일 변경</li>
                <li class="mx-5 my-10">닉네임 변경</li>
                <li class="mx-5 my-10">비밀번호 변경</li>
                <li class="mx-5 my-10"><NuxtLink to="/member/signup">회원가입</NuxtLink></li>
            </ul>
        </div>
    </div>
</template>
<script setup>
import cookieUtil from "~/composables/cookie";

const router = useRouter()
const logout = () => {
    api.remove(`/api/members/logout`)
    cookieUtil.remove('accessToken')
    cookieUtil.remove('refreshToken')
    router.replace({ path: '/' })
}
</script>