import { defineStore } from 'pinia';
import { supabase } from '../supabase';

export const useProposalsStore = defineStore('proposals', {
  state: () => ({
    proposals: [],
    currentProposal: null,
    isLoading: false,
    error: null
  }),
  actions: {
    async fetchProposals() {
      this.isLoading = true;
      this.error = null;
      
      try {
        const { data: { user }, error: authError } = await supabase.auth.getUser();
        
        if (authError) throw authError;
        
        const { data, error } = await supabase
          .from('proposals')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });
        
        if (error) throw error;
        
        this.proposals = data;
        return data;
      } catch (error) {
        this.error = error.message;
        throw error;
      } finally {
        this.isLoading = false;
      }
    },
    
    async fetchProposalById(id) {
      this.isLoading = true;
      this.error = null;
      
      try {
        const { data: { user }, error: authError } = await supabase.auth.getUser();
        
        if (authError) throw authError;
        
        const { data, error } = await supabase
          .from('proposals')
          .select('*, proposal_fans(*)')
          .eq('id', id)
          .eq('user_id', user.id)
          .single();
        
        if (error) throw error;
        
        this.currentProposal = data;
        return data;
      } catch (error) {
        this.error = error.message;
        throw error;
      } finally {
        this.isLoading = false;
      }
    },
    
    async createProposal(proposalData) {
      this.isLoading = true;
      this.error = null;
      
      try {
        const { data: { user }, error: authError } = await supabase.auth.getUser();
        
        if (authError) throw authError;
        
        const { data, error } = await supabase
          .from('proposals')
          .insert({
            ...proposalData,
            user_id: user.id
          })
          .select()
          .single();
        
        if (error) throw error;
        
        this.proposals.unshift(data);
        return data;
      } catch (error) {
        this.error = error.message;
        throw error;
      } finally {
        this.isLoading = false;
      }
    },
    
 async addFanToProposal(proposalId, fanData) {
    this.isLoading = true;
    this.error = null;
    
    try {
      const { data, error } = await supabase
        .from('proposal_fans')
        .insert({
          proposal_id: proposalId,
          fan_data: {
            model: fanData.model,
            manufacturer: fanData.manufacturer,
            flow_rate: fanData.flow_rate,
            pressure: fanData.pressure,
            power: fanData.power,
            noise_level: fanData.noise_level,
            price: fanData.price
          },
          quantity: fanData.quantity || 1
        })
        .select()
        .single();
      
      if (error) throw error;
      
      // Обновляем текущее предложение
      if (this.currentProposal?.id === proposalId) {
        if (!this.currentProposal.proposal_fans) {
          this.currentProposal.proposal_fans = [];
        }
        this.currentProposal.proposal_fans.push(data);
      }
      
      return data;
    } catch (error) {
      this.error = error.message;
      throw error;
    } finally {
      this.isLoading = false;
    }
  },
    
    async deleteProposal(id) {
      this.isLoading = true;
      this.error = null;
      
      try {
        const { error } = await supabase
          .from('proposals')
          .delete()
          .eq('id', id);
        
        if (error) throw error;
        
        this.proposals = this.proposals.filter(p => p.id !== id);
        if (this.currentProposal?.id === id) {
          this.currentProposal = null;
        }
      } catch (error) {
        this.error = error.message;
        throw error;
      } finally {
        this.isLoading = false;
      }
    }
  }
});