<template>
  <div class="modal">
    <form @submit.prevent="handleSubmit">
      <input v-model="title" placeholder="Название" required>
      <button type="submit">Создать</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useTechnicalProposalsStore } from '@/stores/technicalProposals'

const emit = defineEmits(['close', 'created'])
const proposalsStore = useTechnicalProposalsStore()
const title = ref('')

const handleSubmit = async () => {
  try {
    await proposalsStore.createProposal(title.value)
    emit('created')
    emit('close')
  } catch (error) {
    console.error(error)
  }
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  padding: 25px;
  border-radius: 8px;
  width: 500px;
  max-width: 90%;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
}

input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
}

.cancel-btn {
  padding: 8px 16px;
  background: #f5f5f5;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
}

.submit-btn {
  padding: 8px 16px;
  background: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.submit-btn:disabled {
  background: #cccccc;
  cursor: not-allowed;
}
</style>