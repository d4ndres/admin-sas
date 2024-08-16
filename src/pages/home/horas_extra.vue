<script setup>
import { useMainStore } from '~/Store/MainStore';
const store = useMainStore()
const {setHorasExtra} = store
const {showHorasExtraToTable} = storeToRefs(store)

onMounted(() => {
  $fetch('/api/empleadosHorasExtra')
  .then( ({data}) => {
    setHorasExtra(data)
  })
})



</script>


<template>
  <HeaderDashboard>
    Horas extra
  </HeaderDashboard>
  <NuxtLayout  name="content">
    <DataTable :data="showHorasExtraToTable" />
  </NuxtLayout>
</template>