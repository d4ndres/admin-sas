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


const { auth } = useSupabaseClient()
const logout = async () => {
  const something = await auth.signOut()
  if(something.error) {
    console.log('logout', something);
  }
  localStorage.removeItem('user')
  return navigateTo('/')
}



const darkMode = ref(false)
const toggleDarkMode = () => {
  darkMode.value = !darkMode.value
  document.documentElement.classList.toggle('dark')
  localStorage.setItem('darkMode', darkMode.value ? 'true' : 'false')
}
onMounted(() => {
  darkMode.value = localStorage.getItem('darkMode') === 'true'
})
</script>
<template>
  <aside>
    
    <NavItem @click="toggleAside" class="md:visible invisible hidden md:flex">
      <Icon v-show="isAsideOpen" size="24" name="arrow-shape-left-to-line" />
      <Icon v-show="!isAsideOpen" size="24" name="arrow-shape-right-to-line" />
    </NavItem>

    <div class="flex-1 overflow-y-auto overflow-x-hidden flex flex-row md:flex-col">
      <RouterLink v-for="item in navList" :key="item.path" :to="item.path">
        <NavItem :isExpanded="isAsideOpen" :dataItem="item" />
      </RouterLink>
    </div>
    <div class="flex flex-row md:flex-col">

      <NavItem @click="toggleDarkMode" >
          <Icon v-show="!darkMode" size="18" name="moon" />
          <Icon v-show="darkMode" size="18" name="sun" />
          <span v-show="isAsideOpen">{{ darkMode ? 'Light' : 'Dark' }}</span>
      </NavItem>

      <!-- <NavItem>
          <Icon size="18" name="user" />
          <span v-show="isAsideOpen">{{ username }}</span>
      </NavItem> -->

      <NavItem @click="logout" >
          <Icon size="18" name="logout" />
          <span v-show="isAsideOpen">Cerrar sesión</span>
      </NavItem>
    </div>
  </aside>
</template>