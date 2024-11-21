import { defineStore } from 'pinia'

type NewEmpleado = {
  nombre: string,
  especialidad: string
}
type Empleado = {
  created_at: string,
  especialidad: string,
  id: Number,
  isActive: Boolean,
  nombre: string
}


export const useEmpleadosStore = defineStore('empleadosStore', () => {
  
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


  initEmpleados()
  return {
    empleados,
    initEmpleados,
    setEmpleados,
    create,
    remove,
    toggleOnActive
  }
})