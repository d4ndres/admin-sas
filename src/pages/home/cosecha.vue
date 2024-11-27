<script setup>
import {formatter} from '~/hooks/useTime'

import { useCosechaStore } from '~/Store/Cosecha'
const cosechaStore = useCosechaStore()
const {registros} = storeToRefs(cosechaStore)


const columns = [
  { bindKey: 'id', text: 'Id' },
  { bindKey: 'fechaSalida', text: 'Fecha de salida', autoValue: ({row}) => formatter(row.fechaSalida)},
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
  { bindKey: 'Semilla.name', text: 'Semilla' },
  { bindKey: 'Lote.name', text: 'Lote' },
  { bindKey: 'numeroTiquete', text: 'Numero de tiquete' },
  { bindKey: 'pesoDeLlegada', text: 'Peso de llegada' },
  { bindKey: 'pesoNeto', text: 'Peso neto' },
  { bindKey: 'porcentajeDeHumedad', text: 'Humedad %' },
  { bindKey: 'porcentajeDeImpureza', text: 'Impureza %' },
  { bindKey: 'observaciones', text: 'Observaciones' },
  
]


</script>



<template>
  <HeaderDashboard>
    Cosecha
  </HeaderDashboard>
  <NuxtLayout  name="content" >
    <WrapperTablon :data="registros" :columns="columns">
      <template #default="{ data, columns, searchFilter }">
        <Tablon :data="data" :columns="columns" :searchFilter="searchFilter"></Tablon>
      </template>
    </WrapperTablon>
  </NuxtLayout>
</template>