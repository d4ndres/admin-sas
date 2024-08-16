<template>
  <button class="font-bold border-2 border-gray dark:border-gray_dark p-2 py-1 flex items-center justify-center gap-1 text-xs w-full ">
    <span>
      <slot>
        Nuevo registro
      </slot>
    </span>
    <div class="flex justify-center items-center cursor-pointer rounded-sm">
      <svg viewBox="0 0 24 24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
        class="stroke-red stroke-4" style="width: 16px; height: 16px;">
        <line x1="5" y1="12" x2="19" y2="12"></line>
      </svg>
    </div>
  </button>
</template>