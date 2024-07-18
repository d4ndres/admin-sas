<script setup>
import { useControlAsideStore } from '~/Store/ControlAside';
const controlAside = useControlAsideStore();

// onMounted(() => {
//   const handleResize = () => {
//     isExpanded.value = window.innerWidth >= 768;
//   };
//   handleResize();
//   window.addEventListener('resize', handleResize); // Actualizar el valor de isExpanded cuando se cambie el tamaño de la ventana
// });


// dark mode - #1F1F1F
</script>

<template>
  <div class="flex h-[100vh] ">
    <NavList :class="{ 'min-w-[250px] ': controlAside.isAsideOpen, 'min-w-[50px]': !controlAside.isAsideOpen }" />

    <!-- <HeaderDashboard /> -->
    <main class="w-full overflow-auto">
      <slot></slot>
    </main>
  </div>
</template>