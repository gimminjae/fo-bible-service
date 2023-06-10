<template>
    <div>
        <input type="text" placeholder="Type here" class="input input-bordered input-sm w-full max-w-xs"
            :value="modelValue" @input="inputEvent($event)" />
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
    emits('update:modelValue', ev.target.value)
}
</script>