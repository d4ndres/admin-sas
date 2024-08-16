import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const id = Number(getRouterParam(event, 'combustible_id'))
  const client = await serverSupabaseClient(event)
  const responeSupabase = await client
  .from('CombustibleHistorial')
  .select(`
    *, 
    CombustibleInventario( nombre ), 
    CombustibleGasto( Actividad( nombre), Empleado( nombre ), Lote( nombre ), Vehiculo( nombre ) )
    auth( * )
  `)
  .eq('combustible_id', id)
  return responeSupabase
})
