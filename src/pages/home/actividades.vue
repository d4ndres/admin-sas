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

const mockPersonas = [
  { label: 'Carlos Armado Llanos', value: 3 },
  { label: 'Hector ortiz', value: 6 },
  { label: 'Jose', value: 4 },
  { label: 'Carlos Guzman', value: 2 },
  { label: 'Ernesto Gutiérrez', value: 1 }
]

let showModal = ref(false);
let formData = ref({})

const submitAddActividad = (ev) => {
  const fields = Object.fromEntries(new FormData(ev.target).entries())
  formData.value = fields
  console.log(formData.value)
}

const dateNow = () => (new Date()).toISOString().split('T')[0];


let horasExtrasAntes = ref(false)
let horasExtrasDespues = ref(false)


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
    <!-- 
    select -> empleado_id
    date -> fecha
    select -> labor
    number -> lote
    checkbox -> horasExtrasAntes () => despliega dos inputs mas
    - time -> horaInicioAntes
    - time -> horaFinAntes
    checkbox -> horasExtrasDespues () => despliega dos inputs mas
    - time -> horaInicioDespues
    - time -> horaFinDespues

    submit button
    -->

    <form @submit.prevent="submitAddActividad" >
      <div class="grid grid-cols-2 gap-x-4">
        <FormInputWrapper label="Trabajador" for="empleado_id">
          <FormInput id="empleado_id" name="empleado_id" type="select" :options="mockPersonas" />
        </FormInputWrapper>
        <FormInputWrapper label="Fecha" for="fecha">
          <FormInput id="fecha" name="fecha" type="date" :value="dateNow()" />
        </FormInputWrapper>
        <FormInputWrapper label="Labor" for="labor">
          <FormInput id="labor" name="labor" type="select" :options="mockPersonas" />
        </FormInputWrapper>
        <FormInputWrapper label="Lote" for="lote">
          <FormInput id="lote" name="lote" type="select" :options="mockPersonas" />
        </FormInputWrapper>
      </div>

      <div>
        <FormInputWrapper label="Horas extras antes" for="horasExtrasAntes" class="!flex-row !mb-1">
          <FormInput @change="($event) => horasExtrasAntes = $event.target.checked" :checked="horasExtrasAntes" type="checkbox" id="horasExtrasAntes" name="horasExtrasAntes" />
        </FormInputWrapper>
        <div class="grid grid-cols-2 gap-4" v-if="horasExtrasAntes">
          <FormInputWrapper label="Hora inicio" for="horaInicioAntes">
            <FormInput type="time" id="horaInicioAntes" name="horaInicioAntes" />
          </FormInputWrapper>
          <FormInputWrapper label="Hora final" for="horaFinalAntes">
            <FormInput type="time" id="horaFinalAntes" name="horaFinalAntes" />
          </FormInputWrapper>
        </div>
      </div>

      <div>
        <FormInputWrapper label="Horas extras después" for="horasExtrasDespues" class="!flex-row !mb-1">
          <FormInput @change="($event) => horasExtrasDespues = $event.target.checked" :checked="horasExtrasDespues" type="checkbox" id="horasExtrasDespues" name="horasExtrasDespues" />
        </FormInputWrapper>
        <div class="grid grid-cols-2 gap-4" v-if="horasExtrasDespues">
          <FormInputWrapper label="Hora inicio" for="horaInicioDespues">
            <FormInput type="time" id="horaInicioDespues" name="horaInicioDespues" />
          </FormInputWrapper>
          <FormInputWrapper label="Hora final" for="horaFinalDespues">
            <FormInput type="time" id="horaFinalDespues" name="horaFinalDespues" />
          </FormInputWrapper>
        </div>
      </div>
      
      <ButtonCancel type="submit">Enviar</ButtonCancel>
    </form>
  </OverflowAside>
</template>