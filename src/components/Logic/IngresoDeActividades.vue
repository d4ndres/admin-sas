<script setup>

const mockPersonas = [
  { label: 'Carlos Armado Llanos', value: 3 },
  { label: 'Hector ortiz', value: 6 },
  { label: 'Jose', value: 4 },
  { label: 'Carlos Guzman', value: 2 },
  { label: 'Ernesto Gutiérrez', value: 1 }
]

let formData = ref({})

const submitAddActividad = (ev) => {
  const fields = Object.fromEntries(new FormData(ev.target).entries())
  formData.value = fields
  console.log(formData.value)
}

const dateNow = () => (new Date()).toISOString().split('T')[0];


let horasExtrasAntes = ref(false)
let horasExtrasDespues = ref(false)
</script>

<template>
  <form @submit.prevent="submitAddActividad" id="IngresoDeActividades">
    <div class="grid gap-x-4">
      <FormInputWrapper label="Trabajador" for="empleado_id">
        <FormInput id="empleado_id" name="empleado_id" type="select" :options="mockPersonas" />
      </FormInputWrapper>
      <FormInputWrapper label="Fecha" for="fecha">
        <FormInput id="fecha" name="fecha" type="date" :value="dateNow()" />
      </FormInputWrapper>
      <FormInputWrapper label="Labor" for="labor">
        <FormInput id="labor" name="labor" type="select" :options="mockPersonas" />
      </FormInputWrapper>
      <FormInputWrapper label="Lote" for="lote">
        <FormInput id="lote" name="lote" type="select" :options="mockPersonas" />
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
            <FormInput type="time" id="horaInicioAntes" name="horaInicioAntes" />
          </FormInputWrapper>
        </Transition>
        <Transition name="appear">
          <FormInputWrapper v-if="horasExtrasAntes" label="Hora final" for="horaFinalAntes">
            <FormInput type="time" id="horaFinalAntes" name="horaFinalAntes" />
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
            <FormInput type="time" id="horaInicioDespues" name="horaInicioDespues" />
          </FormInputWrapper>
        </Transition>
        <Transition name="appear">
          <FormInputWrapper v-if="horasExtrasDespues" label="Hora final" for="horaFinalDespues">
            <FormInput type="time" id="horaFinalDespues" name="horaFinalDespues" />
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
