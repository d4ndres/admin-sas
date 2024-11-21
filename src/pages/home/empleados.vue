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

const showModal = ref(false)

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



const creatingEmpleado = ref(false)
const createNewEmpleado = async (ev) => {
  const fields = Object.fromEntries(new FormData(ev.target).entries());
  
  creatingEmpleado.value = true
  await create(fields)
  creatingEmpleado.value = false
  ev.target.reset()
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
        <ButtonTablon @click="showModal = true">
          Crear
          <Icon name="add" />
        </ButtonTablon>
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

  <OverflowAside v-model="showModal">
    <template #header>
      <h2 class="text-2xl">Crear empleado</h2>
    </template>

    <!-- <LogicAgregarEmpleado /> -->

    <form @submit.prevent="createNewEmpleado">
      <FormInputWrapper for="nombre" label="Nombre">
        <FormInput name="nombre" id="nombre" autocomplete="off" />
      </FormInputWrapper>
      <FormInputWrapper for="especialidad" label="Especialidad">
        <FormInput name="especialidad" id="especialidad" autocomplete="off"/>
      </FormInputWrapper>
      <button>
        <ButtonTablon class="flex justify-center items-center text-lg py-1 w-min min-w-28 min-h-10">
          <span v-show="!creatingEmpleado">
            Crear
          </span>
          <Icon v-show="creatingEmpleado" name="loader"/>
        </ButtonTablon>
      </button>

    </form>
  </OverflowAside>
</template>