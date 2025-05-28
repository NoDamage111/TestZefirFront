<template>
    <div class="add-fan-modal" @click.self="$emit('close')">
      <div class="modal-content">
        <h3>Добавить вентилятор</h3>
        
        <form @submit.prevent="handleSubmit">
          <div class="form-group">
            <label>Название вентилятора</label>
            <input v-model="name" type="text" required>
          </div>
          
          <div class="form-group">
            <label>Параметры</label>
            <div class="parameters-form">
              <div v-for="(param, index) in parameters" :key="index" class="parameter-row">
                <input v-model="param.key" placeholder="Параметр">
                <input v-model="param.value" placeholder="Значение">
                <button type="button" @click="removeParameter(index)" class="remove-btn">
                  ×
                </button>
              </div>
              <button type="button" @click="addParameter" class="add-param-btn">
                + Добавить параметр
              </button>
            </div>
          </div>
          
          <div class="form-actions">
            <button type="button" @click="$emit('close')" class="cancel-btn">
              Отмена
            </button>
            <button type="submit" :disabled="isSubmitting" class="submit-btn">
              {{ isSubmitting ? 'Добавление...' : 'Добавить' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
  const emit = defineEmits(['close', 'add'])
  
  const name = ref('')
  const parameters = ref([{ key: '', value: '' }])
  const isSubmitting = ref(false)
  
  const addParameter = () => {
    parameters.value.push({ key: '', value: '' })
  }
  
  const removeParameter = (index) => {
    parameters.value.splice(index, 1)
  }
  
  const handleSubmit = () => {
    const paramsObj = {}
    parameters.value.forEach(param => {
      if (param.key && param.value) {
        paramsObj[param.key] = param.value
      }
    })
    
    emit('add', name.value, paramsObj)
    name.value = ''
    parameters.value = [{ key: '', value: '' }]
  }
  </script>
  
  <style scoped>
  .add-fan-modal {
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
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
    margin-bottom: 10px;
  }
  
  .parameter-row {
    display: flex;
    gap: 10px;
    margin-bottom: 10px;
  }
  
  .parameter-row input {
    flex: 1;
  }
  
  .remove-btn {
    background: #ffebee;
    border: none;
    width: 30px;
    border-radius: 4px;
    cursor: pointer;
    color: #f44336;
  }
  
  .add-param-btn {
    background: #e8f5e9;
    border: none;
    padding: 5px 10px;
    border-radius: 4px;
    cursor: pointer;
    color: #4caf50;
    margin-top: 5px;
  }
  
  .form-actions {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
  }
  
  .cancel-btn {
    background: #f5f5f5;
    border: 1px solid #ddd;
    padding: 8px 16px;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .submit-btn {
    background: #4caf50;
    color: white;
    border: none;
    padding: 8px 16px;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .submit-btn:disabled {
    background: #cccccc;
    cursor: not-allowed;
  }
  </style>