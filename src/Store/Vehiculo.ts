import { defineStore } from 'pinia'

export const useVehiculosStore = defineStore('vehiculosStore', () => {
  const vehiculos = ref([])
  
  const setVehiculos = (data : any) => {
    vehiculos.value = data
  }

  const initVehiculos = ( mayTo = false ) => {
    if( mayTo || !vehiculos.value.length ) {
      $fetch(`/api/vehiculo`)
      .then((response) => {
        setVehiculos(response.data as never)
      })
    }
  }
  
  
  initVehiculos()
  return {
    vehiculos
  }
})