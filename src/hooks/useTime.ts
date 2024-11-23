import {format} from 'date-fns'

export const dateNow = () => (new Date()).toISOString().split('T')[0];
export const formatter = (date : any) => format(date, 'dd/MM/yyyy') 