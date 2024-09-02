<script setup >
definePageMeta({
  middleware: 'authenticated'
})

const navItems = [
  { path: '/home', text: 'Home', icon: 'home-outline' },
  { path: '/home/empleados', text: 'Empleados', icon: 'address-card' },
  { path: '/home/actividades', text: 'Actividades', icon: 'clippy' },
  { path: '/home/horas_extra', text: 'Horas extra', icon: 'clock' },
  { path: '/home/combustibles', text: 'Combustibles', icon: 'oil' }
]

</script>

<template>
  <NuxtLayout :navItems="navItems">
    <NuxtPage></NuxtPage>
  </NuxtLayout>
</template>