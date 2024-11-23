<script setup>
import { dateNow } from '~/hooks/useTime'
import { useEmpleadosStore } from '~/Store/Empleados'
import { useActividadesStore } from '~/Store/Actividades'
import { useLotesStore } from '~/Store/Lotes'
import { useCombustiblesStore } from '~/Store/Combustibles'
import { useVehiculosStore } from '~/Store/Vehiculo'


const empleadosStore = useEmpleadosStore()
const { empleados } = storeToRefs(empleadosStore)

const actividadesStore = useActividadesStore()
const { actividades } = storeToRefs(actividadesStore)

const lotesStore = useLotesStore()
const { lotes } = storeToRefs(lotesStore)

const combustibleStore = useCombustiblesStore()
const { combustibles } = storeToRefs(combustibleStore)

const vehiculoStore = useVehiculosStore()
const { vehiculos } = storeToRefs(vehiculoStore)


const loader = ref(false)
const submitSalidaCombustible = async (ev) => {
  const target = ev.target
  const fields = Object.fromEntries(new FormData(target).entries())

  loader.value = true
  await combustibleStore.gastoCombustible(fields)
  loader.value = false
  target.reset()
}

</script>





<template>
  <OverflowAside2>
    <template #header>
      <h2 class="text-2xl">Gasto de combustible</h2>
    </template>
    <form @submit.prevent="submitSalidaCombustible">
      <FormInputWrapper label="Fecha" for="fecha">
        <FormInput required id="fecha" name="fecha" type="date" :value="dateNow()" />
      </FormInputWrapper>
      <FormInputWrapper label="Combustible" for="combustible_id">
        <FormInput required id="combustible_id" name="combustible_id" type="select" :options="combustibles"
          setElementOptionLabel="nombre" setElementOptionValue="id" />
      </FormInputWrapper>
      <FormInputWrapper label="Vehículo" for="vehiculo_id">
        <FormInput required id="vehiculo_id" name="vehiculo_id" type="select" :options="vehiculos"
          setElementOptionLabel="nombre" setElementOptionValue="id" />
      </FormInputWrapper>
      <FormInputWrapper label="Cantidad depositada" for="cantidadDeCombustibleDepositada">
        <FormInput required id="cantidadDeCombustibleDepositada" name="cantidadDeCombustibleDepositada" type="number" />
      </FormInputWrapper>
      <FormInputWrapper label="Empleado" for="empleado_id">
        <FormInput required id="empleado_id" name="empleado_id" type="select" :options="empleados"
          setElementOptionLabel="nombre" setElementOptionValue="id" />
      </FormInputWrapper>
      <FormInputWrapper label="Actividad" for="actividad_id">
        <FormInput required id="actividad_id" name="actividad_id" type="select" :options="actividades"
          setElementOptionLabel="nombre" setElementOptionValue="id" />
      </FormInputWrapper>
      <FormInputWrapper label="Lote" for="lote_id">
        <FormInput required id="lote_id" name="lote_id" type="select" :options="lotes" setElementOptionLabel="nombre"
          setElementOptionValue="id" />
      </FormInputWrapper>


      <button>
        <ButtonTablon class="flex justify-center items-center text-lg py-1 w-min min-w-28 min-h-10">
          <span v-show="!loader">
            Registrar
          </span>
          <Icon v-show="loader" name="loader" />
        </ButtonTablon>
      </button>
    </form>
  </OverflowAside2>
</template>