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
})


const computedColumns = computed(() => {
  const cols = props.columns.map(element => {
    if (typeof element === 'string') {
      return { bindKey: element, text: element };
    }
    else if (typeof element === 'object' && element !== null) {
      return { ...element };
    }
    else {
      return Object.keys(props.data[0]).map(key => {
        return { bindKey: key, text: key };
      });
    }
  });
  return cols.length ? cols : Object.keys(props.data[0]).map(key => {
    return { bindKey: key, text: key };
  });
});

const computedData = computed(() => {
  return props.data.map((row, index) => {
    return computedColumns.value.reduce((acc, { bindKey, autoValue, text }) => {
      if (bindKey in row) {
        acc[bindKey] = row[bindKey];
      } else if (typeof autoValue === 'function') {
        acc[text] = autoValue({row, index});
      } else {
        acc[bindKey] = null;
      }
      return acc;
    }, {});
  });
});


const searchFilter = ref('')
const sortByColumn = ref(null)
const filterData = computed(() => {
  return computedData.value.filter((row) => {
    return Object.values(row).some((value) => {
      return value?.toString().toLowerCase().includes(searchFilter.value.toLowerCase())
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
  <div class="overflow-auto h-full relative">
    <table class="min-w-full text-text_main">
      <thead class="sticky top-0 z-10">

        <tr class="h-[5vh]">
          <td class="bg-background_body" :colspan="computedColumns.length">
            <div class="inline-block">
              <FormInput v-model="searchFilter" placeholder="Filtrar por contenido" />
            </div>
          </td>
        </tr>
        
        <tr class="h-[5vh] bg-background ">
          <th 
            v-for="({ bindKey, text }) in computedColumns" :key="`h_${bindKey}`"
            @click="sortByContent(bindKey ?? text)"
            class="relative px-2 text-left text-xs font-semibold uppercase tracking-wider cursor-pointer"
            :class="{ 
              'sort-up' : (bindKey === sortByColumn?.column || text === sortByColumn?.column)  && sortByColumn,
              
            }"
            >
            <span>
              {{ text }}
            </span>
          </th>
        </tr>
      </thead>
      <tbody>

        <tr v-for="(row, index) in filterData" :key="index" class="">
          <td v-for="(value, key) in row" :key="key" class="px-2 py-4 whitespace-nowrap">
            <slot name="default" :value="value" :key="key" :row="row" :rowIndex="index">
              {{ value }}
            </slot>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>



<style scoped>
.sort-up {
  background-image: linear-gradient(180deg, transparent, 94%,  theme(colors.focus));
  backdrop-filter: blur(20px);
  /* box-shadow: inset 0 -3px 0 0 rgba(0, 150, 191, 0.5); */
}
</style>