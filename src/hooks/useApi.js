import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { authAPI } from '../lib/api';
import { useNavigate } from 'react-router-dom';

// Create account mutation
export const useCreateAccount = () => {
  const navigate = useNavigate();
  
  return useMutation({
    mutationFn: authAPI.createAccount,
    onSuccess: (data, variables) => {
      // Store email for verification step
      localStorage.setItem('pendingEmail', variables.email);
      // Navigate to verification page
      navigate('/verify-email');
    },
    onError: (error) => {
      console.error('Create account error:', error);
    },
  });
};

// Verify account mutation
export const useVerifyAccount = () => {
  const navigate = useNavigate();
  
  return useMutation({
    mutationFn: authAPI.verifyAccount,
    onSuccess: (data) => {
      // Clear pending email
      localStorage.removeItem('pendingEmail');
      // Navigate to onboarding
      navigate('/onboarding');
    },
    onError: (error) => {
      console.error('Verify account error:', error);
    },
  });
};

// Complete onboarding mutation
export const useCompleteOnboarding = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: authAPI.completeOnboarding,
    onSuccess: () => {
      // Invalidate and refetch dashboard data
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
      // Navigate to dashboard
      navigate('/dashboard');
    },
    onError: (error) => {
      console.error('Onboarding error:', error);
    },
  });
};

// Get dashboard data query
export const useDashboard = () => {
  return useQuery({
    queryKey: ['dashboard'],
    queryFn: authAPI.getDashboard,
    // Only fetch if user is authenticated
    enabled: !!localStorage.getItem('loginToken'),
    retry: 1,
    staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
  });
};
