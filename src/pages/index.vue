<script  setup>
import { useTestStore } from '~/Store/TestStore';
const testStore = useTestStore();

const signIn = async ( ev) => {
  const fields = Object.fromEntries(new FormData(ev.target).entries());
  console.log(fields)
}

</script>

<template>
  <div class="h-[100vh] w-full bg-lime-100 flex justify-center items-center">
    <div class="w-[300px] min-h-[350px] bg-white p-4 pt-0 flex flex-col shadow-xl">
      <div class="text-center flex-grow flex justify-center items-center flex-col min-h-[5rem]">
        <span>
          Actualización digital
        </span>
        <h1>{{testStore.message}}</h1>
        <button @click="testStore.setMessage('Hola a todos con pinia')" >Change Message</button>
  
      </div>
      <form @submit.prevent="signIn" class="flex flex-col gap-4">
        <div class="wrapper-input flex flex-col gap-1">
          <label for="email">Correo electrónico</label>
          <input id="email" name="email" type="email" class="border border-gray p-2 rounded-md" />
        </div>
        <div class="wrapper-input flex flex-col gap-1">
          <label for="password">Contraseña</label>
          <input id="password" name="password" type="password" class="border border-gray p-2 rounded-md" />
        </div>
        <button class="bg-lime-500 text-white p-2 rounded-md">Iniciar sección</button>
      </form>
    </div>
  </div>
</template>