import { serverSupabaseClient } from '#supabase/server'

export default eventHandler(async (event) => {
  const client = await serverSupabaseClient(event)
  const response = await client
    .from('Cosecha')
    .select('*, Semilla( nombre ), Lote( nombre )' )


  return response
})