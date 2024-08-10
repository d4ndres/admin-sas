<script setup >
import { useSession } from '~/Store/Session';
const storeSession = useSession()


definePageMeta({
  middleware: 'authenticated'
})

onMounted(() => {
  const user = JSON.parse(localStorage.getItem('user'))
  storeSession.setUser(user)
})

</script>

<template>
  <NuxtLayout>
    <NuxtPage></NuxtPage>
  </NuxtLayout>
</template>