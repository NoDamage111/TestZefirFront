<template>
  <div class="proposals">
    <h1>Технические предложения</h1>
    <button @click="showModal = true">Создать новое</button>
    
    <CreateProposalModal 
      v-if="showModal"
      @close="showModal = false"
      @created="fetchProposals"
    />
    
    <div v-if="loading">Загрузка...</div>
    <div v-else-if="error">{{ error }}</div>
    <div v-else>
      <div v-for="proposal in proposals" :key="proposal.id">
        <h3>{{ proposal.title }}</h3>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useTechnicalProposalsStore } from '@/stores/technicalProposals'
import CreateProposalModal from '@/components/CreateProposalModal.vue'

const store = useTechnicalProposalsStore()
const showModal = ref(false)
const proposals = ref([])
const loading = ref(false)
const error = ref(null)

const fetchProposals = async () => {
  try {
    loading.value = true
    proposals.value = await store.fetchProposals()
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}

onMounted(fetchProposals)
</script>