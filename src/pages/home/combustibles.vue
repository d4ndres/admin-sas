<script setup>
const route = useRoute()
const router = useRouter()

// watch(() => route.name, (to) => {
//   if (to === 'home-combustibles') {
//     return router.push({ name: 'home-combustibles-inventario' })
//   }
// }, {
//   immediate: true
// })


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
    <div class="grid grid-cols-2 gap-2" v-show="route.name === 'home-combustibles'">
      <NuxtLink :to="{name: 'home-combustibles-registros'}">
        <Card class="w-full hover:bg-color_bg_active hover:text--color-text-active">
          <template #header>
            <Icon name="history" width="20" height="20"/> Registros 
          </template>
        </Card>
      </NuxtLink>
      <NuxtLink :to="{name: 'home-combustibles-inventario'}">
        <Card class="w-full hover:bg-color_bg_active hover:text--color-text-active">
          <template #header>
            <Icon name="database" width="20" height="20"/> Inventario 
          </template>
        </Card>
      </NuxtLink>
    </div>
    <NuxtPage></NuxtPage>
  </NuxtLayout>
</template>