<template>
    <div>
        <input type="text" :placeholder="placeholder" class="input input-primary input-sm w-full max-w-xs"
            :value="modelValue" @input="inputEvent($event)" />
    </div>
</template>
<script setup>
const props = defineProps({
    modelValue: {
     type: String,
     default: ''
   },
   placeholder: {
    type: String, 
    default: ''
   }
})
const emits = defineEmits(['update:modelValue'])

const inputEvent = (ev) => {
    emits('update:modelValue', ev.target.value)
}
</script>