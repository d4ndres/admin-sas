<script setup>
import {formatter} from '~/hooks/useTime'

import {useCombustiblesStore} from '~/Store/Combustibles'
const store = useCombustiblesStore()
const {initRegistroCombustibles} = store
const {registroCombustibles} = storeToRefs(store)

const columns = [
  { bindKey: 'id', text: 'Id'},
  { bindKey: 'CombustibleInventario.nombre', text: 'Combustible'},
  { bindKey: 'fecha', text: 'Fecha', autoValue: ({row}) => formatter(row.fecha)},
  { bindKey: 'cantidad', text: 'Cantidad'},
  { bindKey: 'valorTotal', text: 'Valor total'},
  { bindKey: 'CombustibleGasto.Lote.nombre', text: 'Lote'},
  { bindKey: 'CombustibleGasto.Empleado.nombre', text: 'Empleado'},
  { bindKey: 'CombustibleGasto.Vehiculo.nombre', text: 'Vehiculo'},
  { bindKey: 'CombustibleGasto.Actividad.nombre', text: 'Actividad'}, 
]

onMounted( async ()=>{
  await initRegistroCombustibles()
})

</script>

<template>
  <WrapperTablon :data="registroCombustibles" :columns="columns">
    <template #default="{ searchFilter, data, columns }">
      <Tablon :data="data" :columns="columns" :searchFilter="searchFilter">
        <template #default="{ bindKey, value }">
          <div v-if="bindKey === 'cantidad'" class="flex">
            <StateIndicator :state="value > 0 ? 'success' : 'danger'" class="flex gap-2 min-w-20 items-center">
              <Icon :name="value > 0 ? 'up' : 'down'" />
              {{ value }}
            </StateIndicator>
          </div>
        </template>
      </Tablon>
    </template>
  </WrapperTablon>
</template>