import type { Empleado, NewEmpleado } from '~/types/main'
import { defineStore } from 'pinia'

export const useEmpleadosStore = defineStore('empleadosStore', () => {
  
  // Empleados
  const empleados = ref<Empleado[]>([])
  
  const initEmpleados = ( mayTo = false ) => {
    if( mayTo || !empleados.value.length ) {
      $fetch(`/api/empleados`)
      .then((response) => {
        setEmpleados(response.data as never)
      })
    }
  }
  
  const setEmpleados = (data : Empleado[]) => {
    empleados.value = data
  }

  const create = async (fieldToNewEmpleado : NewEmpleado) => {
    const response = await $fetch('/api/empleados/', {
      method: 'POST',
      body: JSON.stringify(fieldToNewEmpleado)
    })
  
    if(response.error === null ) {
      empleados.value = [...empleados.value, ...response.data]
    }
  }
  
  const remove = async ( listId : Number[] ) => {
    const response = await $fetch('/api/empleados/', {
      method: 'DELETE',
      body: JSON.stringify({
        listId
      })
    })

    if( response.status === 204 ) {
      empleados.value = empleados.value.filter( (item : Empleado) => !listId.includes(item.id))
    }
    return response
  }

  const toggleOnActive = async ( empleado : Empleado ) => {
    const index = empleados.value.findIndex( item => item.id === empleado.id )
    empleados.value.splice(index, 1, {
      ...empleado,
      isActive: !empleado.isActive
    })

    return new Promise( (resolve) => {
      $fetch(`/api/empleados/${empleado.id}`, {
        method: 'PUT',
        body: JSON.stringify({isActive: !empleado.isActive})
      }).then( response => {
        if( response.status !== 200 ) {
          empleados.value.splice(index, 1, { ...empleado })
        }
        resolve('ok')
      })
    })
  } 


  //Horas extra
  const horasExtra = ref<any>([])

  const setHorasExtra = (data: any) => {
    horasExtra.value = data
  }

  const initHorasExtra = async (mayTo = false) => {
    if (mayTo || !horasExtra.value.length) {
      const response = await $fetch('/api/empleados/horasExtra/')
      setHorasExtra(response.data as never)
    }
  }







  initEmpleados()
  return {
    empleados,
    initEmpleados,
    setEmpleados,
    create,
    remove,
    toggleOnActive,
    horasExtra,
    initHorasExtra
  }
})