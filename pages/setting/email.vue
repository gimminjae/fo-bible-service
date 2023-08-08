<template>
    <div>
        <div class="hero min-h-screen bg-base-200">
            <div class="hero-content flex-col lg:flex-row-reverse">
                <div class="text-center lg:text-left">
                    <h1 class="text-5xl font-bold">이메일 변경</h1>
                </div>
                <div class="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <div class="card-body">
                        <div class="form-control">
                            <div class="stat">
                                <div class="stat-title">현재 이메일</div>
                                <div class="">{{ store().$state.member.email }}</div>
                                <!--                <div class="stat-desc text-secondary">31 tasks remaining</div>-->
                            </div>
                        </div>
                        <div class="form-control">
                            <label class="label">
                                <span class="label-text">이메일</span>
                            </label>
                            <label class="input-group">
                                <input v-model="email" type="text" placeholder="" class="input input-bordered" />
                                <span @click="sendEmail">코드전송</span>
                            </label>
                        </div>
                        <div v-if="sendEmailYn" class="form-control">
                            <label class="label">
                                <span class="label-text">인증코드</span>
                            </label>
                            <label class="input-group">
                                <input v-model="emailCode" type="email" placeholder="" class="input input-bordered" />
                                <span @click="changeEmail">확인</span>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import {store} from "~/composables/store";
import router from "~/composables/router";
import toastAlert from "~/composables/toast";

const sendEmailYn = ref(false)
const emailCode = ref('')
const email = ref('')
const sendEmail = async () => {
    if(email.value.trim() === '') {
        toastAlert.warn('이메일을 입력하세요.')
        return
    }
    try {
        await api.post(`/api/members/confirmEmail/${email.value}`)
        toastAlert.success('메일이 전송되었습니다.')
        sendEmailYn.value = true
    } catch(error) {
        toastAlert.error(error.response.data)
    }
}
const changeEmail = async () => {
    if(emailCode.value.trim() === '') {
        toastAlert.info('인증코드를 입력하세요.')
        return
    }
    try {
        await api.post(`/api/members/confirmEmailCode`, {
            email: email.value,
            authCode: emailCode.value
        })
        await api.patch(`/api/members/email/${email.value}`)
        toastAlert.success('이메일이 변경되었습니다.')
        router.replace({ path: '/setting' })
    } catch(error) {
        toastAlert.error(error.response.data)
    }
}
</script>