<!-- <script setup>
// import { useSession } from '~/Store/Session';
import { useMainStore } from '~/Store/MainStore';

// const storeSession = useSession()
// const { user } = storeToRefs(storeSession)

const store = useMainStore()
const {updateElementInCombustibles} = store
const {getCombustiblesToSelect} = storeToRefs(store)



const dateNow = () => (new Date()).toISOString().split('T')[0];
let sending = ref(false)

const getUserId = () => {
  const session = useSupabaseSession()
  return session.value?.user.id
}

const submitIngresoCombustible = (ev) => {
  const fields = Object.fromEntries(new FormData(ev.target).entries())
  fields.valorTotal = fields.valorTotal.replace(/\./g, '')
  fields.user_id = getUserId()

  sending.value = true
  $fetch('/api/ingresoDeCombustible', {
    method: 'post',
    body: fields
  })
  .then( ({dataUpdateInInventario}) => {
    updateElementInCombustibles(dataUpdateInInventario[0])
  })
  .finally(() => {
    sending.value = false
    ev.target.reset()

  })
}

</script>

<template>
  <form @submit.prevent="submitIngresoCombustible" id="IngresoDeCombustible">
    <FormInputWrapper label="Fecha" for="fecha">
      <FormInput required :disabled="sending" id="fecha" name="fecha" type="date" :value="dateNow()" />
    </FormInputWrapper>
    <FormInputWrapper label="Tipo de combustible" for="combustible_id">
      <FormInput required :disabled="sending" id="combustible_id" name="combustible_id" type="select" :options="getCombustiblesToSelect" />
    </FormInputWrapper>
    <FormInputWrapper label="Cantidad" for="cantidad">
      <FormInput required :disabled="sending" id="cantidad" name="cantidad" type="number" />
    </FormInputWrapper>
    <FormInputWrapper label="Costo total" for="valorTotal">
      <FormInput required :disabled="sending" id="valorTotal" name="valorTotal" type="currency"/>
    </FormInputWrapper>
  </form>
</template> -->