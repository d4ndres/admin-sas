<script setup>
import { useMainStore } from '~/Store/MainStore';
const store = useMainStore()
const {setCombustibles} = store
const {showCombustiblesToTable} = storeToRefs(store)

const router = useRouter()
const callbacksRow = ref([])

onMounted(() => {
  $fetch('/api/combustiblesInventario')
  .then(({data}) => {
    setCombustibles(data)
    callbacksRow.value = data.map((item) => {
      return () => {
        router.push(`/home/combustible-inventario-${item.id}`)
      }
    })
  })
})

let showModalIngresosCombustible = ref(false);
let showModalGastoCombustible = ref(false);




</script>

<template>
  <HeaderDashboard>
    Combustibles
    <template #buttons>
      <ButtonAction type="down" @click="showModalGastoCombustible = !showModalGastoCombustible">
        Gastos
      </ButtonAction>
      <ButtonAction type="up" @click="showModalIngresosCombustible = !showModalIngresosCombustible">
        Ingresos
      </ButtonAction>
    </template>
  </HeaderDashboard>

  <NuxtLayout  name="content">
    <DataTable :data="showCombustiblesToTable" :callbacksRow="callbacksRow" />
  </NuxtLayout>

  <OverflowAside v-model="showModalIngresosCombustible">
    <template #header>
      <h2 class="text-2xl">Ingreso de combustible</h2>
    </template>

    <LogicIngresoDeCombustible />

    <template #otherButtons>
      <ButtonCancel type="submit" form="IngresoDeCombustible">Enviar</ButtonCancel>
    </template>
  </OverflowAside>


  <OverflowAside v-model="showModalGastoCombustible">
    <template #header>
      <h2 class="text-2xl">Gasto de combustible</h2>
    </template>

    <LogicGastoDeCombustible />

    <template #otherButtons>
      <ButtonCancel type="submit" form="GastosDeCombustible">Enviar</ButtonCancel>
    </template>
  </OverflowAside>

</template>