<script setup>



</script>

<template>
  <header id="header">


    <!-- <div class="mr-auto">
      <BreadCrumb />
    </div> -->
    <div
      class="border-b border-gray dark:border-gray_dark transition-all duration-300 min-h-12 flex items-center justify-between px-4">
      <h2 class="text-2xl font-bold">
        <slot>Title</slot>
      </h2>
      <div class="flex gap-4">
        <slot name="buttons">

        </slot>
      </div>
    </div>
  </header>
</template>
