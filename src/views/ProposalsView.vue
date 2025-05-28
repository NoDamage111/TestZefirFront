<template>
  <div class="proposals-container">
    <div class="header">
      <h1 class="title">My Technical Proposals</h1>
      <router-link to="/proposals/new" class="button is-primary">
        Create New Proposal
      </router-link>
    </div>
    
    <div v-if="proposalsStore.isLoading" class="loading">
      Loading proposals...
    </div>
    
    <div v-else-if="proposalsStore.error" class="error-notification">
      {{ proposalsStore.error }}
    </div>
    
    <div v-else-if="proposalsStore.proposals.length === 0" class="empty-state">
      У вас еще нет предложений. 
      
    </div>
    
    <div v-else class="proposals-list">
      <div 
        v-for="proposal in proposalsStore.proposals" 
        :key="proposal.id" 
        class="proposal-card"
      >
        <div class="proposal-content">
          <h2 class="proposal-title">{{ proposal.title }}</h2>
          <p class="proposal-description">{{ proposal.description || 'No description' }}</p>
          <p class="proposal-date">
            Created: {{ new Date(proposal.created_at).toLocaleDateString() }}
          </p>
        </div>
        
        <div class="proposal-actions">
          <router-link 
            :to="{ name: 'proposal-detail', params: { id: proposal.id } }" 
            class="button is-info"
          >
            View
          </router-link>
          
          <button 
            @click="handleDelete(proposal.id)" 
            class="button is-danger"
            :disabled="proposalsStore.isLoading"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useProposalsStore } from '@/stores/proposals';

const proposalsStore = useProposalsStore();

onMounted(async () => {
  await proposalsStore.fetchProposals();
});

const handleDelete = async (id) => {
  if (confirm('Are you sure you want to delete this proposal?')) {
    try {
      await proposalsStore.deleteProposal(id);
    } catch (error) {
      console.error('Delete error:', error);
    }
  }
};
</script>

<style>
.proposals-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.title {
  font-size: 2rem;
  color: #2c3e50;
}

.proposals-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}

.proposal-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s, box-shadow 0.2s;
}

.proposal-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

.proposal-title {
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  color: #2c3e50;
}

.proposal-description {
  color: #666;
  margin-bottom: 1rem;
  display: -webkit-box;
  /* -webkit-line-clamp: 3; */
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.proposal-date {
  font-size: 0.8rem;
  color: #7f8c8d;
  margin-bottom: 1rem;
}

.proposal-actions {
  display: flex;
  gap: 0.5rem;
}

.button {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  text-decoration: none;
  font-size: 0.9rem;
  transition: background-color 0.2s;
}

.button.is-primary {
  background-color: #3498db;
  color: white;
}

.button.is-primary:hover {
  background-color: #2980b9;
}

.button.is-info {
  background-color: #2ecc71;
  color: white;
}

.button.is-info:hover {
  background-color: #27ae60;
}

.button.is-danger {
  background-color: #e74c3c;
  color: white;
}

.button.is-danger:hover {
  background-color: #c0392b;
}

.button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.loading, .empty-state {
  text-align: center;
  padding: 2rem;
  color: #7f8c8d;
}

.error-notification {
  padding: 1rem;
  background-color: #f8d7da;
  color: #721c24;
  border-radius: 4px;
  margin-bottom: 1rem;
}
</style>