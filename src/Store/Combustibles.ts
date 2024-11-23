import { defineStore } from 'pinia'
import combustiblesInventario from '~/server/api/combustiblesInventario'

type Combustible = {
  id: number,
  nombre: string,
  cantidadActual: number
}


export const useCombustiblesStore = defineStore('combustiblesStore', () => {
  const combustibles = ref<Combustible[]>([])
  
  const setCombustibles = (data : any) => {
    combustibles.value = data
  }

  
  const initCombustibles = ( mayTo = false ) => {
    if( mayTo || !combustibles.value.length ) {
      $fetch(`/api/combustibles`)
      .then((response) => {
        setCombustibles(response.data as never)
      })
    }
  }

  const ingresoCombustible = async ( bodyIngresoCombustible :  any ) => {
    const response  = await $fetch('/api/combustibles/ingreso', {
      method: 'POST',
      body: JSON.stringify(bodyIngresoCombustible)
    })
    
    if( response.data.inventario ) {
      const [data] : Combustible[] = response.data.inventario 
      const index = combustibles.value.findIndex( (item : Combustible) => item.id === data.id )
      combustibles.value.splice(index, 1, data)

    }
  } 
  
  
  initCombustibles()
  return {
    combustibles,
    ingresoCombustible
  }
})