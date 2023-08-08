<template>
    <div class="hero min-h-screen bg-base-200">
        <div class="hero-content flex-col lg:flex-row-reverse">
            <div class="text-center lg:text-left">
                <h1 class="text-5xl font-bold py-6">건의 / 신고</h1>
                <!--                  <p class="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>-->
            </div>
            <div class="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                <div class="card-body">
                    <div class="form-control">
                        <label class="label">
                            <span class="label-text">제목</span>
                        </label>
                        <input type="text" v-model="proposal.title" class="input input-bordered"/>
                    </div>
                    <div class="form-control">
                        <label class="label">
                            <span class="label-text">내용</span>
                        </label>
                        <textarea v-model="proposal.content" placeholder=""
                                  class="textarea textarea-bordered textarea-lg w-full max-w-xs h-80"></textarea>
                    </div>
                    <div class="form-control mt-6">
                        <button class="btn btn-primary" @click="send">전송</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>

const proposal = ref({
    title: '',
    content: ''
})
const send = () => {
    api.post(`/api/proposal`, proposal.value)
    router.replace({ path: '/bible/bible', query: { message: '건의 / 신고를 제출했습니다.' } })
}
</script>