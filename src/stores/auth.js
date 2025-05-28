import { defineStore } from 'pinia';
import { supabase } from '../supabase';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,       // Данные пользователя
    isLoading: false, // Флаг загрузки
    error: null       // Ошибки
  }),
  
  actions: {
    // Вход в систему
    async signIn(email, password) {
      this.isLoading = true;
      this.error = null;
      
      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password
        });
        
        if (error) throw error;
        
        // Сохраняем пользователя и токен
        this.user = data.user;
        localStorage.setItem('supabase.auth.token', data.session.access_token);
        return data.user;
      } catch (error) {
        this.error = error.message;
        throw error;
      } finally {
        this.isLoading = false;
      }
    },
    
    // Выход из системы
    async signOut() {
      this.isLoading = true;
      this.error = null;
      
      try {
        const { error } = await supabase.auth.signOut();
        if (error) throw error;
        
        // Очищаем данные
        this.user = null;
        localStorage.removeItem('supabase.auth.token');
      } catch (error) {
        this.error = error.message;
        throw error;
      } finally {
        this.isLoading = false;
      }
    },
    
    // Проверка аутентификации
    async checkAuth() {
      const token = localStorage.getItem('supabase.auth.token');
      
      if (!token) {
        this.user = null;
        return null;
      }
      
      try {
        const { data: { user }, error } = await supabase.auth.getUser(token);
        if (error) throw error;
        
        this.user = user;
        return user;
      } catch (error) {
        // Очищаем данные при ошибке
        this.user = null;
        localStorage.removeItem('supabase.auth.token');
        return null;
      }
    }
  }
});