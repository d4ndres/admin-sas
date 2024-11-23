<script setup>
import { dateNow } from '~/hooks/useTime'

import { useTaskStore } from '~/Store/Task';
const taskStore = useTaskStore()


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


const inputActividad = ref(null)
const selectedActividad = (data) => {
  inputActividad.value = data.label
}

const horasExtra = ref([])
const agregarHorasExtra = () => horasExtra.value.push({ horaInicio: null, horaSalida: null })
const removeHoraExtra = (index) => horasExtra.value.splice(index,1)
const focusOnInput = (ev) => {
  const $el = ev.target.parentNode.parentNode.parentNode;
  const inputs = $el.querySelectorAll('input[type="time"]')
  for (const input of inputs) {
    if (!input.value) { 
      input.focus(); 
      break; 
    }
  }
}



const loader = ref(false)
const submitAddActividad = async (ev) => {
  const target = ev.target
  const fields = Object.fromEntries(new FormData(target).entries())
  const data = { ...fields }
  if(horasExtra.value.length ) {
    data['horasExtra'] = horasExtra.value.filter( item => item.horaInicio && item.horaSalida )
  }


  loader.value = true
  await taskStore.registrarTask(data)
  loader.value = false
}

</script>


<template>
  <OverflowAside2>
    <template #header>
      <h2 class="text-2xl">Registrar tarea</h2>
    </template>
    <form @submit.prevent="submitAddActividad" id="IngresoDeActividades">

      <div class="grid gap-x-4">
        <FormInputWrapper label="Fecha" for="fecha">
          <FormInput :disabled="loader" required id="fecha" name="fecha" type="date" :value="dateNow()" />
        </FormInputWrapper>
        <FormInputWrapper label="Actividad" for="actividad_id">
          <FormInput :disabled="loader" required id="actividad_id" name="actividad_id" type="select"
            :options="actividades" @changeObject="selectedActividad" setElementOptionLabel="nombre"
            setElementOptionValue="id" />
        </FormInputWrapper>
        <Transition name="appear">
          <FormInputWrapper v-if="inputActividad === 'siembra'" label="Semilla" for="semilla_id">
            <FormInput :disabled="loader" required id="semilla_id" name="semilla_id" type="select" :options="semillas"
              setElementOptionLabel="nombre" setElementOptionValue="id" />
          </FormInputWrapper>
        </Transition>
        <FormInputWrapper label="Lote" for="lote_id">
          <FormInput :disabled="loader" required id="lote_id" name="lote_id" type="select" :options="lotes"
            setElementOptionLabel="nombre" setElementOptionValue="id" />
        </FormInputWrapper>
        <FormInputWrapper label="Trabajador" for="empleado_id">
          <FormInput :disabled="loader" required id="empleado_id" name="empleado_id" type="select" :options="empleados"
            setElementOptionLabel="nombre" setElementOptionValue="id" />
        </FormInputWrapper>
      </div>

      <div class="my-2 bg-color_bg p-2">

        <table v-if="horasExtra.length"
          class="w-full border border-color_border [&_*>tr>*]:border-y [&_*>tr>*]:border-y-color_border  mb-2">
          <thead>
            <tr>
              <th>#</th>
              <th>
                Hora de inicio
              </th>
              <th>
                Hora de terminado
              </th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(_, index) in horasExtra" :key="`horas_extra_${index}`" class="text-center">
              <td class="text-center" @click="focusOnInput">
                <div class="flex justify-center">
                  <Icon name="clock" class="h-full text-center" />
                </div>
              </td>
              <td><input type="time" class="bg-transparent w-full px-2 " v-model="horasExtra[index]['horaInicio']"></td>
              <td><input type="time" class="bg-transparent w-full px-2" v-model="horasExtra[index]['horaSalida']"></td>
              <td @click="removeHoraExtra(index)"  class="text-center cursor-pointer hover:bg-red-300  border border-color_border hover:border-red-500 duration-300">
                <div class="flex justify-center " >
                  <Icon name="trash"/>
                </div>
              </td>
            </tr>
          </tbody>
        </table>


        <ButtonTablon class="w-max" @click="agregarHorasExtra">
          <Icon name="add" />
          Agregar Hora extra
        </ButtonTablon>

      </div>


      <!-- 
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
              <FormInput required :disabled="loader" type="time" id="horaInicioAntes" name="horaInicioAntes" />
            </FormInputWrapper>
          </Transition>
          <Transition name="appear">
            <FormInputWrapper v-if="horasExtrasAntes" label="Hora final" for="horaFinalAntes">
              <FormInput required :disabled="loader" type="time" id="horaFinalAntes" name="horaFinalAntes" />
            </FormInputWrapper>
          </Transition>
        </div>
      </div> -->

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