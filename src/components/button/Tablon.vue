<script setup>
defineProps({
  state: {
    type: String
  }
})


</script>

<template>
  <div 
  class="border border-color_border flex items-center rounded-md px-2 gap-2"
  :class="{
    'text-gray-500 cursor-default': state === 'disabled',
    'cursor-pointer': state !== 'disabled'
  }" >
    <slot />
  </div>
</template>