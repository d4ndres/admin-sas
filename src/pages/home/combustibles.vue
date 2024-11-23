<script setup>
const route = useRoute()
const router = useRouter()

watch(() => route.name, (to) => {
  if (to === 'home-combustibles') {
    return router.push({ name: 'home-combustibles-inventario' })
  }
}, {
  immediate: true
})


</script>

<template>
  <HeaderDashboard>
    <div>
      Combustibles
    </div>
    <template #buttons>
      <NuxtLink :to="{name: 'home-combustibles-registros'}">
        <ButtonTablon class="h-full">
          Registros
          <Icon name="history"/>
        </ButtonTablon>
      </NuxtLink>
      <NuxtLink :to="{name: 'home-combustibles-inventario'}">
        <ButtonTablon class="h-full">
          Inventario
          <Icon name="database"/>
        </ButtonTablon>
      </NuxtLink>
    </template>
  </HeaderDashboard>

  <NuxtLayout name="content">
    <NuxtPage></NuxtPage>
  </NuxtLayout>
</template>