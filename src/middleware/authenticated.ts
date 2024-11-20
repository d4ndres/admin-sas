export default defineNuxtRouteMiddleware((to) => {
  const user = useSupabaseUser()
  if( !user.value ) {
    return navigateTo('/')
  }

  if( to.name === 'home' ) {
    return navigateTo({ name: 'home-actividades'})
  }



})