<template>
  <button class="font-bold border-2 p-2 py-1 flex items-center gap-1 text-xs">
    <span>
      <slot>
        Nuevo registro
      </slot>
    </span>
    <div class="flex justify-center items-center cursor-pointer rounded-sm">
      <svg viewBox="0 0 24 24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
        class="stroke-red-700 stroke-4" style="width: 16px; height: 16px;">
        <line x1="12" y1="5" x2="12" y2="19"></line>
        <line x1="5" y1="12" x2="19" y2="12"></line>
      </svg>
    </div>
  </button>
</template>