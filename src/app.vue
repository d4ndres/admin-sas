<script setup>
onBeforeMount( () => {
  const darkMode = localStorage.getItem('darkMode')
  if (darkMode === 'true') {
    document.documentElement.classList.add('dark')
  }
})
</script>

<template>
  <div class="transition-all duration-0">
    <NuxtPage />
  </div>
</template>
