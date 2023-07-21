<template>
  <div>
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
                                  <a href="#" class="label-text-alt link link-hover">비밀번호를 잊으셨나요?</a>
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
import {store} from "~/composables/store"

const loginDto = ref({
    email: '',
    password: ''
})
const login = async () => {
    try {
        const result = await api.post(`/api/members/login?email=${loginDto.value.email}&password=${loginDto.value.password}`)
        cookieUtil.setWithMaxAge('accessToken', result.data.accessToken, 60 * 30)
        cookieUtil.setWithMaxAge('refreshToken', result.data.refreshToken, 60 * 60 * 24 * 30)
        const meResult = await api.get(`/api/members/me`, {
            headers: {
                Authentication: cookieUtil.get('accessToken')
            }
        })
        store().setMember(meResult.data.member)
        router.push({ path: '/bible/bible' })
    } catch (error) {
        alert('로그인 실패 : 아이디 혹은 비밀번호를 확인하세요')
    }
}
</script>