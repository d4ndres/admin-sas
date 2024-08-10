import { serverSupabaseClient } from '#supabase/server'

type responseSupabase = {
  error: any
  data: any
}

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const client = await serverSupabaseClient(event)
  const { error: errorInsert, data: dataInsert} = await client.from('CombustibleHistorial').insert( body ).select()

  const { error: errorGetInventario, data: dataInventario} : responseSupabase = await client
  .from('CombustibleInventario')
  .select('*')

  const combustible = dataInventario.find(({ id } : any) => id == body.combustible_id)
  const nuevaCantidad = Number(combustible.cantidadActual) + Number(body.cantidad)

  const { error: errorUpdateElementInInventario, data: dataUpdateInInventario } = await client
  .from('CombustibleInventario')
  .update({ cantidadActual: nuevaCantidad } as never)
  .eq('id', body.combustible_id )
  .select('*')

  return {
    dataInsert,
    dataInventario,
    dataUpdateInInventario
  }
})
