<template>
    <div>
        <div class="hero min-h-screen bg-base-200">
            <div class="hero-content flex-col lg:flex-row-reverse">
                <div class="text-center lg:text-left">
                    <h1 class="text-5xl font-bold">비밀번호 변경</h1>
                </div>
                <div class="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <div class="card-body">
                        <div class="form-control">
                            <label class="label">
                                <span class="label-text">현재 비밀번호</span>
                            </label>
                            <label class="input-group">
                                <input v-model="password.oldPassword" type="password" placeholder="" class="input input-bordered" />
                            </label>
                        </div>
                        <div class="form-control">
                            <label class="label">
                                <span class="label-text">새 비밀번호</span>
                            </label>
                            <label class="input-group">
                                <input v-model="password.newPassword1" type="password" placeholder="" class="input input-bordered" />
                            </label>
                        </div>
                        <div class="form-control">
                            <label class="label">
                                <span class="label-text">새 비밀번호 확인</span>
                            </label>
                            <label class="input-group">
                                <input v-model="password.newPassword2" type="password" placeholder="" class="input input-bordered" />
                            </label>
                        </div>
                        <div class="form-control mt-6">
                            <button class="btn btn-info" @click="changePassword">변경</button> <!-- v-bind:disabled="validTotal" -->
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import {store} from "~/composables/store";
import {api} from "~/composables/api";
import cookieUtil from "~/composables/cookie";
import router from "~/composables/router";
import toastAlert from "~/composables/toast";

const password = ref({
    oldPassword: '',
    newPassword1: '',
    newPassword2: ''
})
const passwordError = ref('')
const logout = () => {
    api.remove(`/api/members/logout`)
    cookieUtil.remove('accessToken')
    cookieUtil.remove('refreshToken')
    store().logout()
    router.push({ path: '/bible/bible' })
}
const changePassword = async () => {
    if(!(password.value.newPassword1 === password.value.newPassword2)) {
        toastAlert.warn('두 개의 새 비밀번호가 일치하지 않습니다.')
        return
    }
    try {
        await api.patch(`/api/members/password`, password.value)
        toastAlert.info('비밀번호가 변경되었습니다.\n다시 로그인 해주세요.')
        logout()
        router.replace({ path: '/bible/bible' })
    } catch(error) {
        toastAlert.error(error.response.data)
    }
}
</script>