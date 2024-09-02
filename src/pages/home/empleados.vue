<script setup>
import { useMainStore } from '~/Store/MainStore';
const store = useMainStore()
const {setEmpleados, toggleStateEmpleadosFromTable} = store
const {getEmpleadosToTable} = storeToRefs(store)

onMounted(() => {
  $fetch(`/api/empleados`)
  .then(({data}) => {
    setEmpleados(data)
  })
})

const showModal = ref(false)

const toggleEstado = (row) => {
  toggleStateEmpleadosFromTable(row)
}
</script>

<template>
  <HeaderDashboard>
    Empleados
    <template #buttons>
      <ButtonAction @click="showModal = true" >
        Nuevo registro
      </ButtonAction>
    </template>
  </HeaderDashboard>
  <NuxtLayout  name="content">
    <DataTable :data="getEmpleadosToTable" :columns="['id', 'Empleados', 'Especialidad', 'Estado']">
      <template #default="{ row, key, value }">
        <ButtonSwitch v-if="key == 'estado'" :value="value" @input="toggleEstado(row)"/>
      </template>
    </DataTable>
  </NuxtLayout>

  <OverflowAside v-model="showModal">
    <template #header>
      <h2 class="text-2xl">Nuevo empleado</h2>
    </template>

    <LogicAgregarEmpleado />

    <template #otherButtons>
      <ButtonCancel type="submit" form="agregarEmpleado">Agregar</ButtonCancel>
    </template>
  </OverflowAside>
</template>