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
                              <span @click="confirm('username')">중복확인</span>
                          </label>
                      </div>
                      <div>
                          <p v-if="validUsername" class="text-blue-500 text-sm">사용가능합니다.</p>
                          <p v-else class="text-red-500 text-sm">{{ usernameError }}</p>
                      </div>
                      <div class="form-control">
                          <label class="label">
                              <span class="label-text">닉네임</span>
                          </label>
                          <label class="input-group">
                              <input v-model="memberInfo.nickname" @input="validNickname = false" type="text" placeholder="" class="input input-bordered" />
                              <span @click="confirm('nickname')">중복확인</span>
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
                              <input v-model="memberInfo.email" @input="validEmail = false" type="text" placeholder="" class="input input-bordered" />
                              <span @click="sendEmail">인증코드전송</span>
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
                          <button class="btn btn-primary" @click="signup" v-bind:disabled="!validEmail && !validNickname && !validUsername">회원가입</button>
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
const emailCode = ref('')
const sendEmailYn = ref(false)

const validUsername = ref(false)
const usernameError = ref('')

const validEmail = ref(false)
const emailError = ref('')

const validNickname = ref(false)
const nicknameError = ref('')
const confirmEmailCode = async () => {
    try {
        await axios.get(`/api/members/confirmEmailCode?email=${memberInfo.value.email}&authCode=${emailCode.value}`)
        alert('인증되었습니다.')
        validEmail.value = true
    } catch(error) {
        alert(error.message)
    }
}
const sendEmail = async () => {
    if(memberInfo.value.email.trim() === '') {
        alert('이메일를 입력하세요')
        return
    }
    try {
        await axios.get(`/api/members/confirmEmail?email=${memberInfo.value.email}`)
        alert('메일이 발송되었습니다')
        sendEmailYn.value = true
    } catch(error) {
        alert(error.message)
    }
}
const confirm = async (type) => {
    let url = '/api/members/'
    let path = ''
    let param = ''
    if(type === 'username') {
        if(memberInfo.value.username.trim() === '') {
            alert('아이디를 입력하세요')
            return
        }
        path = 'confirmUsernameDuplication'
        param = memberInfo.value.username
    } else if(type === 'nickname') {
        if(memberInfo.value.nickname.trim() === '') {
            alert('닉네임를 입력하세요')
            return
        }
        path = 'confirmNicknameDuplication'
        param = memberInfo.value.nickname
    }
    try {
        await axios.get(`${url}${path}?${type}=${param}`)
        if(type === 'username') {
            validUsername.value = true
        } else if(type === 'nickname') {
            validNickname.value = true
        }
    } catch(error) {
        if(type === 'username') {
            usernameError.value = error.message
        } else if(type === 'nickname') {
            nicknameError.value = error.message
        }
        console.log(error)
    }
}
const signup = async () => {
    if(!validUsername.value || !validNickname.value || !validEmail.value) {
        alert('요구사항이 모두 충족되지 않았습니다.')
        return
    }
    if(memberInfo.value.password !== memberInfo.value.password2) {
        alert('비밀번호가 일치하지 않습니다.')
        return
    }
    try {
        const result = await axios.post(`/api/members/signup`, memberInfo.value)
        result.value = result
        router.replace({ path: '/member/login' })
    } catch (error) {
        alert(`회원가입 실패: ${error.message}`)
    }
}
</script>