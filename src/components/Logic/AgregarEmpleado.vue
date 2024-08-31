<!-- <script setup>
import { useMainStore } from '~/Store/MainStore';
const store = useMainStore()
const {pushElementToEmpleado} = store


const sending = ref(false)
const submit = (ev) => {
  const fields = Object.fromEntries(new FormData(ev.target).entries())
  
  sending.value = true
  $fetch(`/api/empleado`, {
    method: 'POST',
    body: JSON.stringify(fields)
  })
  .then( response => {
    pushElementToEmpleado(...response.data)
  })
  .finally(() => {
    sending.value = false
  })
  
}

</script>


<template>
  <form @submit.prevent="submit" id="agregarEmpleado">
    <FormInputWrapper label="Nombre" for="nombre">
      <FormInput required :disabled="sending" id="nombre" name="nombre" type="text" />
    </FormInputWrapper>
    <FormInputWrapper label="Especialidad" for="especialidad">
      <FormInput required :disabled="sending" id="especialidad" name="especialidad" type="text" />
    </FormInputWrapper>
  </form>
</template> -->