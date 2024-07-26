<script setup >



defineProps({
  dataItem: {
    type: Object,
    required: true
  },
  isExpanded: {
    type: Boolean,
    default: true
  }
})


</script>

<template>
  <NuxtLink :to="dataItem.path" class="h-12 flex items-center hover:bg-green_light dark:hover:bg-green cursor-pointer">
    <li class="px-4 list-none flex gap-1 items-center">
      <Icon size="18" :name="dataItem.icon" />
      <span v-show="isExpanded">{{ dataItem.text }}</span>
    </li>
  </NuxtLink>
</template>