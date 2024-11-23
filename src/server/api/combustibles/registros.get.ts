import { serverSupabaseClient } from '#supabase/server'

export default eventHandler(async (event) => {
  const client = await serverSupabaseClient(event)
  const response = await client
    .from('CombustibleHistorial')
    .select(`
      *,
      CombustibleInventario( nombre ), 
      CombustibleGasto( Actividad( nombre), Empleado( nombre ), Lote( nombre ), Vehiculo( nombre ) )
      
      `)
    
  return response
})