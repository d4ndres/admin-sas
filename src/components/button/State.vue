<script setup>
const props = defineProps(['modelValue', 'value'])
const emit = defineEmits(['update:modelValue', 'input'])

const input = () => {
  emit('update:modelValue', !props.modelValue)
  emit('input', !props.modelValue)
}

</script>

<template>
  <div @click="input" 
  :class="{ '!bg-transparent': !(props.value || modelValue) }"
  class="shadow-[0_0_1px_1px] shadow-gray dark:shadow-gray_dark bg-green_light dark:bg-green w-10 h-5 rounded-full relative" >
    <div class="bg-white dark:bg-gray block h-5 w-5 rounded-full absolute animation-all duration-300 left-0" :class="{ 'left-[calc(100%_-_1.25rem)]': props.value || modelValue }">
    </div>
  </div>
</template>