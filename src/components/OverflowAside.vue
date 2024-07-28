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
  <div v-if="props.modelValue" @mousedown="closeAside" class="bg-dark_opacity z-50 fixed bg-alternative h-full w-full left-0 top-0">
    <div @mousedown.stop class="move bg-vainilla dark:bg-dark z-50 bg-overlay flex flex-col fixed inset-y-0 h-full lg:h-screen border-l dark:border-gray_dark border-overlay shadow-xl  w-screen max-w-2xl  right-0 ">
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