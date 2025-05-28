<template>
  <div class="fans-view">
    <div v-if="!store.selectedFan">
      <h2>Подбор вентилятора</h2>
      
      <form @submit.prevent="handleSelectFan">
        <div class="form-group">
          <label>Требуемый расход воздуха (м³/ч)</label>
          <input v-model="requirements.airflow" type="number" required>
        </div>
        
        <div class="form-group">
          <label>Требуемое давление (Па)</label>
          <input v-model="requirements.pressure" type="number" required>
        </div>
        
        <button type="submit" :disabled="store.isLoading">
          {{ store.isLoading ? 'Подбор...' : 'Подобрать вентилятор' }}
        </button>
      </form>
    </div>
    
    <div v-else>
      <h2>Подобранный вентилятор</h2>
      <div class="fan-details">
        <h3>{{ store.selectedFan.name }}</h3>
        
        <div class="parameters">
          <div v-for="(value, key) in store.selectedFan.parameters" 
               :key="key" class="parameter">
            <span class="param-name">{{ key }}:</span>
            <span class="param-value">{{ value }}</span>
          </div>
        </div>
        
        <div class="action-buttons">
          <button 
            @click="addToProposal" 
            :disabled="isAdding"
            class="add-btn"
          >
            {{ isAdding ? 'Добавление...' : 'Добавить в предложение' }}
          </button>
          <button 
            @click="store.selectedFan = null" 
            class="back-btn"
          >
            Назад к подбору
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useFansStore } from '@/stores/fans'
import { useTechnicalProposalsStore } from '@/stores/technicalProposals'

const fansStore = useFansStore()
const proposalsStore = useTechnicalProposalsStore()
const isAdding = ref(false)
const requirements = ref({
  airflow: '',
  pressure: ''
})

const handleSelectFan = async () => {
  await fansStore.selectFan(
    proposalsStore.currentProposalId,
    requirements.value
  )
}

const addFanToProposal = async () => {
  isAdding.value = true
  try {
    if (!fansStore.selectedFan || !proposalsStore.currentProposalId) {
      throw new Error('Не выбран вентилятор или предложение')
    }
    
    await proposalsStore.addFanToProposal(
      proposalsStore.currentProposalId,
      fansStore.selectedFan
    )
    fansStore.selectedFan = null
    requirements.value = { airflow: '', pressure: '' }
  } catch (error) {
    console.error('Ошибка добавления:', error)
  } finally {
    isAdding.value = false
  }
}
</script>

<style scoped>
.fans-view {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
}

input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

button {
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}

.action-buttons {
  display: flex;
  gap: 10px;
  margin-top: 20px;
}

.add-btn {
  background: #42b983;
  color: white;
}

.add-btn:disabled {
  background: #cccccc;
  cursor: not-allowed;
}

.back-btn {
  background: #f5f5f5;
}

.fan-details {
  background: #f9f9f9;
  padding: 20px;
  border-radius: 8px;
  margin-top: 20px;
}

.parameters {
  margin: 20px 0;
}

.parameter {
  display: flex;
  margin-bottom: 10px;
}

.param-name {
  font-weight: bold;
  width: 200px;
}

.param-value {
  flex: 1;
}
</style>