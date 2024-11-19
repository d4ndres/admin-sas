<script setup>
import { useMainStore } from '~/Store/MainStore';
const store = useMainStore()
const {pushElementToCombustiblesHistorial, showCombustiblesHistorialToTable} = store

const route = useRoute()
const combustible_id = computed(() => route.params.id)

onMounted(() => {
  $fetch(`/api/combustiblesInventario/${combustible_id.value}`)
  .then(({data}) => {
    pushElementToCombustiblesHistorial(data)
  })
})


const columns = [
  { bindKey: 'id', text: 'Id'},
  { bindKey: 'nombre', text: 'Combustible'},
  { bindKey: 'fecha', text: 'Fecha'},
  { bindKey: 'cantidad', text: 'Cantidad'},
  { bindKey: 'valorTotal', text: 'Valor total'},
  { bindKey: 'lote', text: 'Lote'},
  { bindKey: 'empleado', text: 'Empleado'},
  { bindKey: 'vehiculo', text: 'Vehiculo'},
  { bindKey: 'actividad', text: 'Actividad'},
  
]

</script>


<template>
  <HeaderDashboard>
    Combustibles Historial
  </HeaderDashboard>

  <NuxtLayout  name="content">
    <WrapperTablon :data="showCombustiblesHistorialToTable(combustible_id)"  :columns="columns">
      <template #default="{ searchFilter, data, columns }">
        <Tablon :data="data" :columns="columns" :searchFilter="searchFilter" >
          <template #default="{ bindKey, value }">
            <div v-if="bindKey === 'cantidad'" class="flex justify-center">
              <StateIndicator :state=" value > 0 ? 'success' : 'danger'" class="flex gap-2 min-w-20 items-center">
                <Icon :name="value > 0 ? 'up' : 'down'"/>
                {{ value }}
              </StateIndicator>
            </div>
          </template>
        </Tablon>
      </template>
    </WrapperTablon>
  </NuxtLayout>
</template>