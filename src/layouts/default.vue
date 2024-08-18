<script setup>
import { useControlAsideStore } from '~/Store/ControlAside';
const store = useControlAsideStore()
const {isAsideOpen, isMinimalist} = storeToRefs(store)
const {setMinimalist} = store

onMounted(() => {
  const handleResize = () => {
    store.setAsideOpen(window.innerWidth > 768);
    setMinimalist(window.innerWidth < 768)
  };
  handleResize();
  window.addEventListener('resize', handleResize); // Actualizar el valor de isExpanded cuando se cambie el tamaño de la ventana
});


// dark mode - #1F1F1F
</script>

<template>
  <div class="flex md:flex-row flex-col-reverse h-[100vh] bg-vainilla dark:bg-dark dark:text-gray_dark_font transition-[background] duration-300">
    <NavList 
    
    class="border-r border-gray dark:border-gray_dark flex md:flex-col transition-all duration-300"
    :class="{ 
      'min-w-[250px] ': isAsideOpen, 
      'min-w-[50px]': !isAsideOpen 
      }" />

    <!-- <HeaderDashboard /> -->
    <main class="w-full h-full overflow-auto">
      <slot></slot>
    </main>
  </div>
</template>