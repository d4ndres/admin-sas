<script setup>
const layoutCustomProps = useAttrs()

</script>

<template>
  <div class="h-[100vh] flex flex-col ">
    <slot name="header">
      <header class="min-h-12 border-b border-border flex items-center justify-between px-4">
        <h2 class="text-2xl text-text_main uppercase">
          {{ layoutCustomProps.title }}
        </h2>
        <div class="flex gap-4">
          <slot name="buttons">
          </slot>
        </div>
      </header>
    </slot>
    <div class="p-4 overflow-auto bg-background_body" style="height: calc(100vh - 3rem);">
      <slot />
    </div>
  </div>
</template>