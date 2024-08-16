<script setup>

const empleados = [
  {
    "id": 1,
    "created_at": "2024-04-23T16:46:50.455501+00:00",
    "nombre": "Ernesto Gutiérrez",
    "especialidad": "operador_1"
  },
  {
    "id": 2,
    "created_at": "2024-04-23T16:46:59.583322+00:00",
    "nombre": "Carlos Guzman",
    "especialidad": "operador_2"
  },
  {
    "id": 3,
    "created_at": "2024-04-23T16:47:08.766007+00:00",
    "nombre": "Carlos Armado Llanos",
    "especialidad": "operador_3"
  },
  {
    "id": 4,
    "created_at": "2024-04-23T16:47:24.365556+00:00",
    "nombre": "Jose",
    "especialidad": "auxiliar_1"
  },
  {
    "id": 5,
    "created_at": "2024-04-23T16:47:34.468854+00:00",
    "nombre": "Omar Fabian",
    "especialidad": "auxiliar_2"
  },
  {
    "id": 7,
    "created_at": "2024-04-23T16:47:58.57247+00:00",
    "nombre": "Rafael Alvis",
    "especialidad": "bodeguero"
  },
  {
    "id": 6,
    "created_at": "2024-04-23T16:47:47.083439+00:00",
    "nombre": "Hector ortiz",
    "especialidad": "auxiliar_3"
  }
]


</script>

<template>
  <HeaderDashboard>
    Empleados
  </HeaderDashboard>
  <NuxtLayout  name="content">
    <DataTable :data="empleados" />
  </NuxtLayout>
</template>