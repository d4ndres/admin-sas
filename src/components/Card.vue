<template>
  <div class="border border-color_border bg-color_bg_overflow rounded-lg p-4 inline-block">
    <div class="text-xl flex gap-2 items-center">
      <slot name="header"></slot>
    </div>
    <div class="card-body">
      <slot></slot>
    </div>
    <div class="card-footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>