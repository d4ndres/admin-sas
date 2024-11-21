import { serverSupabaseClient } from '#supabase/server'

export default eventHandler(async (event) => {
  const client = await serverSupabaseClient(event)
  const response = await client
    .from('Empleado')
    .select('*')
    .order('id')
  return response
})