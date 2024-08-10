import {defineStore} from 'pinia'
import {ref, computed} from 'vue'
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


  const semillas = ref([])
  const setSemillas = (data: any) => {
    semillas.value = data
  }
  const getSemillasToSelect = () => semillas.value.map( (semilla: any) => ({value: semilla.id, label: semilla.nombre}) )

  const historialDeActividades = ref([])
  const setHistorialDeActividades = (data: any) => {
    historialDeActividades.value = data
  }
  const pushElementToHistorialDeActividades = (data: any) => {
    historialDeActividades.value.push(data as never)
  }
  const showHistorialDeActividadesToTable = computed(() => {
    return historialDeActividades.value.map( (actividad: any) => ({
      id: actividad.id,
      fecha: actividad.fecha,
      empleado: actividad.Empleado.nombre,
      actividad: actividad.Actividad.nombre,
      lote: actividad.Lote.nombre,
      semilla: actividad.Semilla?.nombre,
    }))
  })

  const horasExtra = ref([])
  const setHorasExtra = (data: any) => {
    horasExtra.value = data
  }
  const showHorasExtraToTable = computed(() => {
    return horasExtra.value.map( (horaExtra: any) => ({
      id: horaExtra.id,
      empleado: horaExtra.Empleado.nombre,
      actividad: horaExtra.EmpleadoActividadRealizada.Actividad.nombre,
      fecha: horaExtra.EmpleadoActividadRealizada.fecha,
      horaInicio: horaExtra.horaInicio,
      horaSalida: horaExtra.horaSalida,
    }))
  })


  return { 
    empleados, 
    setEmpleados, 
    getEmpleadosToSelect, 
    actividades, 
    setActividades, 
    getActividadesToSelect,
    lotes,
    setLotes,
    getLotesToSelect,
    semillas,
    setSemillas,
    getSemillasToSelect,
    historialDeActividades,
    setHistorialDeActividades,
    pushElementToHistorialDeActividades,
    showHistorialDeActividadesToTable,
    horasExtra,
    setHorasExtra,
    showHorasExtraToTable
  }
})