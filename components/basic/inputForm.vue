<template>
    <div>
        <input type="text" placeholder="Type here" class="input input-bordered input-sm w-full max-w-xs"
            v-model="modelValue" @input="inputEvent($event)" />
    </div>
</template>
<script setup>
const props = defineProps({
    modelValue: {
     type: String,
     default: ''
   }
})
const emits = defineEmits(['update:modelValue'])

const inputEvent = (ev) => {
    emit('update:modelValue', ev.target.value)
}
</script>