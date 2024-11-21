<script setup>
import { useEmpleadosStore } from '~/Store/Empleados'
const storeEmpleados = useEmpleadosStore()
const { create, remove, toggleOnActive } = storeEmpleados
const { empleados } = storeToRefs(storeEmpleados)

const columns = [
  { bindKey: 'id', text: 'Id' },
  { bindKey: 'nombre', text: 'Nombre' },
  { bindKey: 'especialidad', text: 'Especialidad' },
  { bindKey: 'isActive', text: 'Estado' },
  { autoValue: () => null, text: 'Controller' }
]

const loaderOnToggle = ref(false)
const toggleEstado = async (row) => {
  if( loaderOnToggle.value ) return

  loaderOnToggle.value = true
  await toggleOnActive(row)
  loaderOnToggle.value = false
}

const rowsSelected = ref([])
const loaderRemove = ref(false)
const toDelete = async () => {
  loaderRemove.value = true 
  await remove(rowsSelected.value.map( item => item.id ))
  loaderRemove.value = false
}




</script>

<template>
  <HeaderDashboard>
    Empleados
  </HeaderDashboard>
  <NuxtLayout name="content">
    <WrapperTablon :data="empleados" :columns="columns">
      <template #customControllers>
        <ButtonTablon :state="rowsSelected.length ? '' : 'disabled'" @click="toDelete">
          Eliminar
          <Icon :name="loaderRemove ? 'loader' : 'trash'" />

        </ButtonTablon>
        <NuxtLink :to="{ name: 'home-empleados-crear'}" >
          <ButtonTablon class="h-full">
            Crear
            <Icon name="add" />
          </ButtonTablon>
        </NuxtLink>
      </template>
      <template #default="{ searchFilter, data, columns }">
        <Tablon :data="data" :columns="columns" :searchFilter="searchFilter" v-model="rowsSelected">
          <template #default="{ bindKey, value, row }">
            <StateIndicator v-if="bindKey == 'isActive'" :state="value == true ? 'success' : 'danger'">
              {{ value ? 'Activo' : 'Inactivo' }}
            </StateIndicator>
            <ButtonState v-if="bindKey == 'Controller'" :value="row.isActive" @input="toggleEstado(row)" />
          </template>
        </Tablon>
      </template>
    </WrapperTablon>
  </NuxtLayout>

  <NuxtPage></NuxtPage>
</template>