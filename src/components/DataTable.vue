<script setup>

const props = defineProps({
  data: {
    type: Array,
    required: true
  },
  columns: {
    type: Array,
    default: () => []
  }
});

const headers = computed(() => {
  if( props.columns.length ) {
    return props.columns
  }
  if( !props.data.length ) {
    return []
  }
  return Object.keys(props.data[0]);
});

const rows = computed(() => {
  // Return the data array excluding the first object (header row)
  return props.data
});



</script>


<template>

  <table class="min-w-full border border-gray dark:border-gray_dark transition-all duration-300">
    <thead>
      <tr>
        <!-- Generate table header dynamically -->
        <th class="px-6 py-3 border-b border-gray dark:border-gray_dark transition-[border] duration-300 text-left text-xs font-semibold uppercase tracking-wider" v-for="(header, index) in headers" :key="index" >{{ header }}</th>
      </tr>
    </thead>
    <tbody>
      <!-- Generate table rows dynamically -->
      <tr v-for="(row, index) in rows" :key="index" class="hover:bg-green_light dark:hover:bg-green">
        <td v-for="(value, key) in row" :key="key" class="px-6 py-4 whitespace-nowrap">{{ value }}</td>
      </tr>
    </tbody>
  </table>

</template>
