import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const id = Number(getRouterParam(event, 'empleado_id'))
  const client = await serverSupabaseClient(event)
  const responeSupabase = await client
  .from('Empleado')
  .update({ isActive: body.isActive } as never)
  .eq('id', id )
  .select('*')

  // const responeSupabase = new Promise( async (resolve) => {
  //   setTimeout(() => {
  //     resolve({
  //       error: 'Algo salio mal'
  //     })
  //   }, 1000)
  // })

  return responeSupabase
})
