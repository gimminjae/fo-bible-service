<template>
  <div>
    <NuxtLayout>
      <NuxtPage/>
    </NuxtLayout>
  </div>
</template>
<script setup>
const router = useRouter()
useHead({
    bodyAttrs: {
        'data-theme': 'light'
    }
})
</script>