<script setup>
import { useCombustiblesStore } from '~/Store/Combustibles'
const combustibleStore = useCombustiblesStore()
const { combustibles } = storeToRefs(combustibleStore)

const columns = [
  { bindKey: 'id', text: 'Id' },
  { bindKey: 'nombre', text: 'Nombre' },
  { bindKey: 'cantidadActual', text: 'Cantidad actual' },
  // { autoValue: () => null, text: 'Registro' },
]

</script>

<template>
  <WrapperTablon :data="combustibles" :columns="columns">
    <template #customControllers>
      <NuxtLink :to="{ name: 'home-combustibles-inventario-gasto' }">
        <ButtonTablon class="h-full">
          Gasto
          <Icon name="down" />
        </ButtonTablon>
      </NuxtLink>
      <NuxtLink :to="{ name: 'home-combustibles-inventario-ingreso' }">
        <ButtonTablon class="h-full">
          Ingreso
          <Icon name="up" />
        </ButtonTablon>
      </NuxtLink>
    </template>
    <template #default="{ searchFilter, data, columns }">
      <Tablon :data="data" :columns="columns" :searchFilter="searchFilter">
        <template #default="{ bindKey, row }">
          <router-link v-if="bindKey === 'Registro'" :to="{ path: `/home/combustible-inventario-${row.id}` }"
            class="block bg-gray-200/50 min-h-6 rounded-r-full border border-gray-500 relative overflow-hidden [&_*]:hover:translate-x-0 cursor-pointer">
            <div
              class="w-full h-full bg-blue-300 absolute -translate-x-[calc(100%_-_30px)] duration-300 flex items-center justify-end rounded-r-full pr-2">
              <Icon name="arrowLink" />
            </div>
          </router-link>
        </template>
      </Tablon>
    </template>
  </WrapperTablon>

  <NuxtPage></NuxtPage>
</template>