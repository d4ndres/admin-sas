<script setup>
const router = useRouter()

</script>


<template>
  <div @mousedown="router.back" class="overflow bg-black/20 backdrop-blur-md z-50 fixed  h-full w-full left-0 top-0">
    <div @mousedown.stop
      class="curtain fixed w-screen max-w-2xl right-0 inset-y-0 bg-color_bg_overflow border-l border-color_border flex flex-col">
      <div class="h-14 border-b border-color_border p-4">
        <slot name="header"></slot>
      </div>
      <div class="p-4 overflow-auto h-full">
        <slot></slot>
      </div>
    </div>
  </div>
</template>


<style scoped>
.overflow {
  backdrop-filter: blur(4px);
  transition: .5s;
  @starting-style{
    backdrop-filter: blur(0);
  }
}


.curtain {
  transform: translateX(0%);
  transition: .5s;
  @starting-style{
    transform: translateX(100%);
  }
}

</style>