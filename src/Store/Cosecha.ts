import { defineStore } from 'pinia'

export const useCosechaStore = defineStore('cosechaStore', () => {
  const registros = ref<any[]>([])
  
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
  
  const nuevoRegistro = async (bodyNuevoRegistro: any) => {
    const response: any = await $fetch('/api/cosecha', {
      method: 'POST',
      body: JSON.stringify(bodyNuevoRegistro)
    })

    if(response.error === null ) {
      registros.value = [...registros.value, ...response.data]
    }
  }

  const registrarLlegada = async ( id: number, bodyRegistro: any) => {
    const response = await $fetch( `/api/cosecha/${id}`,{
      method: 'PUT',
      body: JSON.stringify(bodyRegistro)
    })

    console.log(response)
  }
  
  initCosecha()
  return {
    registros,
    nuevoRegistro,
    registrarLlegada
  }
})