<template>
  <div>
      <div v-if="findPwModal" class="fixed bottom-1/2 modal-box z-10 shadow-base-300 card flex justify-center">
          <div class="card-body items-center text-center whitespace-nowrap">
<!--              <h2 class="card-title">Cookies!</h2>-->
              <p>가입된 이메일을 입력하세요.</p>
              <p>이메일로 새로 발급되는 비밀번호가 전송됩니다.</p>
              <input type="text" v-model="email" placeholder="email" class="input input-bordered" />
              <div class="card-actions justify-end">
                  <button class="btn btn-primary" @click="issueTemporaryPw(email)">비밀번호 발급</button>
                  <button class="btn btn-ghost btn-outline" @click="closeModal">취소</button>
              </div>
          </div>
      </div>
      <div class="hero min-h-screen bg-base-200">
          <div class="hero-content flex-col lg:flex-row-reverse">
              <div class="text-center lg:text-left">
                  <h1 class="text-5xl font-bold py-6">로그인</h1>
<!--                  <p class="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>-->
              </div>
              <div class="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                  <div class="card-body">
                      <div class="form-control">
                          <label class="label">
                              <span class="label-text">Email</span>
                          </label>
                          <input type="text" v-model="loginDto.email" placeholder="email" class="input input-bordered" />
                      </div>
                      <div class="form-control">
                          <label class="label">
                              <span class="label-text">Password</span>
                          </label>
                          <input type="password" v-model="loginDto.password" placeholder="password" class="input input-bordered" />
                          <div class="flex justify-end">
                              <label class="label">
                                  <button class="label-text-alt link link-hover" @click="findPwModal = true">비밀번호를 잊으셨나요?</button>
                              </label>
                          </div>
                      </div>
                      <div class="form-control mt-6">
                          <button class="btn btn-primary" @click="login">로그인</button>
                      </div>
                  </div>
              </div>
          </div>
      </div>
  </div>
</template>
<script setup>
import cookieUtil from "~/composables/cookie";
import router from "~/composables/router";
import toastAlert from "~/composables/toast";
import routes from "~/composables/route";
import {store} from "~/composables/store";

const loginDto = ref({
    email: '',
    password: ''
})
const findPwModal = ref(false)
const login = async () => {
    try {
        const result = await api.post(`/api/members/login?email=${loginDto.value.email}&password=${loginDto.value.password}`)
        cookieUtil.setWithMaxAge('accessToken', result.data.accessToken, 60 * 30)
        cookieUtil.setWithMaxAge('refreshToken', result.data.refreshToken, 60 * 60 * 24 * 30)
        await api.getMe()
        router.replace({ path: '/bible/bible' })
    } catch (error) {
        toastAlert.error('로그인 실패 : 아이디 혹은 비밀번호를 확인하세요')
    }
}
const email = ref('')
const closeModal = () => {
    findPwModal.value = false
    email.value = ''
}
const issueTemporaryPw = async (email) => {
    try {
        api.post(`/api/members/lost-password/${email}`)
        toastAlert.info('변경된 비밀번호가 이메일로 전송되었습니다.\n로그인 후 비밀번호를 변경해주세요.')
    } catch (error) {
        toastAlert.error(error.response.data)
    } finally {
        closeModal()
    }
}
onMounted(() => {
    routes.alertRouteQuery()
    if (store().$state.member.memId) {
        router.replace(`/plan`)
    }
})
</script>