<script setup>
import { useControlAsideStore } from '~/Store/ControlAside';
const store = useControlAsideStore()
const {isMinimalist} = storeToRefs(store)

defineProps({
  type: {
    type: String,
    default: 'add'
  },
})



</script>


<template>
  <button class="border-2 border-gray dark:border-gray_dark text-md px-2 flex items-center gap-2">
    <span v-show="!isMinimalist">
      <slot>
        Nuevo registro
      </slot>
    </span>
    <div class="flex justify-center items-center cursor-pointer rounded-sm">
      <svg v-if="type == 'add'" viewBox="0 0 24 24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
        class="stroke-red stroke-4 fill-none" style="width: 16px; height: 16px;">
        <line x1="12" y1="5" x2="12" y2="19"></line>
        <line x1="5" y1="12" x2="19" y2="12"></line>
      </svg>
      <svg v-else-if="type == 'minus'" viewBox="0 0 24 24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
        class="stroke-red stroke-4 fill-none" style="width: 16px; height: 16px;">
        <line x1="5" y1="12" x2="19" y2="12"></line>
      </svg>
      <svg v-else-if="type == 'down'" viewBox="0 0 24 24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
        class="stroke-red stroke-4 fill-none" style="width: 16px; height: 16px;">
        <path d="M12 19L5 12L8 12L8 5L16 5L16 12L19 12L12 19Z"></path>
      </svg>
      <svg v-else-if="type == 'up'" viewBox="0 0 24 24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
        class="stroke-red stroke-4 fill-none" style="width: 16px; height: 16px;">
        <path d="M12 5L19 12L16 12L16 19L8 19L8 12L5 12L12 5Z"></path>
      </svg>
    </div>
  </button>
</template>