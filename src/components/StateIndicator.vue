<script setup>
defineProps({
  state: {
    type: String
  }
})
</script>

<template>
  <div 
  :class="{
    'border-red-500 bg-red-200 text-red-800': state === 'danger',
    'border-green-500 bg-green-200 text-green-800': state === 'success'
  }"
  class="border w-min px-2 rounded-lg text-sm">
    <slot/>
  </div>
</template>