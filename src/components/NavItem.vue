<script setup >



defineProps({
  dataItem: {
    type: Object
  },
  isExpanded: {
    type: Boolean,
    default: true
  }
})


</script>

<template>
  <div class="hover:bg-button_hover/25 text-[#1d1d1d] dark:text-[#fff] h-12 flex items-center cursor-pointer">
    <li class="px-4 list-none flex gap-1 items-center">
      <slot>
        <Icon size="18" :name="dataItem.icon" />
        <span v-show="isExpanded">{{ dataItem.text }}</span>
      </slot>
    </li>
  </div>
</template>