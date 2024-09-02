<script setup>

const navItems = [
  { path: '/admin/dashboard', text: 'Dashboard', icon: 'home-outline' },
  { path: '/admin/devices', text: 'Devices', icon: 'address-card' },
  { path: '/admin/alarms', text: 'Alarms', icon: 'clock' },
  { path: '/admin/templates', text: 'Templates', icon: 'clippy' },
]


</script>

<template>
  <NuxtLayout :navItems="navItems">
    <NuxtPage></NuxtPage>
  </NuxtLayout>
</template>