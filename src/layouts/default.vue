<script setup>
import { useControlAsideStore } from '~/Store/ControlAside';
const store = useControlAsideStore()
const { isAsideOpen, isMinimalist } = storeToRefs(store)
const { setMinimalist } = store

onMounted(() => {
  const handleResize = () => {
    store.setAsideOpen(window.innerWidth > 768);
    setMinimalist(window.innerWidth < 768)
  };
  handleResize();
  window.addEventListener('resize', handleResize); // Actualizar el valor de isExpanded cuando se cambie el tamaño de la ventana
});


const navList = [
  { path: '/admin/dashboard', text: 'Dashboard', icon: 'home-outline' },
  { path: '/admin/devices', text: 'Devices', icon: 'address-card' },
  { path: '/admin/alarms', text: 'Alarms', icon: 'clock' },
  { path: '/admin/templates', text: 'Templates', icon: 'clippy' },
]

</script>

<template>
  <div class="bg-background  flex md:flex-row flex-col-reverse h-[100vh] transition-[background]">
    <NavList class="border-r border-gray flex md:flex-col " :class="{
      'min-w-[250px] ': isAsideOpen,
      'min-w-[50px]': !isAsideOpen
    }">
      <RouterLink v-for="item in navList" :key="item.path" :to="item.path">
        <NavItem :isExpanded="isAsideOpen" :dataItem="item" />
      </RouterLink>

    </NavList>

    <!-- <HeaderDashboard /> -->
    <main class="w-full h-full overflow-auto">
      <slot></slot>
    </main>
  </div>
</template>