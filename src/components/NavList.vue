<script setup>
import { useControlAsideStore } from '~/Store/ControlAside';
const store = useControlAsideStore()
const {isAsideOpen} = storeToRefs(store)
const {toggleAside} = store


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
    
    <div @click="toggleAside" class="h-12 hover:bg-red-100 flex items-center justify-start cursor-pointer">
      <li class="px-4 list-none flex gap-1 items-center">
        <Icon v-show="isAsideOpen" size="24" name="arrow-shape-left-to-line" />
        <Icon v-show="!isAsideOpen" size="24" name="arrow-shape-right-to-line" />
      </li>
    </div>

    <div class="flex-1">
      <NavItem :isExpanded="isAsideOpen" v-for="item in navList" :key="item.path" :dataItem="item" />
    </div>
    <div class="">


      <div class="h-12 flex items-center hover:bg-red-100 cursor-pointer">
        <li class="px-4 list-none flex gap-1 items-center">
          <Icon size="18" name="user" />
          <span v-show="isAsideOpen">{{ username }}</span>
        </li>
      </div>

      <div @click="logout" class="h-12 flex items-center hover:bg-red-100 cursor-pointer">
        <li class="px-4 list-none flex gap-1 items-center">
          <Icon size="18" name="logout" />
          <span v-show="isAsideOpen">Cerrar sesión</span>
        </li>
      </div>
    </div>
  </aside>
</template>