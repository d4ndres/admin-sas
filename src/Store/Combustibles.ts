import { defineStore } from 'pinia'
import { type Combustible } from '~/types/main'


export const useCombustiblesStore = defineStore('combustiblesStore', () => {
  const registroCombustibles = ref<any>([])

  const setRegistroCombustibles = (data: any) => {
    registroCombustibles.value = data
  }

  const initRegistroCombustibles = async (mayTo = false) => {
    if (mayTo || !registroCombustibles.value.length) {
      const response = await $fetch('/api/combustibles/registros')
      setRegistroCombustibles(response.data as never)
    }
  }







  const combustibles = ref<Combustible[]>([])

  const setCombustibles = (data: any) => {
    combustibles.value = data
  }


  const initCombustibles = (mayTo = false) => {
    if (mayTo || !combustibles.value.length) {
      $fetch(`/api/combustibles`)
        .then((response) => {
          setCombustibles(response.data as never)
        })
    }
  }

  const actualizarFrontendInventario = (combustible: Combustible) => {
    const index = combustibles.value.findIndex((item: Combustible) => item.id === combustible.id)
    combustibles.value.splice(index, 1, combustible)
  }

  const ingresoCombustible = async (bodyIngresoCombustible: any) => {
    const response: any = await $fetch('/api/combustibles/ingreso', {
      method: 'POST',
      body: JSON.stringify(bodyIngresoCombustible)
    })

    if (response.data.inventario) actualizarFrontendInventario(response.data.inventario[0])


    console.log(response.data)
    if (response.data.committed) {
      registroCombustibles.value = [...registroCombustibles.value, ...response.data.committed]
    }
  }

  const gastoCombustible = async (bodyGastoCombustible: any) => {
    const response: any = await $fetch('/api/combustibles/gasto', {
      method: 'POST',
      body: JSON.stringify(bodyGastoCombustible)
    })

    if (response.data.inventario) actualizarFrontendInventario(response.data.inventario[0])


    console.log(response.data)
    if (response.data.committed) {
      registroCombustibles.value = [...registroCombustibles.value, ...response.data.committed]
    }
  }


  initCombustibles()
  return {
    combustibles,
    ingresoCombustible,
    gastoCombustible,
    registroCombustibles,
    initRegistroCombustibles
  }
})