<script setup>

const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])


const updateData = () => {
  emit('update:modelValue', !props.modelValue)
}

const closeAside = () => {
  emit('update:modelValue', false)
}


</script>

<template>
<!-- 
class="bg-background_alt/10 backdrop-blur-sm fixed h-full w-full left-0 top-0 z-50">
    <div @mousedown.stop 
    class="bg-background_body fixed h-full z-50 right-0 w-screen md:w-1/2 shadow-2xl shadow-black
    flex flex-col border border-border border-x-0 border-y-2 p-4
-->

<div v-if="props.modelValue" @mousedown="closeAside" class="bg-background_alt/10 backdrop-blur-sm fixed h-full w-full left-0 top-0 z-50">
    <div @mousedown.stop class="move bg-background_body fixed h-full z-50 right-0 w-screen md:w-1/2 shadow-2xl shadow-black
    flex flex-col border border-border border-x-0 border-y-2">
      <div class="px-4 flex items-center h-14 border-b dark:border-gray_dark">
        <slot name="header"></slot>
      </div>
      <div class="p-4 flex-1 h-14 border-b dark:border-gray_dark overflow-auto">
        <slot></slot>
      </div>
      <div class="flex items-center flex-row-reverse h-14 px-4">
        <slot name="footer">
          <slot name="otherButtons"></slot>
          <ButtonCancel @click="updateData"/>
        </slot>
      </div>
    </div>
  </div>
</template>

<style scoped>
.move {
  animation: move linear 0.2s;
}

@keyframes move {
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
}

</style>