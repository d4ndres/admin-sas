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
  } else if (!props.data.length) {
    headers = []
  } else {
    headers = Object.keys(props.data[0]);
  }

  return headers
});


const sortByColumn = ref(null)
const rows = computed(() => {
  return props.data.filter((row) => {
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


const deepEqual = (obj1, obj2) => {
  return JSON.stringify(obj1) === JSON.stringify(obj2)
}

const sortByContent = ({ column, asc }) => {
  if (deepEqual(sortByColumn.value, { column, asc })) {
    sortByColumn.value = null
  }
  else {
    sortByColumn.value = {
      column,
      asc
    }
  }
}

const callbackRow = (index) => {
  // console.log('Row clicked', index)
  if (props.callbacksRow.length) {
    props.callbacksRow[index]()
  }
}
const isFiltersActive = ref(true)

const searchFilter = ref('')
</script>


<template>
  <Transition>
    <div class="w-full h-full overflow-auto text-text_main" v-if="headers.length">
      <div class="flex top-0" v-if="!hideControls">
        <div class="mb-1">
          <FormInput v-model="searchFilter" placeholder="Filtrar por contenido"/>
        </div>
      </div>

      <table
        class="min-w-full border border-border">
        <thead>
          <tr class="top-8 border border-border">

            <th v-for="(header, index) in headers" :key="index"
              class="relative px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider">
              <span class="">
                {{ header }}
              </span>

              <div class="absolute top-0 bottom-0 right-1 flex items-center">
                <Popover>
                  <template #default="{ showPopover }">
                    <div v-show="isFiltersActive" :class="{ 'bg-gray dark:bg-gray_dark': showPopover }"
                      class="hover:bg-focus/50 p-1 flex justify-center items-center cursor-pointer  ">
                      <Icon name="filter" />
                    </div>
                  </template>
                  <template #popover>
                    <div class="bg-background_alt">
                      <NavItem @click="sortByContent({ column: header, asc: true })"
                        class="bg-gray dark:bg-gray_dark shadow-sm shadow-gray_dark tracking-normal capitalize text-nowrap">
                        Ordenar de A a la Z
                      </NavItem>
                      <NavItem @click="sortByContent({ column: header })"
                        class="bg-gray dark:bg-gray_dark shadow-sm shadow-gray_dark tracking-normal capitalize text-nowrap">
                        Ordenar de Z a la A
                      </NavItem>
                    </div>
                  </template>
                </Popover>
              </div>

            </th>
          </tr>
        </thead>
        <tbody>
          <!-- Generate table rows dynamically -->
          <tr @click="callbackRow(index)" v-for="(row, index) in rows" :key="index"
            class="hover:bg-gray dark:hover:bg-gray_dark">
            <!-- <td v-for="(value, key) in row" :key="key" class="px-3 sm:px-6 border py-4 whitespace-nowrap text-center max-w-4 overflow-hidden sm:overflow-auto hover:max-w-max">{{ value }}</td> -->
            <td v-for="(value, key) in row" :key="key" class="px-6 py-4 whitespace-nowrap">
              <slot name="default" :value="value" :key="key" :row="row" :rowIndex="index">
                {{ value }}
              </slot>
            </td>
          </tr>
        </tbody>
      </table>

    </div>
  </Transition>
</template>


<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.3s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
