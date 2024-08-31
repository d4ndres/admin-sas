<script setup>
defineProps({
  for: {
    type: String,
    default: ''
  },
  label: {
    type: String,
  }
})

</script>

<template>
  <div class="flex gap-1 flex-col mb-4 w-full">
    <label :for="for" class="text-text_main">{{label}}</label>
    <slot></slot>
  </div>
</template>