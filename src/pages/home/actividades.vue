<script setup>
import { useTaskStore } from '~/Store/Task';
const taskStore = useTaskStore()
const { tasks } = storeToRefs(taskStore)


const columns = [
  { bindKey: 'id', text: 'Id' },
  { bindKey: 'fecha', text: 'Fecha' },
  { bindKey: 'Empleado.nombre', text: 'Empleado' },
  { bindKey: 'Actividad.nombre', text: 'Actividad' },
  { bindKey: 'Lote.nombre', text: 'Lote' },
  { bindKey: 'Semilla.nombre', text: 'Semilla' },
]

</script>


<template>
  <HeaderDashboard>
    Actividades
  </HeaderDashboard>
  <NuxtLayout name="content">

    <WrapperTablon :data="tasks" :columns="columns">
      <template #customControllers>
        <NuxtLink :to="{ name: 'home-actividades-crear'}" >
          <ButtonTablon class="h-full">
            Crear
            <Icon name="add" />
          </ButtonTablon>
        </NuxtLink>
      </template>
      <template #default="{ data, columns, searchFilter }">
        <Tablon :data="data" :columns="columns" :searchFilter="searchFilter"></Tablon>
      </template>
    </WrapperTablon>
  </NuxtLayout>

  <NuxtPage></NuxtPage>
</template>
