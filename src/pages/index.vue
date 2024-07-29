<script  setup>
definePageMeta({
  middleware: 'unauthenticated'
})

const { auth } = useSupabaseClient()

const showLoader = ref(false)

const signIn = ( ev ) => {
  const credentials = Object.fromEntries(new FormData(ev.target).entries());
  showLoader.value = true    
  auth.signInWithPassword(credentials)
  .then( response => {
    if( response.error ) {
      throw response.error
    } else {
      navigateTo('/home')
    }
  })
  .catch( error => {
    console.error(error.message)
  })
  .finally( () => {
    showLoader.value = false
  })
}

</script>

<template>
  <div class="h-[100vh] w-full bg-lime-100 flex justify-center items-center bg-green_light dark:bg-green">
    <div class="w-[300px] min-h-[350px] bg-white dark:bg-dark dark:text-gray_dark_font p-4 pt-0 flex flex-col shadow-xl">
      <div class="text-center flex-grow flex justify-center items-center flex-col min-h-[5rem]">
        <span>
          Actualización digital
        </span>
      </div>
      <form @submit.prevent="signIn" class="flex flex-col gap-4">
        <FormInputWrapper label="Correo" for="email">
          <FormInput  id="email" name="email" type="email" required/>
        </FormInputWrapper>
        <FormInputWrapper label="Contraseña" for="password">
          <FormInput  id="password" name="password" type="password" required/>
        </FormInputWrapper>
        <button class="bg-lime-500 p-2 rounded-md border border-1 dark:border-gray_dark">Iniciar sección</button>
      </form>
    </div>
  </div>
</template>