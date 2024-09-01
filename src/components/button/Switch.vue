<script setup>
const props = defineProps(['modelValue', 'value'])
const emit = defineEmits(['update:modelValue', 'input'])

const input = () => {
  emit('update:modelValue', !props.modelValue)
  emit('input', !props.modelValue)
}

</script>


<template>
  <div @click="input" :class="{ 'bg-success' : props.value }" class="transition-colors duration-100 relative shadow-[0_0_1px_1px] shadow-border w-10 h-5 rounded-full cursor-pointer">
    <div :class="{ 'left-[calc(100%_-_1.25rem)]' : props.value}" class="transition-all duration-100 absolute left-0 bg-text_muted h-5 w-5 rounded-full">

    </div>
  </div>
</template>