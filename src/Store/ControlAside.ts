import {defineStore} from 'pinia'

export const useControlAsideStore = defineStore('controlAside', {
  state: () => ({
    isAsideOpen: true
  }),
  actions: {
    toggleAside() {
      this.isAsideOpen = !this.isAsideOpen
    },
    setAsideOpen(isOpen: boolean) {
      this.isAsideOpen = isOpen
    }
  }
})