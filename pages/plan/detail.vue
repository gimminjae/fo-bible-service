<template>
  <div>
      plan detail page

      planId: {{ planId }}

      planInfo: {{ planInfo }}
  </div>
</template>
<script setup>
import {api} from "~/composables/api";
import {ref} from "vue";

const planId = ref('')
const route = useRoute()
planId.value = route.query.planId
const planInfo = ref({})
const getPlan = async () => {
    try {
        planInfo.value = await api.get(`/api/plan/${planId.value}`)
    } catch (error) {
        console.log(error)
    }
}
getPlan()
</script>