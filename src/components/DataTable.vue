<script setup>

const props = defineProps({
  data: {
    type: Array,
    required: true
  },
  columns: {
    type: Array,
    default: () => []
  },
  callbacksRow: {
    type: Array,
    default: () => []
  },
  hideControls: {
    type: Boolean,
    default: false
  }
});


const headers = computed(() => {
  let headers = []

  if (props.columns.length) {
    headers = props.columns
  }
  if (!props.data.length) {
    headers = []
  }
  else {
    headers = Object.keys(props.data[0]);
  }
  headers = headers.map(header => {
    return {
      name: header,
    }
  })
  return headers
});

const rows = computed(() => {
  return props.data
});

const callbackRow = (index) => {
  // console.log('Row clicked', index)
  if (props.callbacksRow.length) {
    props.callbacksRow[index]()
  }
}

const isFiltersActive = ref(false)

</script>


<template>
  <div class="w-full h-full overflow-auto">
    <div class="flex" v-if="!hideControls">
      <div class="px-2 py-1 border border-gray dark:border-gray_dark transition-all duration-300 cursor-pointer hover:bg-gray_dark">
        Columnas
      </div>
      <div @click="isFiltersActive = !isFiltersActive" 
      :class="{ 'bg-gray_dark' : isFiltersActive}"
      class="px-2 py-1 border border-gray dark:border-gray_dark transition-all duration-300 cursor-pointer hover:bg-gray_dark">
        Filtros
      </div>
    </div>
    <table class="min-w-full border border-gray dark:border-gray_dark transition-all duration-300">
      <thead>
        <tr>
          <!-- Generate table header dynamically -->
          <th v-for="(header, index) in headers" :key="index"
            class="relative px-6 py-3 border-b border-gray dark:border-gray_dark transition-[border] duration-300 text-left text-xs font-semibold uppercase tracking-wider">
            {{ header.name }}
            
            <div
              v-show="isFiltersActive"
              class="absolute h-[calc(100%_-_0.5rem)] w-8 right-1 top-1 flex justify-center items-center cursor-pointer">
              <Icon name="filter" />
            </div>
          </th>
        </tr>
      </thead>
      <tbody>
        <!-- Generate table rows dynamically -->
        <tr @click="callbackRow(index)" v-for="(row, index) in rows" :key="index"
          class="hover:bg-dark_opacity dark:hover:bg-gray_dark">
          <!-- <td v-for="(value, key) in row" :key="key" class="px-3 sm:px-6 border py-4 whitespace-nowrap text-center max-w-4 overflow-hidden sm:overflow-auto hover:max-w-max">{{ value }}</td> -->
          <td v-for="(value, key) in row" :key="key" class="px-6 py-4 whitespace-nowrap">
            <slot name="default" :value="value" :key="key" :row="row">
              {{ value }}
            </slot>
          </td>
        </tr>
      </tbody>
    </table>

  </div>


</template>
