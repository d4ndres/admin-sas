<script setup>
import { utils, writeFileXLSX } from 'xlsx'

const props = defineProps({
  data: {
    type: Array,
    required: true
  },
  columns: {
    type: Array,
    default: () => []
  },
})


const searchFilter = ref('')
const columnsRef = ref(props.columns.map(item => {
  return {
    ...item,
    active: true
  }
}))
const toggleColumn = (column) => {
  const index = columnsRef.value.findIndex(item => item.text == column.text)
  columnsRef.value.splice(index, 1, {
    ...column,
    active: !column.active
  })
}
const columnsFilter = computed(() => columnsRef.value.filter( column => column.active ))



const refEl = getCurrentInstance()
const downloadTable = () => {
  const table = refEl.vnode.el.querySelector('table')
  const wb = utils.table_to_book(table, { sheet: "Hoja1" });
  writeFileXLSX(wb, "mi_tabla.xlsx");
}


</script>


<template>
  <div>
    <div class="flex justify-between mb-2 gap-2 flex-wrap">
      <div class="">
        <FormInput v-model="searchFilter" placeholder="Filtrar por contenido" />
      </div>
      <div class="flex gap-2 ">
        <popover>
          <div class="border border-gray_dark flex items-center rounded-lg px-2 gap-2 cursor-pointer h-full">
            Columnas
            <Icon name="columns"></Icon>
          </div>
          <template #popover>
            <div v-for="column in columnsRef" :key="column + '_controller'"
              class="border border-gray_dark flex items-center p-1 px-4 gap-2 cursor-pointer h-full hover:bg-gray-900/10 "
              @click="toggleColumn(column)" :class="{ 'line-through': !column.active }">
              {{ column.text }}
            </div>
          </template>
        </popover>




        <div @click="downloadTable"
          class="border border-gray_dark flex items-center rounded-lg px-2 gap-2 cursor-pointer h-full">
          Descargar
          <Icon name="download"></Icon>
        </div>

      </div>
    </div>
    <slot name="default" :searchFilter="searchFilter" :data="data" :columns="columnsFilter"></slot>
    <div>

    </div>
  </div>
</template>