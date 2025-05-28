<template>
  <v-container>
    <v-card class="pa-6">
      <template v-if="proposalsStore.isLoading && !proposalsStore.currentProposal">
        <v-progress-circular indeterminate></v-progress-circular>
      </template>
      
      <template v-else-if="proposalsStore.error">
        <v-alert type="error">{{ proposalsStore.error }}</v-alert>
      </template>
      
      <template v-else-if="proposalsStore.currentProposal">
        <v-card-title class="text-h4 mb-2">
          {{ proposalsStore.currentProposal.title }}
        </v-card-title>
        
        <v-card-subtitle class="text-h6 mb-4">
          Создано: {{ new Date(proposalsStore.currentProposal.created_at).toLocaleDateString() }}
        </v-card-subtitle>
        
        <v-card-text>
          <p class="text-body-1 mb-6">
            {{ proposalsStore.currentProposal.description || 'Описание отсутствует' }}
          </p>
          
          <v-divider class="my-4"></v-divider>
          
          <v-card-title class="text-h5 pa-0 mb-4">
            Выбранные вентиляторы
          </v-card-title>
          
          <v-alert
            v-if="!proposalsStore.currentProposal.proposal_fans?.length"
            type="info"
          >
            Вентиляторы не добавлены
          </v-alert>
          
          <v-list v-else>
            <v-list-item
              v-for="fan in proposalsStore.currentProposal.proposal_fans"
              :key="fan.id"
              class="mb-4"
            >
              <template v-slot:prepend>
                <v-icon icon="mdi-fan" color="primary"></v-icon>
              </template>
              
              <v-list-item-title class="text-h6">
                {{ fan.fan_data.model }}
              </v-list-item-title>
              
              <v-list-item-subtitle>
                {{ fan.fan_data.manufacturer }}
              </v-list-item-subtitle>
              
              <v-list-item-subtitle class="mt-2">
                <v-chip
                  v-for="(value, key) in {
                    'Расход': `${fan.fan_data.flow_rate} м³/ч`,
                    'Давление': `${fan.fan_data.pressure} Па`,
                    'Мощность': `${fan.fan_data.power} кВт`,
                    'Шум': `${fan.fan_data.noise_level} дБ`
                  }"
                  :key="key"
                  class="mr-2 mb-2"
                  size="small"
                >
                  {{ key }}: {{ value }}
                </v-chip>
              </v-list-item-subtitle>
              
              <template v-slot:append>
                <div class="text-right">
                  <div class="text-subtitle-1">
                    {{ fan.quantity }} × {{ fan.fan_data.price }} ₽
                  </div>
                  <div class="text-h6">
                    {{ fan.quantity * fan.fan_data.price }} ₽
                  </div>
                </div>
              </template>
            </v-list-item>
          </v-list>
          
          <v-divider class="my-4"></v-divider>
          
          <div class="d-flex justify-end">
            <v-card
              width="300"
              class="pa-4"
              elevation="2"
            >
              <v-card-title class="text-h6">Итого</v-card-title>
              <v-card-text class="text-h4 text-right">
                {{ calculateTotal() }} ₽
              </v-card-text>
            </v-card>
          </div>
        </v-card-text>
        
        <v-card-actions>
          <v-btn
            to="/proposals"
            variant="text"
            color="grey"
          >
            Назад к списку
          </v-btn>
        </v-card-actions>
      </template>
      
      <template v-else>
        <v-alert type="warning">Предложение не найдено</v-alert>
      </template>
    </v-card>
  </v-container>
</template>

<script setup>
import { onMounted, watch } from 'vue'
import { useProposalsStore } from '@/stores/proposals'
import { useRoute } from 'vue-router'

const proposalsStore = useProposalsStore()
const route = useRoute()

onMounted(() => {
  loadProposal()
})

watch(() => route.params.id, () => {
  loadProposal()
})

const loadProposal = async () => {
  if (route.params.id) {
    await proposalsStore.fetchProposalById(route.params.id)
  }
}

const calculateTotal = () => {
  if (!proposalsStore.currentProposal?.proposal_fans) return 0
  
  return proposalsStore.currentProposal.proposal_fans.reduce((total, fan) => {
    return total + (fan.fan_data.price * fan.quantity)
  }, 0)
}
</script>