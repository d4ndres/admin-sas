<script setup>
import {formatter} from '~/hooks/useTime'

import { useEmpleadosStore } from '~/Store/Empleados'
const empleadosStore = useEmpleadosStore()
const {horasExtra} = storeToRefs(empleadosStore)

onMounted( async () => {
  await empleadosStore.initHorasExtra()
})

const columns = [
  { bindKey: 'id', text: 'Id' },
  { bindKey: 'EmpleadoActividadRealizada.fecha', text: 'Fecha', autoValue: ({row}) => formatter(row.EmpleadoActividadRealizada.fecha)},
  { bindKey: 'Empleado.nombre', text: 'Empleado' },
  { bindKey: 'EmpleadoActividadRealizada.Actividad.nombre', text: 'Actividad' },
  { bindKey: 'horaInicio', text: 'Hora inicio' },
  { bindKey: 'horaSalida', text: 'Hora salida' },
]


</script>


<template>
  <HeaderDashboard>
    Horas extra
  </HeaderDashboard>
  <NuxtLayout  name="content" >
    <WrapperTablon :data="horasExtra" :columns="columns">
      <template #default="{ data, columns, searchFilter }">
        <Tablon :data="data" :columns="columns" :searchFilter="searchFilter"></Tablon>
      </template>
    </WrapperTablon>
  </NuxtLayout>
</template>