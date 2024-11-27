import { defineStore } from 'pinia'

export const useCosechaStore = defineStore('cosechaStore', () => {
  const registros = ref([])
  
  const setCosecha = (data : any) => {
    registros.value = data
  }

  
  const initCosecha = ( mayTo = false ) => {
    if( mayTo || !registros.value.length ) {
      $fetch(`/api/cosecha`)
      .then((response) => {
        setCosecha(response.data as never)
      })
    }
  }
  
  
  initCosecha()
  return {
    registros
  }
})