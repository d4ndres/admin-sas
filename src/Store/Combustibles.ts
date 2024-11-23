import { defineStore } from 'pinia'
import {type Combustible} from '~/types/main'


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


  const actualizarFrontendInventario = ( combustible : Combustible ) => {
    const index = combustibles.value.findIndex( (item : Combustible) => item.id === combustible.id )
    combustibles.value.splice(index, 1, combustible)
  } 

  const ingresoCombustible = async ( bodyIngresoCombustible :  any ) => {
    const response : any = await $fetch('/api/combustibles/ingreso', {
      method: 'POST',
      body: JSON.stringify(bodyIngresoCombustible)
    })
    
    if( response.data.inventario ) actualizarFrontendInventario(response.data.inventario[0])
  }
  
  const gastoCombustible = async ( bodyGastoCombustible : any) => {
    const response : any  = await $fetch('/api/combustibles/gasto', {
      method: 'POST',
      body: JSON.stringify(bodyGastoCombustible)
    })
    
    if( response.data.inventario ) actualizarFrontendInventario(response.data.inventario[0])
  }
  
  
  initCombustibles()
  return {
    combustibles,
    ingresoCombustible,
    gastoCombustible
  }
})