<script setup >

definePageMeta({
  middleware: 'authenticated'
})

</script>

<template>
  <NuxtLayout>
    <NuxtPage></NuxtPage>
  </NuxtLayout>
</template>