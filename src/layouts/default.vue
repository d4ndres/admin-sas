<script setup>
import { useControlAsideStore } from '~/Store/ControlAside';
const store = useControlAsideStore()
const { isAsideOpen, isMinimalist } = storeToRefs(store)
const { setMinimalist } = store

// onMounted(() => {
//   const handleResize = () => {
//     store.setAsideOpen(window.innerWidth > 768);
//     setMinimalist(window.innerWidth < 768)
//   };
//   handleResize();
//   window.addEventListener('resize', handleResize); // Actualizar el valor de isExpanded cuando se cambie el tamaño de la ventana
// });

defineProps({
  navItems: {
    type: Array,
  }
})

</script>

<template>
  <div class="bg-background text-text_main flex md:flex-row flex-col-reverse h-[100vh] transition-[background]">
    <NavList class="border-r border-border flex md:flex-col " :class="{
      'min-w-[250px] ': isAsideOpen,
      'min-w-[50px]': !isAsideOpen
    }">
      <RouterLink 
      v-for="item in navItems" :key="item.path" :to="item.path">
        <NavItem :isExpanded="isAsideOpen" :dataItem="item" />
      </RouterLink>

    </NavList>

    <main class="w-full h-full overflow-auto">
      <slot></slot>
    </main>
  </div>
</template>

<style scoped>
.router-link-active {
  background: theme('colors.background_body');
}
</style>