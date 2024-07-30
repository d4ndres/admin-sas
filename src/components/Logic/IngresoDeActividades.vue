<script setup>
import { useMainStore } from '~/Store/MainStore';
const store = useMainStore()
const {
  setEmpleados, 
  getEmpleadosToSelect, 
  setActividades, 
  getActividadesToSelect, 
  setLotes, 
  getLotesToSelect, 
  setSemillas, 
  getSemillasToSelect,
  pushElementToHistorialDeActividades
} = store


onMounted( () => {
  $fetch('/api/empleados')
  .then( ({trabajadores}) => {
    setEmpleados(trabajadores)
  })

  $fetch('/api/actividades')
  .then( (actividades) => {
    setActividades(actividades)
  })

  $fetch('/api/lotes')
  .then( (lotes) => {
    setLotes(lotes)
  })

  $fetch('/api/semillas')
  .then( (semillas) => {
    setSemillas(semillas)
  })
})

const dateNow = () => (new Date()).toISOString().split('T')[0];
let horasExtrasAntes = ref(false)
let horasExtrasDespues = ref(false)
let observerActivity = ref(null)
let sending = ref(false)


const submitAddActividad = (ev) => {
  const fields = Object.fromEntries(new FormData(ev.target).entries())

  const actividad = {
    empleado_id: fields.empleado_id,
    fecha: fields.fecha,
    actividad_id: fields.actividad_id,
    lote_id: fields.lote_id,
    semilla_id: fields.semilla_id
  }

  sending.value = true
  $fetch('/api/actividadesRealizadas', {
    method: 'POST',
    body: JSON.stringify(actividad)
  })
  .then( (ev) => {
    if( ev.error ) {
      throw new Error(ev.error)
    }
    return new Promise( (resolve) => {
      resolve(ev.data[0])
    })
  })
  .then( data => {
    const horasExtras = []


    if( horasExtrasAntes.value ) {
      horasExtras.push({
        empleado_id: data.empleado_id,
        actividadRealizada_id: data.id,
        horaInicio: fields.horaInicioAntes,
        horaSalida: fields.horaFinalAntes
      })
    }

    if( horasExtrasDespues.value ) {
      horasExtras.push({
        empleado_id: data.empleado_id,
        actividadRealizada_id: data.id,
        horaInicio: fields.horaInicioDespues,
        horaSalida: fields.horaFinalDespues
      })
    }

    if( horasExtras.length ) {
      return $fetch('/api/empleadosHorasExtra', {
        method: 'post',
        body: horasExtras
      })
    }

    console.log(data)

    pushElementToHistorialDeActividades(data)

    return new Promise( (resolve) => {
      resolve({
        error: null,
        data: null
      })
    })
  })
  .then( (ev) => {
    console.log('Actividad agregada')

    if( ev && ev.error ) {
      throw new Error(ev.error)
    }
    if( ev.data ){
      console.log('Horas extras agregadas')
    }
  })
  .catch( (error) => {
    console.error(error)
  })
  .finally( () => {
    sending.value = false
    ev.target.reset()
    observerActivity.value = null
  })

}


</script>

<template>
  <form @submit.prevent="submitAddActividad" id="IngresoDeActividades">
    <div class="grid gap-x-4">
      <FormInputWrapper label="Trabajador" for="empleado_id">
        <FormInput required :disabled="sending" id="empleado_id" name="empleado_id" type="select" :options="getEmpleadosToSelect()" />
      </FormInputWrapper>
      <FormInputWrapper label="Fecha" for="fecha">
        <FormInput required :disabled="sending" id="fecha" name="fecha" type="date" :value="dateNow()" />
      </FormInputWrapper>
      <FormInputWrapper label="Actividad" for="actividad_id">
        <FormInput required :disabled="sending" id="actividad_id" name="actividad_id" type="select" v-model="observerActivity" :options="getActividadesToSelect()" />
      </FormInputWrapper>
      <Transition name="appear">
        <FormInputWrapper v-if="observerActivity == 10" label="Semilla" for="semilla_id">
          <FormInput required :disabled="sending" id="semilla_id" name="semilla_id" type="select" :options="getSemillasToSelect()" />
        </FormInputWrapper>
      </Transition>
      <FormInputWrapper label="Lote" for="lote_id">
        <FormInput required :disabled="sending" id="lote_id" name="lote_id" type="select" :options="getLotesToSelect()" />
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


  </form>
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
