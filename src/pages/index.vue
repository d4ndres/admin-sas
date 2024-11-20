<script setup>
definePageMeta({
  middleware: 'unauthenticated'
})

const { auth } = useSupabaseClient()

const showLoader = ref(false)

const signIn = (ev) => {
  const credentials = Object.fromEntries(new FormData(ev.target).entries());

  showLoader.value = true
  auth.signInWithPassword(credentials)
    .then(response => {
      if (response.error) {
        throw response.error
      } else {
        // localStorage.setItem('user', JSON.stringify(response.data.user))
        navigateTo('/home')
      }
    })
    .catch(error => {
      console.error(error.message)
    })
    .finally(() => {
      showLoader.value = false
    })
}

</script>

<template>
  <div class="w-screen h-screen bg-color_bg flex justify-center items-center">
    <div class="w-[300px] bg-color_bg_overflow text-color_text_main border border-color_border rounded-md p-4">
      <form @submit.prevent="signIn">
        <FormInputWrapper label="Correo" for="email" class="mb-0">
          <FormInput name="email" id="email"></FormInput>
        </FormInputWrapper>
        <FormInputWrapper label="Contraseña" for="password">
          <FormInput name="password" id="password" type="password"></FormInput>
        </FormInputWrapper>
        <button>
          <ButtonTablon class="flex justify-center items-center text-lg py-1 w-min min-w-28 min-h-10">
            <span v-show="!showLoader">Ingresar</span>
            <Icon v-show="showLoader" name="loader"/>
          </ButtonTablon>
        </button>
      </form>
    </div>
  </div>
</template>