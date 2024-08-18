import {defineStore} from 'pinia'
import {ref, computed} from 'vue'
export const useMainStore = defineStore('mainStore', () => {
  const empleados : any = ref([])
  const setEmpleados = (data: any) => {
    empleados.value = data
  }
  // const getEmpleadosToSelect = () => empleados.value.map( (empleado: any) => ({value: empleado.id, label: empleado.nombre}) )
  const getEmpleadosToSelect = computed(() => {
    return empleados.value.map( (empleado : any) => {
      return {
        value: empleado.id,
        label: empleado.nombre
    }})
  })

  const toggleStateEmpleadosFromTable = (data: any) => {
    const index = empleados.value.findIndex((empleado: any) => empleado.id == data.id)
    const updatedEmpleado = {
      id: data.id,
      nombre: data.nombre,
      especialidad: data.especialidad,
      isActive: !data.estado
    }
    empleados.value.splice(index, 1, updatedEmpleado)
  }


  const getEmpleadosToTable = computed(() => {
    return empleados.value.map( (empleado : any) => {
      return {
        id: empleado.id,
        nombre: empleado.nombre,
        especialidad: empleado.especialidad,
        estado: empleado.isActive,
      }
    })
  })

  const pushElementToEmpleado = ( empleado : any) => {
    empleados.value.push(empleado)
  }

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

  const vehiculos = ref([])
  const setVehiculos = (data: any) => {
    vehiculos.value = data
  }
  const getVehiculosToSelect = computed(() => {
    return vehiculos.value.map( (vehiculo: any) => ({value: vehiculo.id, label: vehiculo.nombre}) )
  })

  const combustibles : any = ref([])
  const setCombustibles = (data: any) => {
    combustibles.value = data
  }
  const showCombustiblesToTable = computed(() => {
    return combustibles.value
  })

  const getCombustiblesToSelect = computed(() => {
    return combustibles.value.map( (combustible: any) => ({value: combustible.id, label: combustible.nombre}) )
  })

  const updateElementInCombustibles = ( data: any) => {
    const index = combustibles.value.findIndex( (combustible: any) => combustible.id == data.id )
    combustibles.value[index] = data
  }

  const combustiblesHistorial : any = ref([])
  const pushElementToCombustiblesHistorial = (data: any) => {
    data.forEach( (element: any) => {
      const index = combustiblesHistorial.value.findIndex( (combustibleHistorial: any) => combustibleHistorial.id == element.id )
      if (index == -1) {
        combustiblesHistorial.value.push(element)
      }
    })
  }
  const showCombustiblesHistorialToTable = (combustible_id : any) => {
    const elementLog = combustiblesHistorial.value.filter( ({combustible_id} : any) => combustible_id == combustible_id )
    return elementLog.map( (element : any) => ({
      id: element.id,
      fecha: element.fecha,
      cantidad: element.cantidad,
      valorTotal: element.valorTotal,
      user_id: element.user_id,
      nombre: element.CombustibleInventario?.nombre,
      lote: element.CombustibleGasto?.Lote.nombre,
      empleado: element.CombustibleGasto?.Empleado.nombre,
      vehiculo: element.CombustibleGasto?.Vehiculo.nombre,
      actividad: element.CombustibleGasto?.Actividad.nombre,
    }))
  }

  return { 
    empleados, 
    setEmpleados, 
    getEmpleadosToSelect,
    getEmpleadosToTable,
    toggleStateEmpleadosFromTable,
    pushElementToEmpleado,
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
    showHorasExtraToTable,
    vehiculos,
    setVehiculos,
    getVehiculosToSelect,
    combustibles,
    setCombustibles,
    showCombustiblesToTable,
    getCombustiblesToSelect,
    updateElementInCombustibles,
    combustiblesHistorial,
    pushElementToCombustiblesHistorial,
    showCombustiblesHistorialToTable
  }
})