import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const client = await serverSupabaseClient(event)
  const responeSupabase = await client.from('EmpleadoHorasExtra').insert( body ).select()
  return responeSupabase

})
