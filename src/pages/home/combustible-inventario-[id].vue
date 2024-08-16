<script setup>
import { useMainStore } from '~/Store/MainStore';
const store = useMainStore()
const {pushElementToCombustiblesHistorial, showCombustiblesHistorialToTable} = store

const route = useRoute()
const combustible_id = computed(() => route.params.id)

onMounted(() => {
  $fetch(`/api/combustiblesInventario/${combustible_id.value}`)
  .then(({data}) => {
    pushElementToCombustiblesHistorial(data)
  })
})


console.log(combustible_id)

</script>


<template>
  <HeaderDashboard>
    Combustibles Historial
  </HeaderDashboard>

  <NuxtLayout  name="content">
    <DataTable :data="showCombustiblesHistorialToTable(combustible_id)" />
  </NuxtLayout>
</template>