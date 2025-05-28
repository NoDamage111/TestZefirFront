import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useFansStore = defineStore('fans', () => {
  const selectedFan = ref(null)
  const isLoading = ref(false)
  const error = ref(null)

  const selectFan = async (proposalId, requirements) => {
    isLoading.value = true
    error.value = null
    
    try {
      const response = await fetch('/api/fans/select-fan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          proposalId,
          requirements
        })
      })
      
      const data = await response.json()
      
      if (!data.success) throw new Error(data.error || 'Ошибка подбора')
      
      selectedFan.value = data.fan
    } catch (err) {
      error.value = err.message
    } finally {
      isLoading.value = false
    }
  }

  return { selectedFan, isLoading, error, selectFan }
})