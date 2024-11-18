<script setup>
import { useMainStore } from '~/Store/MainStore';
const store = useMainStore()
const { setEmpleados, toggleStateEmpleadosFromTable } = store
const { getEmpleadosToTable } = storeToRefs(store)

onMounted(() => {
  $fetch(`/api/empleados`)
    .then(({ data }) => {
      setEmpleados(data)
    })
})

const columns = [
  { bindKey: 'id', text: 'Id' },
  { bindKey: 'nombre', text: 'Nombre' },
  { bindKey: 'especialidad', text: 'Especialidad' },
  { bindKey: 'estado', text: 'Estado' },
  { autoValue: () => null, text: 'Controller' }
]


const showModal = ref(false)

const toggleEstado = (row) => {
  toggleStateEmpleadosFromTable(row)
}

const rowsSelected = ref([])

</script>

<template>
  <HeaderDashboard>
    Empleados
  </HeaderDashboard>
  <NuxtLayout name="content">
    <WrapperTablon :data="getEmpleadosToTable" :columns="columns">
      <template #customControllers>
        <ButtonTablon :state="rowsSelected.length ? '' : 'disabled'">
          Eliminar
          <Icon name="trash" />
        </ButtonTablon>
        <ButtonTablon @click="showModal = true">
          Crear
          <Icon name="add" />
        </ButtonTablon>
      </template>
      <template #default="{ searchFilter, data, columns }">
        <Tablon :data="data" :columns="columns" :searchFilter="searchFilter" v-model="rowsSelected">
          <template #default="{ bindKey, value, row }">
            <StateIndicator v-if="bindKey == 'estado'" :state="value == true ? 'success' : 'danger'">
              {{ value ? 'Activo' : 'Inactivo' }}
            </StateIndicator>
            <ButtonState v-if="bindKey == 'Controller'" :value="row.estado" @input="toggleEstado(row)" />
          </template>
        </Tablon>
      </template>
    </WrapperTablon>

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