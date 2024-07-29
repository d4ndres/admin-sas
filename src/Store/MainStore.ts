import {defineStore} from 'pinia'
import {ref} from 'vue'
export const useMainStore = defineStore('mainStore', () => {
  const empleados = ref([])
  const setEmpleados = (data: any) => {
    empleados.value = data
  }
  const getEmpleadosToSelect = () => empleados.value.map( (empleado: any) => ({value: empleado.id, label: empleado.nombre}) )

  const actividades = ref([])
  const setActividades = (data: any) => {
    actividades.value = data
  }
  const getActividadesToSelect = () => actividades.value.map( (actividad: any) => ({value: actividad.id, label: actividad.nombre}) )


  const lotes = ref([])
  const setLotes = (data: any) => {
    lotes.value = data
  }
  const getLotesToSelect = () => lotes.value.map( (lote: any) => ({value: lote.id, label: lote.nombre}) )

  return { 
    empleados, 
    setEmpleados, 
    getEmpleadosToSelect, 
    actividades, 
    setActividades, 
    getActividadesToSelect,
    lotes,
    setLotes,
    getLotesToSelect
  }
})