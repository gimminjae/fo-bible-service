<template>
  <div>
      <div class="hero min-h-screen bg-base-200">
          <div class="hero-content flex-col lg:flex-row-reverse">
              <div class="text-center lg:text-left">
                  <h1 class="text-5xl font-bold py-6">Login now!</h1>
<!--                  <p class="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>-->
              </div>
              <div class="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                  <div class="card-body">
                      <div class="form-control">
                          <label class="label">
                              <span class="label-text">ID</span>
                          </label>
                          <input type="text" v-model="loginDto.username" placeholder="id" class="input input-bordered" />
                      </div>
                      <div class="form-control">
                          <label class="label">
                              <span class="label-text">Password</span>
                          </label>
                          <input type="text" v-model="loginDto.password" placeholder="password" class="input input-bordered" />
                          <div class="flex justify-between">
                              <label class="label">
                                  <a href="#" class="label-text-alt link link-hover">아이디를 잊으셨나요??</a>
                              </label>
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
import axios from "axios";

const router = useRouter()
const loginDto = ref({
    username: '',
    password: ''
})
const login = async () => {
    try {
        const result = await axios.post(`/api/members/login?username=${loginDto.value.username}&password=${loginDto.value.password}`)
        console.log(result)
        result.value = result
        router.replace({ path: '/' })
    } catch (error) {
        alert('로그인 실패 : 아이디 혹은 비밀번호를 확인하세요')
    }
}
</script>