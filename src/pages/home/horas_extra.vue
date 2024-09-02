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
  <NuxtLayout  name="content" title="Horas extra">
    <DataTable :data="showHorasExtraToTable" />
  </NuxtLayout>
</template>