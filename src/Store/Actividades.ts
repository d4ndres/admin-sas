import { defineStore } from 'pinia'

export const useActividadesStore = defineStore('actividadesStore', () => {
  const actividades = ref([])
  
  const setActividades = (data : any) => {
    actividades.value = data
  }

  
  const initActividades = ( mayTo = false ) => {
    if( mayTo || !actividades.value.length ) {
      $fetch(`/api/actividades`)
      .then((response) => {
        setActividades(response.data as never)
      })
    }
  }
  
  
  initActividades()
  return {
    actividades
  }
})