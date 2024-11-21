import { defineStore } from 'pinia'

export const useActividadesStore = defineStore('actividadesStore', () => {
  const actividades = ref([])
  
  const initActividades = ( mayTo = false ) => {
    if( mayTo || !actividades.value.length ) {
      $fetch(`/api/actividadesRealizadas`)
      .then((response) => {
        setActividades(response.data as never)
      })
    }
  }

  const setActividades = (data : any) => {
    actividades.value = data
  }

  initActividades()
  return {
    actividades
  }
})