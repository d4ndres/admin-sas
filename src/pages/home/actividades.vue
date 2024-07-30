<script setup>
import { useMainStore } from '~/Store/MainStore';
const store = useMainStore()
const {setHistorialDeActividades} = store
const {showHistorialDeActividadesToTable} = storeToRefs(store)

onMounted(() => {
  $fetch('/api/actividadesRealizadas')
  .then(({data}) => {
    setHistorialDeActividades(data)
  })

});

let showModal = ref(false);
</script>


<template>
  <HeaderDashboard>
    <h2 class="text-2xl">Actividades</h2>

    <div>
      <ButtonAdd @click="showModal = !showModal" />
    </div>
  </HeaderDashboard>
  <NuxtLayout name="content">
    <DataTable :data="showHistorialDeActividadesToTable" />
  </NuxtLayout>

  <OverflowAside v-model="showModal">
    <template #header>
      <h2 class="text-2xl">Ingreso de actividades</h2>
    </template>

    <LogicIngresoDeActividades />

    <template #otherButtons>
      <ButtonCancel type="submit" form="IngresoDeActividades">Enviar</ButtonCancel>
    </template>
  </OverflowAside>
</template>


