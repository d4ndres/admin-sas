import {defineStore} from 'pinia'
import {ref} from 'vue'

export const useControlAsideStore = defineStore('controlAside', () => {
  const isMinimalist = ref<boolean>(false);
  const isAsideOpen = ref<boolean>(true);

  const toggleAside = () : void => {
    isAsideOpen.value = !isAsideOpen.value
  }
  
  const setAsideOpen = (isOpen: boolean) => isAsideOpen.value = isOpen
  const setMinimalist = ( newState : boolean) => isMinimalist.value = newState

  return { 
    toggleAside, 
    setAsideOpen, 
    isAsideOpen,
    setMinimalist,
    isMinimalist
  }
})