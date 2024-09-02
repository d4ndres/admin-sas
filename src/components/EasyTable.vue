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
  return props.data.map(row => {
    return computedColumns.value.reduce((acc, { bindKey, autoValue  }) => {
      if (bindKey in row) {
        acc[bindKey] = row[bindKey];
      } else if (typeof autoValue === 'function') {
        acc[bindKey] = autoValue(row);
      } else {
        acc[bindKey] = null;
      }
      return acc;
    }, {});
  });
});


</script>

<template>
  <pre>
    {{computedData}}
  </pre>
  <table class="min-w-full border border-border text-text_main">
    <thead>
      <tr class="top-8 border border-border">
        <th class="relative px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider"
          v-for="({ bindKey, text }) in computedColumns" :key="`h_${bindKey}`">
          <span>
            {{ text }}
          </span>
        </th>
      </tr>
    </thead>
    <tbody>

      <tr v-for="(row, index) in computedData" :key="index"
        class="hover:bg-gray dark:hover:bg-gray_dark">
        <td v-for="(value, key) in row" :key="key" class="px-6 py-4 whitespace-nowrap">
          <slot name="default" :value="value" :key="key" :row="row" :rowIndex="index">
            {{ value }}
          </slot>
        </td>
      </tr>
    </tbody>
  </table>
</template>