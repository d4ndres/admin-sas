import { serverSupabaseClient } from '#supabase/server'
type responseSupabase = {
  error: any
  data: any
}

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const client = await serverSupabaseClient(event)
  const { error: errorGasto, data: dataGasto} = await client.from('CombustibleGasto').insert( body ).select('*')
  
  const { error: errorGetInventario, data: dataInventario} : responseSupabase = await client
  .from('CombustibleInventario')
  .select('*')

  const combustible = dataInventario.find(({ id } : any) => id == body.combustible_id)
  const nuevaCantidad = Number(combustible.cantidadActual) - Number(body.cantidadDeCombustibleDepositada)
  
  const { error: errorUpdateElementInInventario, data: dataUpdateInInventario } = await client
  .from('CombustibleInventario')
  .update({ cantidadActual: nuevaCantidad } as never)
  .eq('id', body.combustible_id )
  .select('*')


  return {
    dataGasto,
    dataInventario,
    dataUpdateInInventario
  }
})
