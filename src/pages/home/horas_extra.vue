<script setup>
import {formatter} from '~/hooks/useTime'
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

const columns = [
  { bindKey: 'id', text: 'Id' },
  { bindKey: 'fecha', text: 'Fecha', autoValue: ({row}) => formatter(row.fecha)},
  { bindKey: 'empleado', text: 'Empleado' },
  { bindKey: 'actividad', text: 'Actividad' },
  { bindKey: 'horaInicio', text: 'Hora inicio' },
  { bindKey: 'horaSalida', text: 'Hora salida' },
]


</script>


<template>
  <HeaderDashboard>
    Horas extra
  </HeaderDashboard>
  <NuxtLayout  name="content">
    <WrapperTablon :data="showHorasExtraToTable" :columns="columns" >
      <template #default="{ data, columns, searchFilter }">
        <Tablon :data="data" :columns="columns" :searchFilter="searchFilter"></Tablon>
      </template>
    </WrapperTablon>
  </NuxtLayout>
</template>