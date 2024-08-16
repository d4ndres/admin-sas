<script setup>
import { useMainStore } from '~/Store/MainStore';
const store = useMainStore()

const {
  setActividades, 
  getActividadesToSelect, 
  setLotes, 
  getLotesToSelect,
  setVehiculos,
  setEmpleados, 
  updateElementInCombustibles
} = store

const {
  getCombustiblesToSelect,
  getVehiculosToSelect,
  getEmpleadosToSelect
} = storeToRefs(store)

const dateNow = () => (new Date()).toISOString().split('T')[0];

const getUserId = () => {
  const session = useSupabaseSession()
  return session.value?.user.id
}

onMounted(() => {
  $fetch('/api/vehiculos')
  .then(({data}) => {
    setVehiculos(data)
  })
  $fetch('/api/empleados')
  .then( ({data}) => {
    setEmpleados(data)
  })
  $fetch('/api/actividades')
  .then( (actividades) => {
    setActividades(actividades)
  })
  $fetch('/api/lotes')
  .then( (lotes) => {
    setLotes(lotes)
  })
})

const submitSalidaCombustible = (ev) => {
  const fields = Object.fromEntries(new FormData(ev.target).entries())
  fields.user_id = getUserId()
  console.log(fields)

  sending.value = true
  $fetch('/api/gastoDeCombustible', {
    method: 'post',
    body: fields
  })
  .then( ({dataUpdateInInventario}) => {
    updateElementInCombustibles(dataUpdateInInventario[0])
  })
  .finally(() => {
    ev.target.reset()
    sending.value = false
  })
}


const sending = ref(false)
</script>

<template>
  <form @submit.prevent="submitSalidaCombustible" id="GastosDeCombustible">
    <FormInputWrapper label="Fecha" for="fecha">
      <FormInput required :disabled="sending" id="fecha" name="fecha" type="date" :value="dateNow()" />
    </FormInputWrapper>
    <FormInputWrapper label="Vehículo" for="vehiculo_id">
      <FormInput required :disabled="sending" id="vehiculo_id" name="vehiculo_id" type="select" :options="getVehiculosToSelect"/>
    </FormInputWrapper>
    <FormInputWrapper label="Empleado" for="empleado_id">
      <FormInput required :disabled="sending" id="empleado_id" name="empleado_id" type="select" :options="getEmpleadosToSelect"/>
    </FormInputWrapper>
    <FormInputWrapper label="Actividad" for="actividad_id">
      <FormInput required :disabled="sending" id="actividad_id" name="actividad_id" type="select" :options="getActividadesToSelect()"/>
    </FormInputWrapper>
    <FormInputWrapper label="Lote" for="lote_id">
      <FormInput required :disabled="sending" id="lote_id" name="lote_id" type="select" :options="getLotesToSelect()" />
    </FormInputWrapper>
    <FormInputWrapper label="Combustible" for="combustible_id">
      <FormInput required :disabled="sending" id="combustible_id" name="combustible_id" type="select" :options="getCombustiblesToSelect" />
    </FormInputWrapper>
    <FormInputWrapper label="Cantidad depositada" for="cantidadDeCombustibleDepositada">
      <FormInput required :disabled="sending" id="cantidadDeCombustibleDepositada" name="cantidadDeCombustibleDepositada" type="number" />
    </FormInputWrapper>
  </form>
</template>