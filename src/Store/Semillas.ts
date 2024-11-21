import { defineStore } from 'pinia'

export const useSemillasStore = defineStore('semillasStore', () => {
  const semillas = ref([])
  
  const setSemillas = (data : any) => {
    semillas.value = data
  }

  const initSemillas = ( mayTo = false ) => {
    if( mayTo || !semillas.value.length ) {
      $fetch(`/api/semillas`)
      .then((response) => {
        setSemillas(response.data as never)
      })
    }
  }
  
  
  initSemillas()
  return {
    semillas
  }
})