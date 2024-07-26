<script setup>

const route = useRoute()
const breadcrumb = computed(() => route.fullPath.split('/').map((crumb, index) => {
  return {
    text: crumb === 'home' ? 'Panel de control' : crumb,
    name: crumb,
    path: route.fullPath.split('/').slice(0, index + 1).join('/')
  }
}))
</script>
<template>
  <ul class="breadcrumb flex gap-0 text-sm px-2">
    <li v-for="(crumb, index) in breadcrumb" :key="'breadcrumb' + crumb" :class="{ 'text-gray': index != 1 }"
      class="hover:green_light">
      <NuxtLink :to="crumb.path">{{ crumb.text }}</NuxtLink>
    </li>
  </ul>
</template>

<style scoped>
.breadcrumb > *:not(:last-child):not(:first-child)::after {
  content: '/';
  margin: 0 .5rem;
}
</style>
