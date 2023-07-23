<template>
  <div>
      <div class="navbar bg-base-100 flex justify-around sticky top-0">
          <h1>{{ planInfo.planName }}</h1>
      </div>
      <div class="tabs">
          <a :class="`tab tab-bordered ${ tab === 'Main' ? 'tab-active' : ''}`" @click="changeTab('Main')">Main</a>
          <a :class="`tab tab-bordered ${ tab === 'old' ? 'tab-active' : ''}`" @click="changeTab('old')">구약</a>
          <a :class="`tab tab-bordered ${ tab === 'new' ? 'tab-active' : ''}`" @click="changeTab('new')">신약</a>
      </div>
      <div class="stats stats-vertical lg:stats-horizontal shadow" v-for="status in planInfo.goalStatus">
          <div v-if="tab === 'old' && status.testament" class="stat">{{ status.bookName }}</div>
          <div v-if="tab === 'old' && status.testament" class="stat">
              <div class="grid grid-cols-10 gap-x-3 gap-y-1">
                  <div class="indicator" v-for="(verse, index) in status.verseStatus">
                      <button class="btn btn-xs">{{ index + 1 }}</button>
                  </div>
              </div>
          </div>
          <div v-if="tab === 'new' && !status.testament" class="stat">{{ status.bookName }}</div>
          <div v-if="tab === 'new' && !status.testament" class="stat">
              <div class="grid grid-cols-10 gap-3">
                  <div class="indicator" v-for="(verse, index) in status.verseStatus">
                      <!--                  <span class="indicator-item badge badge-xs badge-ghost">{{ verse }}</span>-->
                      <button :class="`btn btn-xs ${verse > 0 ? 'btn-primary' : ''}`">{{ index + 1 }}</button>
                  </div>
              </div>
          </div>
      </div>
  </div>
</template>
<script setup>
import {api} from "~/composables/api";
import {ref} from "vue";

const tab = ref('Main')
const planId = ref('')
const route = useRoute()
planId.value = route.query.planId
const planInfo = ref({})
const getPlan = async () => {
    try {
        const { data } = await api.get(`/api/plan/${planId.value}`)
        console.log(data)
        planInfo.value = data
    } catch (error) {
        console.log(error)
    }
}
const changeTab = (value) => {
    tab.value = value
}
getPlan()
</script>