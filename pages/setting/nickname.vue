<template>
<div>
<div class="hero min-h-screen bg-base-200">
    <div class="hero-content flex-col lg:flex-row-reverse">
        <div class="text-center lg:text-left">
            <h1 class="text-5xl font-bold">닉네임 변경</h1>
        </div>
        <div class="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <div class="card-body">
                <div class="form-control">
                    <div class="stat">
                        <div class="stat-title">현재 닉네임</div>
                        <div class="">{{ store.$state.member.nickname }}</div>
                        <!--                <div class="stat-desc text-secondary">31 tasks remaining</div>-->
                    </div>
                </div>
                <div class="form-control">
                    <label class="label">
                        <span class="label-text">닉네임</span>
                    </label>
                    <label class="input-group">
                        <input v-model="nickname" @input="validNickname.value = false" type="text" placeholder="" class="input input-bordered" />
                        <span @click="checkDuplication">중복확인</span>
                    </label>
                </div>
                <div>
                    <p v-if="validNickname" class="text-blue-500 text-sm">사용가능합니다.</p>
                    <p v-else class="text-red-500 text-sm">{{ nicknameError }}</p>
                </div>
                <div class="form-control mt-6">
                    <button class="btn btn-info" @click="changeNickname">변경</button> <!-- v-bind:disabled="validTotal" -->
                </div>
            </div>
        </div>
    </div>
</div>
</div>
</template>
<script setup>
import {useStore} from "~/composables/store";

const store = useStore()
const validNickname = ref(false)
const nickname = ref('')
const nicknameError = ref('')
const checkDuplication = async () => {
    if(nickname.value.trim() === '') {
        alert('닉네임을 입력하세요')
        return
    }
    try {
        await api.get(`/api/members/confirmNicknameDuplication?nickname=${nickname.value}`)
        validNickname.value = true
    } catch(error) {
        nicknameError.value = error.message
    }
}
const changeNickname = async () => {
    if(validNickname.value === false) {
        alert('중복확인을 진행해주세요.')
        return
    }
    try {
        await api.patch(`/api/members/nickname/${nickname.value}`)
        alert('닉네임이 변경되었습니다.')
        routers.replace({ path: '/setting' })
    } catch(error) {
        alert(error.message)
    }
}
</script>