import { defineStore } from 'pinia'
import {useEmpleadosStore} from './Empleados'


export const useTaskStore = defineStore('taskStore', () => {
  const empleadoStore = useEmpleadosStore()


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

  const registrarTask = async ( data : any) => {
    const response = await $fetch(`/api/actividades`, {
      method: 'POST',
      body: JSON.stringify(data)
    })
    
    console.log(response)

    const [task] = response.data.tareaRealizada.data!
    tasks.value = [...tasks.value, task]

    const horasExtras = response.data.horasExtra?.data
    if(horasExtras && horasExtras.length) {
      await empleadoStore.initHorasExtra()
    }
  }
  
  initTask()
  return {
    tasks,
    registrarTask
  }
})