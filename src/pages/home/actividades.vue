<script setup>
// import { useMainStore } from '~/Store/MainStore';
// const store = useMainStore()
// const {setHistorialDeActividades} = store
// const {showHistorialDeActividadesToTable} = storeToRefs(store)

// onMounted(() => {
//   $fetch('/api/actividadesRealizadas')
//   .then(({data}) => {
//     setHistorialDeActividades(data)
//   })
// });

import { useActividadesStore } from '~/Store/Actividades';
const actividadesStore = useActividadesStore()
const {actividades} = storeToRefs(actividadesStore)


const columns = [
  { bindKey: 'id', text: 'Id' },
  { bindKey: 'fecha', text: 'Fecha' },
  { bindKey: 'Empleado.nombre', text: 'Empleado' },
  { bindKey: 'Actividad.nombre', text: 'Actividad' },
  { bindKey: 'Lote.nombre', text: 'Lote' },
  { bindKey: 'Semilla.nombre', text: 'Semilla' },
]
const showModal = ref(false);



</script>


<template>
  <HeaderDashboard>
    Actividades
  </HeaderDashboard>
  <NuxtLayout name="content">
    
    <WrapperTablon :data="actividades" :columns="columns">
      <template #customControllers>
        <ButtonTablon @click="showModal = true">
          Crear
          <Icon name="add" />
        </ButtonTablon>
      </template>
      <template #default="{ data, columns, searchFilter }">
        <Tablon :data="data" :columns="columns" :searchFilter="searchFilter"></Tablon>
      </template>
    </WrapperTablon>
  </NuxtLayout>

  <OverflowAside v-model="showModal">
    <template #header>
      <h2 class="text-2xl">Ingreso de actividades</h2>
    </template>

    <!-- <LogicIngresoDeActividades /> -->

    <template #otherButtons>
      <ButtonCancel type="submit" form="IngresoDeActividades">Enviar</ButtonCancel>
    </template>
  </OverflowAside>
</template>


