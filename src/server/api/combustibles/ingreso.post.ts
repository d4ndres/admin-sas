import {type Combustible} from '~/types/main'
import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const client = await serverSupabaseClient(event)

  if( body.cantidad < 1 ) {
    return new Promise((resolve) => resolve({
      status: 500,
      error: 'La cantidad debe ser mayor a cero',
      data: null
    }))
  } 

  const responseLog = await client
    .from('CombustibleHistorial').insert( body ).select()

  const responseInv = await client
    .from('CombustibleInventario')
    .select('*')
    .eq('id', body.combustible_id)

  const [combustible] : Combustible[] = responseInv.data!; 

  const cantidadCombustibleActualizado = Number(body.cantidad) + combustible.cantidadActual

  const response = await client
  .from('CombustibleInventario')
  .update({ cantidadActual: cantidadCombustibleActualizado } as never)
  .eq('id', body.combustible_id )
  .select('*')

  return {
    status: 200,
    error: null,
    data: {
      inventario: response.data,
      committed: responseLog.data
    }
  }
}) 