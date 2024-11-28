<script setup>
import { formatter } from '~/hooks/useTime'

import { useCosechaStore } from '~/Store/Cosecha'
const cosechaStore = useCosechaStore()
const { registros } = storeToRefs(cosechaStore)


const columns = [
  { bindKey: 'id', text: 'Id' },
  { text: 'Estado', autoValue: ({ row }) => row.numeroTiquete ? 'Finalizado' : 'En camino' },
  { bindKey: 'fechaSalida', text: 'Fecha de salida', autoValue: ({ row }) => formatter(row.fechaSalida) },
  { bindKey: 'numeroRemision', text: 'Numero de remisión' },
  { bindKey: 'agricultor', text: 'Agricultor' },
  { bindKey: 'despachadoA', text: 'Desapachadó a' },
  { bindKey: 'transportador', text: 'Transportador' },
  { bindKey: 'cedulaTransportador', text: 'Cédula Transportador' },
  { bindKey: 'celularTransportador', text: 'Celular Transportador' },
  { bindKey: 'placaTransportador', text: 'Placa' },
  { bindKey: 'tipoVehiculo', text: 'Tipo de vehiculo' },
  { bindKey: 'numeroTolvas', text: 'Numero de tolvas' },
  { bindKey: 'pesoSalida', text: 'Peso salida' },
  { bindKey: 'Semilla.nombre', text: 'Semilla' },
  { bindKey: 'Lote.nombre', text: 'Lote' },
  { bindKey: 'fechaLlegada', text: 'Fecha de llegada', autoValue: ({ row }) => formatter(row.fechaLlegada) },
  { bindKey: 'entregadoA', text: 'Entregado a' },
  { bindKey: 'numeroTiquete', text: 'Numero de tiquete' },
  { bindKey: 'pesoDeLlegada', text: 'Peso de llegada' },
  { bindKey: 'pesoNeto', text: 'Peso neto' },
  { bindKey: 'porcentajeDeHumedad', text: 'Humedad %' },
  { bindKey: 'porcentajeDeImpureza', text: 'Impureza %' },
  { bindKey: 'observaciones', text: 'Observaciones' },
]

const toUpdate = ref([])


</script>



<template>
  <HeaderDashboard>
    Cosecha
  </HeaderDashboard>
  <NuxtLayout name="content">
    <WrapperTablon :data="registros" :columns="columns">
      <template #customControllers>
        <NuxtLink :to="{ name: 'home-cosecha-crear' }">
          <ButtonTablon class="h-full">
            Crear salida
            <Icon name="add" />
          </ButtonTablon>
        </NuxtLink>

        <NuxtLink v-if="toUpdate.length" :to="{ name: 'home-cosecha-llegadas-registroId', params: { registroId: 2 } }">
          <ButtonTablon class="h-full">
            Registrar llegada
            <Icon name="add" />
          </ButtonTablon>
        </NuxtLink>
        <ButtonTablon v-else class="h-full">
          Registrar llegada
          <Icon name="add" />
        </ButtonTablon>

      </template>
      <template #default="{ data, columns, searchFilter }">
        <Tablon :data="data" :columns="columns" :searchFilter="searchFilter" v-model="toUpdate" onlySelectedOne="">
          <template #default="{ bindKey, value }">
            <StateIndicator v-if="bindKey == 'Estado'" :state="value == 'Finalizado' ? 'success' : 'warning'">
              {{ value }}
            </StateIndicator>
          </template>
        </Tablon>
      </template>
    </WrapperTablon>
  </NuxtLayout>

  <NuxtPage></NuxtPage>
</template>