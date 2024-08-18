<script setup>
import { useMainStore } from '~/Store/MainStore';
const store = useMainStore()
const {setEmpleados} = store
const {getEmpleadosToTable} = storeToRefs(store)



onMounted(() => {
  $fetch(`/api/empleados`)
  .then(({data}) => {
    setEmpleados(data)
  })
})

const showModal = ref(false);

const toggle = ref(false)
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
    <DataTable :data="getEmpleadosToTable">
      <template #default="{ value, key }">
        <ButtonEstate v-if="key == 'estado'" v-model="toggle"/>
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