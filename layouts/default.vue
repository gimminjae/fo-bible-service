<template>
    <div>
        <LayoutHeader/>
        <NuxtPage class="pb-20"/>
        <LayoutFooter/>
    </div>
</template>
<script setup>
import {api} from "~/composables/api";

api.getMe()
</script>