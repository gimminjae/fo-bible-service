<template>
    <div>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
        <LayoutHeader/>
        <NuxtPage class="pb-20"/>
        <LayoutFooter/>
    </div>
</template>
<script setup>
import {api} from "~/composables/api";
import toastAlert from "~/composables/toast";

api.getMe()

const message = ref('')
const route = useRoute()
message.value = route.query.message
console.log(message.value)
toastAlert.success(message.value)
if (!message.value === null) {
    console.log(message.value)
}
</script>