import { serverSupabaseClient } from '#supabase/server'

export default eventHandler(async (event) => {
  const client = await serverSupabaseClient(event)
  const responseActividades = await client
  .from('EmpleadoActividadRealizada')
  .select('*, Empleado( nombre ), Actividad( nombre ), Lote( nombre ), Semilla( nombre )')
  return responseActividades
})