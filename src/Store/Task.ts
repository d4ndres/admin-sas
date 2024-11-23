import { defineStore } from 'pinia'

export const useTaskStore = defineStore('taskStore', () => {
  const tasks = ref([])
  
  const setTask = (data : any) => {
    tasks.value = data
  }

  const initTask = ( mayTo = false ) => {
    if( mayTo || !tasks.value.length ) {
      $fetch(`/api/actividadesRealizadas`)
      .then((response) => {
        setTask(response.data as never)
      })
    }
  }

  const registrarTask = ( data : any) => {
    console.log(data)
  }
  
  
  initTask()
  return {
    tasks,
    registrarTask
  }
})