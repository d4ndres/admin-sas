<script setup>
const actividades = [
  {
    "id": 45,
    "created_at": "2024-05-05T15:50:18.522791+00:00",
    "fecha": "2024-05-08",
    "labor": "Prueba",
    "lote": "2",
    "empleado_id": 3,
    "Empleado": {
      "id": 3,
      "nombre": "Carlos Armado Llanos"
    }
  },
  {
    "id": 46,
    "created_at": "2024-05-05T20:49:35.199597+00:00",
    "fecha": "2024-05-20",
    "labor": "2",
    "lote": "3",
    "empleado_id": 3,
    "Empleado": {
      "id": 3,
      "nombre": "Carlos Armado Llanos"
    }
  },
  {
    "id": 47,
    "created_at": "2024-05-05T20:57:51.8776+00:00",
    "fecha": "2024-05-14",
    "labor": "21",
    "lote": "2",
    "empleado_id": 3,
    "Empleado": {
      "id": 3,
      "nombre": "Carlos Armado Llanos"
    }
  },
  {
    "id": 48,
    "created_at": "2024-05-06T05:18:42.699864+00:00",
    "fecha": "2024-05-16",
    "labor": "prueba 2",
    "lote": "2",
    "empleado_id": 6,
    "Empleado": {
      "id": 6,
      "nombre": "Hector ortiz"
    }
  },
  {
    "id": 49,
    "created_at": "2024-05-06T16:00:30.085569+00:00",
    "fecha": "2024-05-15",
    "labor": "e",
    "lote": "2",
    "empleado_id": 3,
    "Empleado": {
      "id": 3,
      "nombre": "Carlos Armado Llanos"
    }
  },
  {
    "id": 50,
    "created_at": "2024-05-06T16:01:12.631404+00:00",
    "fecha": "2024-05-02",
    "labor": "prueba",
    "lote": "2",
    "empleado_id": 4,
    "Empleado": {
      "id": 4,
      "nombre": "Jose"
    }
  },
  {
    "id": 51,
    "created_at": "2024-05-07T03:10:05.305078+00:00",
    "fecha": "2024-05-05",
    "labor": "CORTE",
    "lote": "3",
    "empleado_id": 1,
    "Empleado": {
      "id": 1,
      "nombre": "Ernesto Gutiérrez"
    }
  },
  {
    "id": 52,
    "created_at": "2024-05-07T21:10:10.412719+00:00",
    "fecha": "2024-05-05",
    "labor": "CORTE",
    "lote": "2",
    "empleado_id": 4,
    "Empleado": {
      "id": 4,
      "nombre": "Jose"
    }
  },
  {
    "id": 53,
    "created_at": "2024-05-10T15:39:04.62441+00:00",
    "fecha": "2024-05-01",
    "labor": "CORTE",
    "lote": "2",
    "empleado_id": 4,
    "Empleado": {
      "id": 4,
      "nombre": "Jose"
    }
  },
  {
    "id": 54,
    "created_at": "2024-05-11T20:11:56.680777+00:00",
    "fecha": "2024-05-11",
    "labor": "Rastra",
    "lote": "1",
    "empleado_id": 4,
    "Empleado": {
      "id": 4,
      "nombre": "Jose"
    }
  },
  {
    "id": 55,
    "created_at": "2024-05-14T15:44:30.42108+00:00",
    "fecha": "2024-05-16",
    "labor": "Prueba",
    "lote": "2",
    "empleado_id": 2,
    "Empleado": {
      "id": 2,
      "nombre": "Carlos Guzman"
    }
  },
  {
    "id": 56,
    "created_at": "2024-05-15T20:36:25.872054+00:00",
    "fecha": "2024-05-14",
    "labor": "CORTE",
    "lote": "4",
    "empleado_id": 4,
    "Empleado": {
      "id": 4,
      "nombre": "Jose"
    }
  },
  {
    "id": 57,
    "created_at": "2024-05-17T18:24:01.183561+00:00",
    "fecha": "2024-05-16",
    "labor": "Rh",
    "lote": "10",
    "empleado_id": 4,
    "Empleado": {
      "id": 4,
      "nombre": "Jose"
    }
  },
  {
    "id": 58,
    "created_at": "2024-05-23T20:35:00.453334+00:00",
    "fecha": "2024-05-21",
    "labor": "L",
    "lote": "10",
    "empleado_id": 4,
    "Empleado": {
      "id": 4,
      "nombre": "Jose"
    }
  },
  {
    "id": 59,
    "created_at": "2024-05-26T02:16:38.088439+00:00",
    "fecha": "2024-05-16",
    "labor": "OBSERVACIÓN ",
    "lote": "3",
    "empleado_id": 4,
    "Empleado": {
      "id": 4,
      "nombre": "Jose"
    }
  },
  {
    "id": 60,
    "created_at": "2024-05-26T02:16:39.034384+00:00",
    "fecha": "2024-05-16",
    "labor": "OBSERVACIÓN ",
    "lote": "3",
    "empleado_id": 4,
    "Empleado": {
      "id": 4,
      "nombre": "Jose"
    }
  }
]
let showModal = ref(false);
</script>


<template>
  <HeaderDashboard>
    <h2 class="text-2xl">Actividades</h2>

    <div>
      <ButtonAdd @click="showModal = !showModal" />
    </div>
  </HeaderDashboard>
  <NuxtLayout name="content">
    <DataTable :data="actividades" />
  </NuxtLayout>

  <OverflowAside v-model="showModal">
    <template #header>
      <h2 class="text-2xl">Ingreso de actividades</h2>
    </template>

    <LogicIngresoDeActividades />

    <template #otherButtons>
      <ButtonCancel type="submit" form="IngresoDeActividades">Enviar</ButtonCancel>
    </template>
  </OverflowAside>
</template>


