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
                              <span class="label-text">닉네임</span>
                          </label>
                          <label class="input-group">
                              <input v-model="memberInfo.nickname" @input="validNickname = false" type="text" placeholder="" class="input input-bordered" />
                              <span @click="confirm('nickname')">검증</span>
                          </label>
                      </div>
                      <div>
                          <p v-if="validNickname" class="text-blue-500 text-sm">사용가능합니다.</p>
                          <p v-else class="text-red-500 text-sm">{{ nicknameError }}</p>
                      </div>
                      <div class="form-control">
                          <label class="label">
                              <span class="label-text">이메일</span>
                          </label>
                          <label class="input-group">
                              <input v-model="memberInfo.email" type="text" placeholder="" class="input input-bordered" />
                              <span @click="sendEmail">코드전송</span>
                          </label>
                      </div>
                      <div v-if="sendEmailYn" class="form-control">
                          <label class="label">
                              <span class="label-text">인증코드</span>
                          </label>
                          <label class="input-group">
                              <input v-model="emailCode" type="email" placeholder="" class="input input-bordered" />
                              <span @click="confirmEmailCode">확인</span>
                          </label>
                      </div>
                      <div>
                          <p v-if="validEmail" class="text-blue-500 text-sm">인증되었습니다.</p>
                          <p v-else class="text-red-500 text-sm">{{ emailError }}</p>
                      </div>
                      <div class="form-control">
                          <label class="label">
                              <span class="label-text">비밀번호</span>
                          </label>
                          <input v-model="memberInfo.password" type="password" placeholder="" class="input input-bordered" />
                      </div>
                      <div class="form-control">
                          <label class="label">
                              <span class="label-text">비밀번호 확인</span>
                          </label>
                          <input v-model="memberInfo.password2" type="password" placeholder="" class="input input-bordered" />
                      </div>
                      <div class="form-control mt-6">
                          <button class="btn btn-primary" @click="signup">회원가입</button> <!-- v-bind:disabled="validTotal" -->
                      </div>
                  </div>
              </div>
          </div>
      </div>
  </div>
</template>
<script setup>
import {api} from "~/composables/api";
import router from "~/composables/router"
import toastAlert from "~/composables/toast";
import 'vue3-toastify/dist/index.css';

const memberInfo = ref({
    password: '',
    password2: '',
    email: '',
    nickname: '',
})
const emailCode = ref('')
const sendEmailYn = ref(false)

const validEmail = ref(false)
const emailError = ref('')

const validNickname = ref(false)
const nicknameError = ref('')
const confirmEmailCode = async () => {
    if (emailCode.value === '') {
        toastAlert.warn('인증코드를 입력하세요')
    }
    try {
        await api.post(`/api/members/confirmEmailCode`, {
            email: memberInfo.value.email,
            authCode: emailCode.value
        })
        toastAlert.info('인증되었습니다.')
        validEmail.value = true
    } catch(error) {
        toastAlert.error(error.response.data)
    }
}
const sendEmail = async () => {
    if(memberInfo.value.email.trim() === '') {
        toastAlert.warn('이메일를 입력하세요')
        return
    }
    try {
        api.post(`/api/members/confirmEmail/${memberInfo.value.email}`)
        toastAlert.success('메일이 발송되었습니다')
        sendEmailYn.value = true
    } catch(error) {
        toastAlert.error(error.response.data)
    }
}
const confirm = async (type) => {
    let url = '/api/members/'
    let path = ''
    let param = ''
    if(type === 'nickname') {
        if(memberInfo.value.nickname.trim() === '') {
            toastAlert.warn('닉네임를 입력하세요')
            return
        }
        if(!(memberInfo.value.nickname.length >= 5 && memberInfo.value.nickname.length <= 10)) {
            toastAlert.info("닉네임은 5 ~ 10자 이어야 합니다.")
            return
        }
        path = 'confirmNicknameDuplication'
        param = memberInfo.value.nickname
    }
    try {
        await api.get(`${url}${path}?${type}=${param}`)
        if(type === 'nickname') {
            validNickname.value = true
        }
    } catch(error) {
        if(type === 'nickname') {
            nicknameError.value = error.response.data
        }
        console.log(error.response.data)
    }
}
const signup = async () => {
    if(!validNickname.value || !validEmail.value) {
        toastAlert.warn('요구사항이 모두 충족되지 않았습니다.')
        return
    }
    if(memberInfo.value.password !== memberInfo.value.password2) {
        toastAlert.warn('비밀번호가 일치하지 않습니다.')
        return
    }
    try {
        const result = await api.post(`/api/members/signup`, memberInfo.value)
        result.value = result
        router.replace({ path: '/member/login', query: { message: '회원가입이 완료되었습니다.' } })
    } catch (error) {
        toastAlert.error(`회원가입 실패: ${error.response.data}`)
    }
}
</script>