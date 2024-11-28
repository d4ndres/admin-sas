<script setup>
import { dateNow } from '~/hooks/useTime'

import { useLotesStore } from '~/Store/Lotes'
import { useSemillasStore } from '~/Store/Semillas'
import { useCosechaStore } from '~/Store/Cosecha'

const lotesStore = useLotesStore()
const { lotes } = storeToRefs(lotesStore)
const semillasStore = useSemillasStore()
const { semillas } = storeToRefs(semillasStore)
const cosechaStore = useCosechaStore()


const {nuevoRegistro} = cosechaStore
const {registros} = storeToRefs(cosechaStore)


const loader = ref(false)
const submit = async (ev) => {
  const target = ev.target
  const fields = Object.fromEntries(new FormData(target).entries())

  loader.value = true
  await cosechaStore.nuevoRegistro(fields)
  loader.value = false
}

</script>


<template>
  <OverflowAside2>
    <template #header>
      <h2 class="text-2xl">Nuevo registro</h2>
    </template>

    <form @submit.prevent="submit">
      <FormInputWrapper label="Fecha de salida" for="fechaSalida">
        <FormInput required id="fechaSalida" name="fechaSalida" type="date" :value="dateNow()" />
      </FormInputWrapper>
      <FormInputWrapper label="Numero de redimión" for="numeroRemision">
        <FormInput required id="numeroRemision" name="numeroRemision" :value="registros.length + 1" />
      </FormInputWrapper>
      <FormInputWrapper label="Agricultor" for="agricultor">
        <FormInput required id="agricultor" name="agricultor" />
      </FormInputWrapper>
      <FormInputWrapper label="Despachado A" for="despachadoA">
        <FormInput required id="despachadoA" name="despachadoA" />
      </FormInputWrapper>
      <FormInputWrapper label="Transportador" for="transportador">
        <FormInput required id="transportador" name="transportador" />
      </FormInputWrapper>
      <FormInputWrapper label="Cédula" for="cedulaTransportador">
        <FormInput required id="cedulaTransportador" name="cedulaTransportador" />
      </FormInputWrapper>
      <FormInputWrapper label="Celular" for="celularTransportador">
        <FormInput required id="celularTransportador" name="celularTransportador" />
      </FormInputWrapper>
      <FormInputWrapper label="placa" for="placaTransportador">
        <FormInput required id="placaTransportador" name="placaTransportador" />
      </FormInputWrapper>
      <FormInputWrapper label="Tipo de vehiculo" for="tipoVehiculo">
        <FormInput required id="tipoVehiculo" name="tipoVehiculo" />
      </FormInputWrapper>
      <FormInputWrapper label="Numero de tolvas" for="numeroTolvas">
        <FormInput required id="numeroTolvas" name="numeroTolvas" />
      </FormInputWrapper>
      <FormInputWrapper label="Peso de salida" for="pesoSalida">
        <FormInput required id="pesoSalida" name="pesoSalida" />
      </FormInputWrapper>
      <FormInputWrapper label="Lote" for="loteId">
        <FormInput :disabled="loader" required id="loteId" name="loteId" type="select" :options="lotes"
          setElementOptionLabel="nombre" setElementOptionValue="id" />
      </FormInputWrapper>
      <FormInputWrapper label="Semilla" for="semillaId">
        <FormInput :disabled="loader" required id="semillaId" name="semillaId" type="select" :options="semillas"
          setElementOptionLabel="nombre" setElementOptionValue="id" />
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