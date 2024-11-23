<script setup>
import {useCombustiblesStore} from '~/Store/Combustibles'
const combustibleStore = useCombustiblesStore()
const {combustibles} = storeToRefs(combustibleStore)

import {dateNow} from '~/hooks/useTime'

const mappedCombustible = computed(() => combustibles.value.map( item => ({ label: item.nombre, value: item.id})))


const valorTotal = ref(null)
const loader = ref(false)
const onSubmit = async (ev) => {
  const target = ev.target
  const fields = Object.fromEntries(new FormData(target).entries())

  const data = {
    ...fields,
    valorTotal: valorTotal.value
  }

  loader.value = true
  await combustibleStore.ingresoCombustible(data)
  loader.value = false
  valorTotal.value = null
  target.reset()
}


</script>

<template>
  <OverflowAside2>
    <template #header>
      <h2 class="text-2xl">Ingreso de combustible</h2>
    </template>
    <form @submit.prevent="onSubmit">
      <FormInputWrapper label="Fecha" for="fecha">
        <FormInput required id="fecha" name="fecha" type="date" :value="dateNow()" />
      </FormInputWrapper>
      <FormInputWrapper label="Tipo de combustible" for="combustible_id">
        <FormInput required id="combustible_id" name="combustible_id" type="select" :options="mappedCombustible" />
      </FormInputWrapper>
      <FormInputWrapper label="Cantidad" for="cantidad" >
        <FormInput required id="cantidad" name="cantidad" type="number" min="1"/>
      </FormInputWrapper>
      <FormInputWrapper label="Costo total" for="valorTotal">
        <FormInput required id="valorTotal" name="valorTotal" type="currency" v-model="valorTotal"/>
      </FormInputWrapper>


      <button>
        <ButtonTablon class="flex justify-center items-center text-lg py-1 w-min min-w-28 min-h-10">
          <span v-show="!loader">
            Registrar
          </span>
          <Icon v-show="loader" name="loader"/>
        </ButtonTablon>
      </button>
    </form>
  </OverflowAside2>
</template>