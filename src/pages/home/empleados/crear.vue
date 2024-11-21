<script setup>
import { useEmpleadosStore } from '~/Store/Empleados'
const storeEmpleados = useEmpleadosStore()
const { create } = storeEmpleados

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
  <OverflowAside2>
    <template #header>
      <h2 class="text-2xl">Crear empleado</h2>
    </template>

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
  </OverflowAside2>
</template>