import { serverSupabaseClient } from '#supabase/server'

export default eventHandler(async (event) => {
  const body = await readBody(event)
  const client = await serverSupabaseClient(event)

  const responeActividadRealizada = await client.from('EmpleadoActividadRealizada')
  .insert({
    fecha: body.fecha,
    actividad_id: body.actividad_id,
    lote_id: body.lote_id,
    empleado_id: body.empleado_id,
  } as never)
  .select('*, Empleado( nombre ), Actividad( nombre ), Lote( nombre ), Semilla( nombre )')

  let responseHorasExtra
  if(body.horasExtra && body.horasExtra.length) {
    const [registro] : any[] = responeActividadRealizada.data!;
  
    const horasExtra = body.horasExtra.map( (horaExtra : any) => {
      return {
        ...horaExtra,
        empleado_id: body.empleado_id,
        actividadRealizada_id: registro.id
      }
    })
  
    responseHorasExtra = await client.from('EmpleadoHorasExtra')
    .insert( horasExtra )
    .select('*, EmpleadoActividadRealizada( fecha, Actividad( nombre ) ), Empleado( nombre )')
  }


  return {
    status: 200,
    error: null,
    data: {
      tareaRealizada: responeActividadRealizada,
      horasExtra: responseHorasExtra
    }
  }
})