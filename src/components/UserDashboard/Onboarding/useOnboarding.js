import { useState, useEffect, useCallback } from 'react';
import { getDocument, updateDocument } from '../../../db/firebase';

const useOnboarding = (userId) => {
  const [onboardingState, setOnboardingState] = useState({
    isVisible: false,
    isCompleted: false,
    currentStep: 0,
    completedSteps: new Set(),
    showFeatureTour: false,
    lastCompletedAt: null,
    preferences: {
      showOnboarding: true,
      autoStart: true,
      showTips: true,
    }
  });

  const [loading, setLoading] = useState(true);

  // Load onboarding state from Firebase
  useEffect(() => {
    const loadOnboardingState = async () => {
      if (!userId) {
        setLoading(false);
        return;
      }

      try {
        const userData = await getDocument('users', userId);
        if (userData?.onboarding) {
          setOnboardingState(prev => ({
            ...prev,
            ...userData.onboarding,
            completedSteps: new Set(userData.onboarding.completedSteps || []),
          }));
        } else {
          // First time user - show onboarding
          setOnboardingState(prev => ({
            ...prev,
            isVisible: true,
            isCompleted: false,
          }));
        }
      } catch (error) {
        console.error('Error loading onboarding state:', error);
      } finally {
        setLoading(false);
      }
    };

    loadOnboardingState();
  }, [userId]);

  // Save onboarding state to Firebase
  const saveOnboardingState = useCallback(async (newState) => {
    if (!userId) return;

    try {
      await updateDocument('users', userId, {
        onboarding: {
          ...newState,
          completedSteps: Array.from(newState.completedSteps),
          lastUpdated: new Date().toISOString(),
        }
      });
    } catch (error) {
      console.error('Error saving onboarding state:', error);
    }
  }, [userId]);

  // Update onboarding state
  const updateOnboardingState = useCallback((updates) => {
    setOnboardingState(prev => {
      const newState = { ...prev, ...updates };
      saveOnboardingState(newState);
      return newState;
    });
  }, [saveOnboardingState]);

  // Start onboarding
  const startOnboarding = useCallback(() => {
    updateOnboardingState({
      isVisible: true,
      isCompleted: false,
      currentStep: 0,
      completedSteps: new Set(),
      showFeatureTour: false,
    });
  }, [updateOnboardingState]);

  // Complete onboarding
  const completeOnboarding = useCallback(() => {
    updateOnboardingState({
      isVisible: false,
      isCompleted: true,
      lastCompletedAt: new Date().toISOString(),
    });
  }, [updateOnboardingState]);

  // Skip onboarding
  const skipOnboarding = useCallback(() => {
    updateOnboardingState({
      isVisible: false,
      isCompleted: false,
    });
  }, [updateOnboardingState]);

  // Go to next step
  const nextStep = useCallback(() => {
    setOnboardingState(prev => {
      const newCompletedSteps = new Set([...prev.completedSteps, prev.currentStep]);
      const newState = {
        ...prev,
        currentStep: prev.currentStep + 1,
        completedSteps: newCompletedSteps,
      };
      saveOnboardingState(newState);
      return newState;
    });
  }, [saveOnboardingState]);

  // Go to previous step
  const previousStep = useCallback(() => {
    setOnboardingState(prev => {
      const newState = {
        ...prev,
        currentStep: Math.max(0, prev.currentStep - 1),
      };
      saveOnboardingState(newState);
      return newState;
    });
  }, [saveOnboardingState]);

  // Start feature tour
  const startFeatureTour = useCallback(() => {
    updateOnboardingState({
      showFeatureTour: true,
    });
  }, [updateOnboardingState]);

  // Complete feature tour
  const completeFeatureTour = useCallback(() => {
    updateOnboardingState({
      showFeatureTour: false,
      isVisible: false,
      isCompleted: true,
      lastCompletedAt: new Date().toISOString(),
    });
  }, [updateOnboardingState]);

  // Skip feature tour
  const skipFeatureTour = useCallback(() => {
    updateOnboardingState({
      showFeatureTour: false,
    });
  }, [updateOnboardingState]);

  // Update preferences
  const updatePreferences = useCallback((preferences) => {
    updateOnboardingState({
      preferences: {
        ...onboardingState.preferences,
        ...preferences,
      }
    });
  }, [updateOnboardingState, onboardingState.preferences]);

  // Check if user should see onboarding
  const shouldShowOnboarding = useCallback(() => {
    return !onboardingState.isCompleted && onboardingState.preferences.showOnboarding;
  }, [onboardingState.isCompleted, onboardingState.preferences.showOnboarding]);

  // Reset onboarding
  const resetOnboarding = useCallback(() => {
    updateOnboardingState({
      isVisible: true,
      isCompleted: false,
      currentStep: 0,
      completedSteps: new Set(),
      showFeatureTour: false,
      lastCompletedAt: null,
    });
  }, [updateOnboardingState]);

  return {
    onboardingState,
    loading,
    startOnboarding,
    completeOnboarding,
    skipOnboarding,
    nextStep,
    previousStep,
    startFeatureTour,
    completeFeatureTour,
    skipFeatureTour,
    updatePreferences,
    shouldShowOnboarding,
    resetOnboarding,
  };
};

export default useOnboarding; 