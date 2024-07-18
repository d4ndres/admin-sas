import {defineStore} from 'pinia'
import {ref} from 'vue'
export const useControlAsideStore = defineStore('controlAside', () => {

  const isAsideOpen = ref<boolean>(true);
  const toggleAside = () : void => {
    isAsideOpen.value = !isAsideOpen.value
  }
  
  const setAsideOpen = (isOpen: boolean) => isAsideOpen.value = isOpen

  return { toggleAside, setAsideOpen, isAsideOpen }
})