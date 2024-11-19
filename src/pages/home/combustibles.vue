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


const columns = [
  { autoValue: () => null, text: 'Historial' },
  { bindKey: 'id', text: 'Id' },
  { bindKey: 'nombre', text: 'Nombre' },
  { bindKey: 'cantidadActual', text: 'Cantidad actual' },
]

</script>

<template>
  <HeaderDashboard>
    Combustibles
  </HeaderDashboard>

  <NuxtLayout  name="content">



    <WrapperTablon :data="showCombustiblesToTable" :columns="columns">
      <template #customControllers>
        <ButtonTablon @click="showModalGastoCombustible = true">
          Eliminar
          <Icon name="down" />
        </ButtonTablon>
        <ButtonTablon @click="showModalIngresosCombustible = true">
          Crear
          <Icon name="up" />
        </ButtonTablon>
      </template>
      <template #default="{ searchFilter, data, columns }">
        <Tablon :data="data" :columns="columns" :searchFilter="searchFilter" v-model="rowsSelected">
          <template #default="{ bindKey, row }">
            <router-link v-if="bindKey === 'Historial'"
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