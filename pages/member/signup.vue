<template>
  <div>
      <div class="hero min-h-screen bg-base-200">
          <div class="hero-content flex-col lg:flex-row-reverse">
              <div class="text-center lg:text-left">
                  <h1 class="text-5xl font-bold">회원가입</h1>
              </div>
              <div class="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                  <div class="card-body">
                      <div class="form-control">
                          <label class="label">
                              <span class="label-text">아이디</span>
                          </label>
                          <label class="input-group">
                              <input v-model="memberInfo.username" @input="validUsername = false" type="text" placeholder="" class="input input-bordered" />
                              <span>중복확인</span>
                          </label>
                      </div>
                      <div class="form-control">
                          <label class="label">
                              <span class="label-text">이메일</span>
                          </label>
                          <label class="input-group">
                              <input v-model="memberInfo.email" @input="validEmail = false" type="text" placeholder="" class="input input-bordered" />
                              <span>중복확인</span>
                          </label>
                      </div>
                      <div class="form-control">
                          <label class="label">
                              <span class="label-text">닉네임</span>
                          </label>
                          <label class="input-group">
                              <input v-model="memberInfo.nickname" @input="validNickname = false" type="text" placeholder="" class="input input-bordered" />
                              <span>중복확인</span>
                          </label>
                      </div>
                      <div class="form-control">
                          <label class="label">
                              <span class="label-text">비밀번호</span>
                          </label>
                          <input v-model="memberInfo.password" @input="validPassword = false" type="text" placeholder="" class="input input-bordered" />
                      </div>
                      <div class="form-control">
                          <label class="label">
                              <span class="label-text">비밀번호 확인</span>
                          </label>
                          <input v-model="memberInfo.password2" @input="validPassword = false" type="text" placeholder="" class="input input-bordered" />
                      </div>
                      <div v-if="!validPassword">
                          <p class="text-red-500">비밀번호가 일치하지 않습니다.</p>
                      </div>
                      {{ memberInfo }}
                      <div class="form-control mt-6">
                          <button class="btn btn-primary" @click="signup" v-bind:disabled="!formValid.total">회원가입</button>
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
const memberInfo = ref({
    username: '',
    password: '',
    password2: '',
    email: '',
    nickname: '',
})
const formValid = ref({
    username: false,
    email: false,
    nickname: false,
    password: memberInfo.value.password === memberInfo.value.password2,
    total: false
})
const validUsername = ref(false)
const validEmail = ref(false)
const validNickname = ref(false)
const validPassword = ref(false)
const passwordConfirm = () => {
    if(memberInfo.value.password === memberInfo.value.password2) {
        formValid.value = true
    } else {
        formValid.value = false
    }
}
const signup = async () => {
    try {
        const result = await axios.post(`/api/members/signup`, memberInfo.value)
        console.log(result)
        result.value = result
        router.replace({ path: '/' })
    } catch (error) {
        alert('회원가입 실패 : 아이디 혹은 비밀번호를 확인하세요')
    }
}
</script>