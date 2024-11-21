<script setup>
import {dateNow} from '~/hooks/useTime'

import { useEmpleadosStore } from '~/Store/Empleados'
import { useActividadesStore } from '~/Store/Actividades'
import { useLotesStore } from '~/Store/Lotes'
import { useSemillasStore } from '~/Store/Semillas'


const empleadosStore = useEmpleadosStore()
const { empleados } = storeToRefs(empleadosStore)

const actividadesStore = useActividadesStore()
const { actividades } = storeToRefs(actividadesStore)

const lotesStore = useLotesStore()
const { lotes } = storeToRefs(lotesStore)

const semillasStore = useSemillasStore()
const { semillas } = storeToRefs(semillasStore)



const mappedEmpleados = computed(() => {
  return empleados.value.map( item => ({ label: item.nombre, value: item.id}))
})
const mappedActividades = computed(() => {
  return actividades.value.map( item => ({ label: item.nombre, value: item.id}))
})
const mappedLotes = computed(() => {
  return lotes.value.map( item => ({ label: item.nombre, value: item.id}))
})
const mappedSemillas = computed(() => {
  return semillas.value.map( item => ({ label: item.nombre, value: item.id}))
})


const inputActividad = ref(null)
const selectedActividad = ( data ) => {
  inputActividad.value = data.label
}

const horasExtrasAntes = ref(false)
const horasExtrasDespues = ref(false)

const sending = ref(false)
const submitAddActividad = () => {
  console.log('Comunicarse con el PM')
}

</script>


<template>
  <OverflowAside2>
    <template #header>
      <h2 class="text-2xl">Registrar tarea</h2>
    </template>
    <form @submit.prevent="submitAddActividad" id="IngresoDeActividades">

      <div class="grid gap-x-4">
        <FormInputWrapper label="Trabajador" for="empleado_id">
          <FormInput :disabled="sending" required id="empleado_id" name="empleado_id" type="select" :options="mappedEmpleados" />
        </FormInputWrapper>
        <FormInputWrapper label="Fecha" for="fecha">
          <FormInput :disabled="sending" required id="fecha" name="fecha" type="date" :value="dateNow()" />
        </FormInputWrapper>
        <FormInputWrapper label="Actividad" for="actividad_id">
          <FormInput :disabled="sending" required id="actividad_id" name="actividad_id" type="select" :options="mappedActividades" @changeObject="selectedActividad" />
        </FormInputWrapper>
        <Transition name="appear">
          <FormInputWrapper v-if="inputActividad === 'siembra'" label="Semilla" for="semilla_id">
            <FormInput :disabled="sending" required id="semilla_id" name="semilla_id" type="select":options="mappedLotes" />
          </FormInputWrapper>
        </Transition>
        <FormInputWrapper label="Lote" for="lote_id">
          <FormInput :disabled="sending" required id="lote_id" name="lote_id" type="select" :options="mappedSemillas" />
        </FormInputWrapper>
      </div>

      <div>
        <FormInputWrapper class="!flex-row !mb-1">
          <FormInputWrapper label="Horas extras antes" for="horasExtrasAntes" class="!flex-row-reverse !mb-1">
            <FormInput @change="($event) => horasExtrasAntes = $event.target.checked" :checked="horasExtrasAntes"
              type="checkbox" id="horasExtrasAntes" name="horasExtrasAntes" />
          </FormInputWrapper>
        </FormInputWrapper>

        <div class="grid grid-cols-2 gap-4">
          <Transition name="appear">
            <FormInputWrapper v-if="horasExtrasAntes" label="Hora inicio" for="horaInicioAntes">
              <FormInput required :disabled="sending" type="time" id="horaInicioAntes" name="horaInicioAntes" />
            </FormInputWrapper>
          </Transition>
          <Transition name="appear">
            <FormInputWrapper v-if="horasExtrasAntes" label="Hora final" for="horaFinalAntes">
              <FormInput required :disabled="sending" type="time" id="horaFinalAntes" name="horaFinalAntes" />
            </FormInputWrapper>
          </Transition>
        </div>

      </div>

      <div>
        <FormInputWrapper class="!flex-row !mb-1">
          <FormInputWrapper label="Horas extras después" for="horasExtrasDespues" class="!flex-row-reverse !mb-1">
            <FormInput @change="($event) => horasExtrasDespues = $event.target.checked" :checked="horasExtrasDespues"
              type="checkbox" id="horasExtrasDespues" name="horasExtrasDespues" />
          </FormInputWrapper>
        </FormInputWrapper>
        <div class="grid grid-cols-2 gap-4">
          <Transition name="appear">
            <FormInputWrapper v-if="horasExtrasDespues" label="Hora inicio" for="horaInicioDespues">
              <FormInput required :disabled="sending" type="time" id="horaInicioDespues" name="horaInicioDespues" />
            </FormInputWrapper>
          </Transition>
          <Transition name="appear">
            <FormInputWrapper v-if="horasExtrasDespues" label="Hora final" for="horaFinalDespues">
              <FormInput required :disabled="sending" type="time" id="horaFinalDespues" name="horaFinalDespues" />
            </FormInputWrapper>
          </Transition>
        </div>
      </div>

      <button>
        <ButtonTablon class="flex justify-center items-center text-lg py-1 w-min min-w-28 min-h-10">
          <span v-show="!sending">
            Registrar
          </span>
          <Icon v-show="sending" name="loader"/>
        </ButtonTablon>
      </button>


    </form>
  </OverflowAside2>
</template>

<style scoped>
.appear-enter-active {
  animation: appear .25s linear;
}
.appear-leave-active {
  animation: appear .25s linear reverse
}

@keyframes appear {
  from {
    opacity: 0;
    scale: 0.5;
  }
  to {
    opacity: 1;
    scale: 1;
  }
}
</style>