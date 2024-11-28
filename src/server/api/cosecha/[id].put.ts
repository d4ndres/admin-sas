import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const id = Number(getRouterParam(event, 'id'))
  const client = await serverSupabaseClient(event)
  
  const responeSupabase = await client
  .from('Cosecha')
  .update({ ...body} as never)
  .eq('id', id )
  return responeSupabase
})
