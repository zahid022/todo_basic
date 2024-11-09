import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useGetData = defineStore('api', () => {
  const flag = ref<boolean>(false)
  
  function setFlag() {
    flag.value = !flag.value
  }

  return { flag, setFlag }
})
