import {defineStore} from 'pinia'
import { ref } from 'vue'

export const useExpanded = defineStore('asideExpanded', () => {
  const isExpanded = ref<boolean>(true)
  
  const setExpanded = (value: boolean) => isExpanded.value = value
  const toggleExpanded = () => isExpanded.value = !isExpanded.value

  return { isExpanded, setExpanded, toggleExpanded }
})