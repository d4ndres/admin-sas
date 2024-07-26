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
    <div @mousedown.stop class="bg-white dark:bg-dark z-50 bg-overlay flex flex-col fixed inset-y-0 h-full lg:h-screen border-l dark:border-gray_dark border-overlay shadow-xl  w-screen max-w-2xl  right-0 data-open:animate-panel-slide-right-out transition-all duration-100 ease-in">
      <div class="flex items-center h-14 border-b dark:border-gray_dark">
        <slot name="header"></slot>
      </div>
      <div class="flex-1 h-14 border-b dark:border-gray_dark overflow-auto">
        <slot></slot>
      </div>
      <div class="flex items-center flex-row-reverse h-14 px-4">
        <slot name="footer">
          <slot name="button-confirmation"></slot>
          <ButtonCancel @click="updateData"/>
        </slot>
      </div>
    </div>
  </div>
</template>