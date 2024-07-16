import {defineStore} from 'pinia'
import { ref } from 'vue'

export const useExpanded = defineStore('asideExpanded', () => {
  const isExpanded = ref(true)
  
  const setExpanded = (value) => isExpanded.value = value
  const toggleExpanded = () => isExpanded.value = !isExpanded.value

  return { isExpanded, setExpanded, toggleExpanded }
})