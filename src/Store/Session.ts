import {defineStore} from 'pinia'
import {ref} from 'vue'

export const useSession = defineStore('session', () => {

  const user = ref<object>({});

  const setUser = (data: object) => {
    user.value = data
  }
  
  return { user, setUser }
})