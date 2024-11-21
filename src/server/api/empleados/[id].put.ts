import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient(event)
  const body = await readBody(event)
  const id = Number(getRouterParam(event, 'id'))

  const responeSupabase = await client
    .from('Empleado')
    .update({ isActive: body.isActive } as never)
    .eq('id', id )
    .select('*')
    
  return responeSupabase
})
