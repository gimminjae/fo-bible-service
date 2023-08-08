<template>
  <div>
    <NuxtLayout>
      <NuxtPage/>
    </NuxtLayout>
  </div>
</template>
<script setup>
import {useRoute} from "#app";
import toastAlert from "~/composables/toast";

const message = ref('')
const route = useRoute()
message.value = route.query.message
if (!message.value === '') {
    toastAlert.success(message.value)
    console.log(message.value)
}
</script>