import { serverSupabaseClient } from '#supabase/server'

export default eventHandler(async (event) => {
  const client = await serverSupabaseClient(event)
  const responseActividades = await client
  .from('Vehiculo')
  .select('*')
  return responseActividades
})