<script setup>
import { dateNow } from '~/hooks/useTime'
const route = useRoute()
const { registroId } = route.params

import { useCosechaStore } from '~/Store/Cosecha'
const cosechaStore = useCosechaStore()
const { registrarLlegada } = cosechaStore
const { registros } = storeToRefs(cosechaStore)

const registro = computed(()=>{
  return registros.value.filter(registro => registro.id == registroId)
})

const loader = ref(false)
const submit = async (ev) => {
  const target = ev.target
  const fields = Object.fromEntries(new FormData(target).entries())

  loader.value = true
  await registrarLlegada(registroId, fields)
  loader.value = false
}

</script>


<template>
  <OverflowAside2>
    <template #header>
      <h2 class="text-2xl">Llegada del {{ registroId }}</h2>
    </template>

    <form @submit.prevent="submit">
      <FormInputWrapper label="Fecha de llegada" for="fechaLlegada">
        <FormInput required id="fechaLlegada" name="fechaLlegada" type="date" :value="dateNow()" />
      </FormInputWrapper>
      <FormInputWrapper label="Entregado A" for="entregadoA">
        <FormInput required id="entregadoA" name="entregadoA" />
      </FormInputWrapper>
      <FormInputWrapper label="Numero de tiquete" for="numeroTiquete">
        <FormInput required id="numeroTiquete" name="numeroTiquete" />
      </FormInputWrapper>
      <FormInputWrapper label="Peso de llegada" for="pesoDeLlegada">
        <FormInput required id="pesoDeLlegada" name="pesoDeLlegada" />
      </FormInputWrapper>
      <FormInputWrapper label="Peso neto" for="pesoNeto">
        <FormInput required id="pesoNeto" name="pesoNeto" />
      </FormInputWrapper>
      <FormInputWrapper label="Humedad %" for="porcentajeDeHumedad">
        <FormInput required id="porcentajeDeHumedad" name="porcentajeDeHumedad" />
      </FormInputWrapper>
      <FormInputWrapper label="Impureza %" for="porcentajeDeImpureza">
        <FormInput required id="porcentajeDeImpureza" name="porcentajeDeImpureza" />
      </FormInputWrapper>
      <FormInputWrapper label="Observaciones" for="observaciones">
        <FormInput id="observaciones" name="observaciones" />
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