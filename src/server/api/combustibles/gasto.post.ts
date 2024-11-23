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

  // Guardando el data del gasto
  const responseGasto = await client
    .from('CombustibleGasto')
    .insert( body )
    .select()

  const [registro] : any[] = responseGasto.data!; 
  
  
  // Guardar registro en el histórico
  const bodyHistorico = {
    fecha: registro.fecha,
    combustible_id: registro.combustible_id,
    cantidad: -Number(body.cantidadDeCombustibleDepositada),
    valorTotal: null,
    gasto_id: registro.id,
  }


  const responseLog = await client
    .from('CombustibleHistorial')
    .insert( bodyHistorico as never )
    .select()
    
  
  
  // Actualización del inventario
  const responseInv = await client
  .from('CombustibleInventario')
  .select('*')
  .eq('id', body.combustible_id)
  
  const [combustible] : Combustible[] = responseInv.data!; 
  
  const cantidadCombustibleActualizado = combustible.cantidadActual + bodyHistorico.cantidad
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
      committed: responseLog.data,
      gasto: responseGasto.data
    }
  }
}) 