<script setup>
import {useCombustiblesStore} from '~/Store/Combustibles'
const combustibleStore = useCombustiblesStore()
const {combustibles} = storeToRefs(combustibleStore)

const columns = [
  { bindKey: 'id', text: 'Id' },
  { bindKey: 'nombre', text: 'Nombre' },
  { bindKey: 'cantidadActual', text: 'Cantidad actual' },
  { autoValue: () => null, text: 'Registro' },
]

</script>

<template>
  <HeaderDashboard>
    Combustibles
  </HeaderDashboard>

  <NuxtLayout  name="content">



    <WrapperTablon :data="combustibles" :columns="columns">
      <template #customControllers>
        <NuxtLink :to="{ name: 'home-combustibles-gasto'}" >
          <ButtonTablon class="h-full">
            Gasto
            <Icon name="down" />
          </ButtonTablon>
        </NuxtLink>
        <NuxtLink :to="{ name: 'home-combustibles-ingreso'}" >
          <ButtonTablon class="h-full">
            Ingreso
            <Icon name="up" />
          </ButtonTablon>
        </NuxtLink>
      </template>
      <template #default="{ searchFilter, data, columns }">
        <Tablon :data="data" :columns="columns" :searchFilter="searchFilter" >
          <template #default="{ bindKey, row }">
            <router-link v-if="bindKey === 'Registro'"
            :to="{ path: `/home/combustible-inventario-${row.id}` }"
            class="block bg-gray-200/50 min-h-6 rounded-r-full border border-gray-500 relative overflow-hidden [&_*]:hover:translate-x-0 cursor-pointer"
            >
              <div class="w-full h-full bg-blue-300 absolute -translate-x-[calc(100%_-_30px)] duration-300 flex items-center justify-end rounded-r-full pr-2">
                <Icon name="arrowLink"/>
              </div>
            </router-link>
          </template>
        </Tablon>
      </template>
    </WrapperTablon>
  </NuxtLayout>

  <NuxtPage></NuxtPage>

  <!-- <OverflowAside v-model="showModalIngresosCombustible">
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
  </OverflowAside> -->

</template>