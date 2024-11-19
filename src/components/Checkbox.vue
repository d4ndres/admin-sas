<script setup>
const props = defineProps(['modelValue', 'value'])
const emit = defineEmits(['update:modelValue', 'change'])

const input = () => {
  emit('update:modelValue', !props.modelValue)
  emit('change', !props.modelValue)
}
</script>

<template>
  <div @click="input" 
  :class="{'border-green-500 bg-green-200 text-green-800': modelValue }"
  class="w-6 h-6 border border-color_border flex justify-center items-center rounded-md cursor-pointer duration-300">
    <span v-show="modelValue">✔</span>
  </div>
</template>