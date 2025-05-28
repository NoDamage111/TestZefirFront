<template>
    <div class="fan-details-modal" @click.self="$emit('close')">
      <div class="modal-content">
        <button class="close-btn" @click="$emit('close')">×</button>
        
        <h3>{{ fan.name }}</h3>
        
        <div class="parameters">
          <div v-for="(value, key) in fan.parameters" :key="key" class="parameter">
            <span class="parameter-name">{{ key }}:</span>
            <span class="parameter-value">{{ value }}</span>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  defineProps({
    fan: {
      type: Object,
      required: true
    }
  })
  
  defineEmits(['close'])
  </script>
  
  <style scoped>
  .fan-details-modal {
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
    max-height: 90vh;
    overflow-y: auto;
    position: relative;
  }
  
  .close-btn {
    position: absolute;
    top: 10px;
    right: 10px;
    background: none;
    border: none;
    font-size: 24px;
    cursor: pointer;
    color: #757575;
  }
  
  .close-btn:hover {
    color: #f44336;
  }
  
  .parameters {
    margin-top: 20px;
  }
  
  .parameter {
    display: flex;
    justify-content: space-between;
    padding: 10px 0;
    border-bottom: 1px solid #eee;
  }
  
  .parameter-name {
    font-weight: bold;
    color: #333;
  }
  
  .parameter-value {
    color: #666;
  }
  </style>