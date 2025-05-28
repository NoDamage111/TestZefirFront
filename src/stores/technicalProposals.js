import { defineStore } from 'pinia'
import { supabase } from '@/supabase'

export const useTechnicalProposalsStore = defineStore('technicalProposals', () => {
  const proposals = ref([])
  const loading = ref(false)
  const error = ref(null)

  const fetchProposals = async () => {
    try {
      loading.value = true
      const { data, error: supabaseError } = await supabase
        .from('technical_proposals')
        .select('*')
      
      if (supabaseError) throw supabaseError
      return data
    } catch (err) {
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  return { proposals, loading, error, fetchProposals }
})