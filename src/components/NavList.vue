<script setup >
import { useExpanded } from '~/Store/AsideExpanded';
const store = useExpanded();
const { isExpanded } = storeToRefs(store);

const navList = [
  { path: '/home', text: 'Home', icon: 'home-outline' },
  { path: '/home/empleados', text: 'Empleados', icon: 'address-card' },
  { path: '/home/actividades', text: 'Actividades', icon: 'clippy' },
  { path: '/home/horas_extra', text: 'Horas extra', icon: 'clock' },
  { path: '/home/combustibles', text: 'Combustibles', icon: 'oil' }
]

const username = computed(() => 'admin');
const logout = () => {
  console.log('logout');
}

</script>
<template>
  <aside class="border-r  flex flex-col transition-all duration-300">
    
    <div @click="store.toggleExpanded" class="h-12 hover:bg-red-100 flex items-center justify-start cursor-pointer">
      <li class="px-4 list-none flex gap-1 items-center">
        <Icon v-show="isExpanded" size="24" name="arrow-shape-left-to-line" />
        <Icon v-show="!isExpanded" size="24" name="arrow-shape-right-to-line" />
      </li>
    </div>

    <div class="flex-1">
      <NavItem v-for="item in navList" :key="item.path" :dataItem="item" />
    </div>
    <div class="">


      <div class="h-12 flex items-center hover:bg-red-100 cursor-pointer">
        <li class="px-4 list-none flex gap-1 items-center">
          <Icon size="18" name="user" />
          <span v-show="isExpanded">{{ username }}</span>
        </li>
      </div>

      <div @click="logout" class="h-12 flex items-center hover:bg-red-100 cursor-pointer">
        <li class="px-4 list-none flex gap-1 items-center">
          <Icon size="18" name="logout" />
          <span v-show="isExpanded">Cerrar sesión</span>
        </li>
      </div>
    </div>
  </aside>
</template>