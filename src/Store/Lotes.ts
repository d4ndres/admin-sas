import { defineStore } from 'pinia'

export const useLotesStore = defineStore('lotesStore', () => {
  const lotes = ref([])
  
  const setLotes = (data : any) => {
    lotes.value = data
  }

  const initLotes = ( mayTo = false ) => {
    if( mayTo || !lotes.value.length ) {
      $fetch(`/api/lotes`)
      .then((response) => {
        setLotes(response.data as never)
      })
    }
  }
  
  
  initLotes()
  return {
    lotes
  }
})