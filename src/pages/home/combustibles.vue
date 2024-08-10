<script setup>
import { useMainStore } from '~/Store/MainStore';
const store = useMainStore()
const {setCombustibles} = store
const {showCombustiblesToTable} = storeToRefs(store)

onMounted(() => {
  $fetch('/api/combustiblesInventario')
  .then(({data}) => {
    setCombustibles(data)
  })
})

let showModalIngresosCombustible = ref(false);
let showModalGastoCombustible = ref(false);
</script>

<template>
  <HeaderDashboard>
    <h2 class="text-2xl">Combustibles</h2>

    <div class="flex gap-4">
      <ButtonMinus @click="showModalGastoCombustible = !showModalGastoCombustible">
        Gasto de combustible
      </ButtonMinus>
      <ButtonAdd @click="showModalIngresosCombustible = !showModalIngresosCombustible">
        Ingreso de combustible
      </ButtonAdd>
    </div>
  </HeaderDashboard>

  <NuxtLayout  name="content">
    <DataTable :data="showCombustiblesToTable" />
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

    <!-- <LogicIngresoDeActividades />

    <template #otherButtons>
      <ButtonCancel type="submit" form="IngresoDeActividades">Enviar</ButtonCancel>
    </template> -->
  </OverflowAside>

</template>