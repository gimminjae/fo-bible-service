<template>
    <div>
        <select class="select select-primary select-sm max-w-xs" name="" id="" :value="modelValue" @change="changeData">
            <option value="">{{ defaultValue }}</option>
            <option v-for="option in options" :value="option.value">
                {{ option.text }}
            </option>
        </select>
    </div>
</template>
<script setup>
const props = defineProps({
    modelValue: {
    type: String,
    default: ''
  },
  defaultValue: {
    type: String,
    default: 'select'
  },
  options: {
    type: Array
  }
})

const emit = defineEmits(['update:modelValue'])
const changeData = (e) => {
    emit('update:modelValue', e.target.value)
}
</script>