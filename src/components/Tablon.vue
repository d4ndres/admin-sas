<script setup>
import { computed, ref } from 'vue'

const props = defineProps({
  data: {
    type: Array,
    required: true
  },
  columns: {
    type: Array,
    default: () => []
  },
  searchFilter: {
    type: String,
    default: ''
  }
})


const computedColumns = computed(() => {
  if( !props.columns.length && props.data.length) {
    return Object.keys(props.data[0]).map( key => ({bindKey: key, text:key}))
  } else if ( props.columns.length ) {
    return props.columns.map( item => {
      if( typeof item === 'string' ) return ({bindKey: item, text:item})
      else return ({ ...item })
    })
  }
  return []
});

const computedData = computed(() => {
  return props.data.map((row, index) => {
    return computedColumns.value.reduce((acc, { bindKey, autoValue, text }) => {
      if (bindKey in row) {
        acc[bindKey] = row[bindKey];
      } else if (typeof autoValue === 'function') {
        acc[text] = autoValue({ row, index });
      } else {
        acc[bindKey] = null;
      }
      return acc;
    }, {});
  });
});



const sortByColumn = ref(null)
const filterData = computed(() => {
  return computedData.value.filter((row) => {
    return Object.values(row).some((value) => {
      return value?.toString().toLowerCase().includes(props.searchFilter.toLowerCase())
    })
  })
    .sort((a, b) => {
      if (sortByColumn.value) {
        if (sortByColumn.value.asc) {
          return a[sortByColumn.value.column] > b[sortByColumn.value.column] ? 1 : -1
        }
        else {
          return a[sortByColumn.value.column] < b[sortByColumn.value.column] ? 1 : -1
        }
      }
      return 0
    })
});

const sortByContent = (columnName) => {
  if (!sortByColumn.value) {
    sortByColumn.value = {
      column: columnName,
      asc: true
    }
  }
  else if (sortByColumn.value.column === columnName && sortByColumn.value.asc) {
    sortByColumn.value = {
      column: columnName,
      asc: false
    }
  }
  else if (sortByColumn.value.column !== columnName) {
    sortByColumn.value = {
      column: columnName,
      asc: true
    }
  }
  else {
    sortByColumn.value = null
  }
}



</script>

<template>
    <table class="text-text_main w-full border border-gray_dark [&_*>tr>*]:border-y [&_*>tr>*]:border-y-gray_dark [&_*>tr>*]:py-1 [&_*>tr>*]:px-2">
      <thead class="">
        <tr class="">
          <th v-for="({ bindKey, text }) in computedColumns" :key="`h_${bindKey}`"
            @click="sortByContent(bindKey ?? text)" 
            class="relative text-left [&_.absolute]:hover:opacity-50" 
            :class="{'border-b-4 border-focus': (bindKey === sortByColumn?.column || text === sortByColumn?.column) && sortByColumn }">
              <span>
                {{ text }}
              </span>
              <Icon 
              class="absolute top-[50%] -translate-y-1/2 right-1 opacity-0 duration-300" 
              :class="{ 
                'opacity-100': sortByColumn && (bindKey === sortByColumn?.column || text === sortByColumn?.column),
                'rotate-180': sortByColumn && !sortByColumn?.asc
                }"
              name="filter" />
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, index) in filterData" :key="index" class="">
          <td v-for="(value, bindKey) in row" :key="bindKey" class="whitespace-nowrap">
            <slot name="default" :value="value" :bindKey="bindKey" :row="row" :rowIndex="index">
              {{ value }}
            </slot>
          </td>
        </tr>
      </tbody>
    </table>
</template>
