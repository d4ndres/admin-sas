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

const columns = [
  { bindKey: 'id', text: 'Id' },
  { bindKey: 'fecha', text: 'Fecha' },
  { bindKey: 'empleado', text: 'Empleado' },
  { bindKey: 'actividad', text: 'Actividad' },
  { bindKey: 'lote', text: 'Lote' },
  { bindKey: 'semilla', text: 'Semilla' },
]


let showModal = ref(false);
</script>


<template>
  <HeaderDashboard>
    Actividades
  </HeaderDashboard>
  <NuxtLayout name="content">
    
    <WrapperTablon :data="showHistorialDeActividadesToTable" :columns="columns">
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

    <LogicIngresoDeActividades />

    <template #otherButtons>
      <ButtonCancel type="submit" form="IngresoDeActividades">Enviar</ButtonCancel>
    </template>
  </OverflowAside>
</template>


