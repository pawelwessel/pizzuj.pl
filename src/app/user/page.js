"use client";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../db/firebase";
import { getDocument, updateUserProfile } from "../../db/firebase";
import { useEffect, useState } from "react";
import PizzeriaDashboard from "../../components/PizzeriaDashboard";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import UserHeader from "../../components/UserDashboard/UserHeader";
import TabNavigation from "../../components/UserDashboard/TabNavigation";
import ProfileForm from "../../components/UserDashboard/ProfileForm";
import LoadingSpinner from "../../components/UserDashboard/LoadingSpinner";
import Opinions from "../../components/UserDashboard/Opinions";
import Marketing from "../../components/UserDashboard/Marketing";
import Settings from "../../components/UserDashboard/Settings";
import OnboardingWizard from "../../components/UserDashboard/Onboarding/OnboardingWizard";
import FeatureTour from "../../components/UserDashboard/Onboarding/FeatureTour";
import useOnboarding from "../../components/UserDashboard/Onboarding/useOnboarding";
import HelpFloatingButton from "../../components/UserDashboard/Onboarding/HelpFloatingButton";
import Onboarding from "../../components/UserDashboard/Onboarding";
import {
  SubscriptionOverview,
  PlanUpgrade,
  PlanDowngrade,
  PaymentIntegration,
  BillingHistory,
  PlanComparison
} from "../../components/UserDashboard/SubscriptionManagement";

export default function UserProfile() {
  const [user, loading] = useAuthState(auth);
  const [userData, setUserData] = useState(null);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
  });
  
  // Subscription management state
  const [subscriptionView, setSubscriptionView] = useState("overview");
  const [currentPlan, setCurrentPlan] = useState("free");
  
  const router = useRouter();
  
  // Onboarding system
  const {
    onboardingState,
    loading: onboardingLoading,
    completeOnboarding,
    skipOnboarding,
    completeFeatureTour,
    skipFeatureTour,
    startOnboarding,
    startFeatureTour,
  } = useOnboarding(user?.uid);
  
  if (!user && !loading) {
    router.push("/login");
  }
  
  useEffect(() => {
    async function fetchUserData() {
      if (user) {
        const data = await getDocument("users", user.uid);
        setUserData(data);
        setProfileData({
          name: data?.name || "",
          email: data?.email || "",
        });
        
        // Set current plan from user data
        if (data?.subscription?.plan) {
          setCurrentPlan(data.subscription.plan);
        }
      }
    }
    fetchUserData();
  }, [loading]);

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    try {
      await updateUserProfile(user.uid, profileData);
      setUserData((prev) => ({ ...prev, ...profileData }));
      setIsEditingProfile(false);
      toast.success("Profil został zaktualizowany!");
    } catch (error) {
      toast.error("Błąd podczas aktualizacji profilu");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  };

  // Subscription management handlers
  const handlePlanChange = (action) => {
    if (action === 'upgrade') {
      setSubscriptionView('upgrade');
    } else if (action === 'downgrade') {
      setSubscriptionView('downgrade');
    }
  };

  const handlePlanUpgrade = async (planId, billingCycle) => {
    try {
      // Here you would integrate with Stripe
      toast.info('Przekierowywanie do płatności...');
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      setCurrentPlan(planId);
      setSubscriptionView('overview');
      toast.success('Plan został zaktualizowany pomyślnie!');
    } catch (error) {
      toast.error('Błąd podczas aktualizacji planu');
    }
  };

  const handlePlanDowngrade = async (planId) => {
    try {
      // Here you would integrate with Stripe
      toast.info('Przetwarzanie zmiany planu...');
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      setCurrentPlan(planId);
      setSubscriptionView('overview');
      toast.success('Plan został zmieniony pomyślnie!');
    } catch (error) {
      toast.error('Błąd podczas zmiany planu');
    }
  };

  const handleSubscriptionViewChange = (view) => {
    setSubscriptionView(view);
  };

  const handlePlanSelect = (planId) => {
    if (planId === currentPlan) {
      toast.info('To jest Twój obecny plan');
      return;
    }
    if (planId === 'free') {
      handlePlanDowngrade(planId);
    } else {
      handlePlanUpgrade(planId, 'monthly');
    }
  };

  if (!user || !userData || onboardingLoading) {
    return <LoadingSpinner message="Ładowanie..." />;
  }

  const renderSubscriptionContent = () => {
    switch (subscriptionView) {
      case 'overview':
        return (
          <SubscriptionOverview
            userData={userData}
            onPlanChange={handlePlanChange}
          />
        );
      case 'upgrade':
        return (
          <PlanUpgrade
            currentPlan={currentPlan}
            onUpgrade={handlePlanUpgrade}
            onCancel={() => setSubscriptionView('overview')}
          />
        );
      case 'downgrade':
        return (
          <PlanDowngrade
            currentPlan={currentPlan}
            onDowngrade={handlePlanDowngrade}
            onCancel={() => setSubscriptionView('overview')}
          />
        );
      case 'payment':
        return (
          <PaymentIntegration
            userData={userData}
            onPaymentMethodUpdate={() => {}}
          />
        );
      case 'billing':
        return (
          <BillingHistory
            userData={userData}
          />
        );
      case 'comparison':
        return (
          <PlanComparison
            currentPlan={currentPlan}
            onPlanSelect={handlePlanSelect}
          />
        );
      default:
        return (
          <SubscriptionOverview
            userData={userData}
            onPlanChange={handlePlanChange}
          />
        );
    }
  };

  return (
    <div className="min-h-screen py-12 px-6 bg-gradient-to-br from-orange-50 via-white to-orange-50">
      <div className="max-w-6xl mx-auto">
        {/* Enhanced Header with Shine Effect */}
        <div className="user-header">
          <UserHeader userData={userData} />
        </div>

        {/* Enhanced Tab Navigation */}
        <div className="tab-navigation">
          <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>

        {/* Enhanced Tab Content */}
        {activeTab === "profile" && (
          <div className="profile-section">
            <ProfileForm
              isEditingProfile={isEditingProfile}
              profileData={profileData}
              handleInputChange={handleInputChange}
              handleProfileUpdate={handleProfileUpdate}
              setIsEditingProfile={setIsEditingProfile}
              userData={userData}
              setProfileData={setProfileData}
            />
          </div>
        )}

        {activeTab === "pizzerias" && (
          <div className="pizzerias-section bg-white rounded-2xl shadow-2xl p-8 relative overflow-hidden">
            {/* Shine effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full animate-shine-slow"></div>
            <div className="relative">
              <PizzeriaDashboard user={user} />
            </div>
          </div>
        )}

        {activeTab === "opinions" && (
          <div className="opinions-section bg-white rounded-2xl shadow-2xl p-8 relative overflow-hidden">
            {/* Shine effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full animate-shine-slow"></div>
            <div className="relative">
              <Opinions userData={userData} />
            </div>
          </div>
        )}

        {activeTab === "marketing" && (
          <div className="marketing-section bg-white rounded-2xl shadow-2xl p-8 relative overflow-hidden">
            {/* Shine effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full animate-shine-slow"></div>
            <div className="relative">
              <Marketing userData={userData} />
            </div>
          </div>
        )}

        {activeTab === "onboarding" && (
          <div className="onboarding-section bg-white rounded-2xl shadow-2xl p-8 relative overflow-hidden">
            {/* Shine effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full animate-shine-slow"></div>
            <div className="relative">
              <Onboarding 
                userData={userData}
                onboardingState={onboardingState}
                onComplete={completeOnboarding}
                onSkip={skipOnboarding}
                onStartTour={startFeatureTour}
                onCompleteTour={completeFeatureTour}
                onSkipTour={skipFeatureTour}
              />
            </div>
          </div>
        )}

        {activeTab === "subscription" && (
          <div className="subscription-section bg-white rounded-2xl shadow-2xl p-8 relative overflow-hidden">
            {/* Shine effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full animate-shine-slow"></div>
            <div className="relative">
              {/* Subscription Navigation */}
              {subscriptionView !== 'overview' && (
                <div className="mb-6">
                  <button
                    onClick={() => setSubscriptionView('overview')}
                    className="flex items-center gap-2 text-orange-600 hover:text-orange-700 font-medium"
                  >
                    ← Powrót do przeglądu
                  </button>
                </div>
              )}
              
              {/* Subscription Content */}
              {renderSubscriptionContent()}
              
              {/* Quick Navigation for Overview */}
              {subscriptionView === 'overview' && (
                <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <button
                    onClick={() => setSubscriptionView('payment')}
                    className="p-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg font-semibold hover:from-blue-600 hover:to-blue-700 transition-all duration-300"
                  >
                    Zarządzanie płatnościami
                  </button>
                  <button
                    onClick={() => setSubscriptionView('billing')}
                    className="p-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg font-semibold hover:from-green-600 hover:to-green-700 transition-all duration-300"
                  >
                    Historia rozliczeń
                  </button>
                  <button
                    onClick={() => setSubscriptionView('comparison')}
                    className="p-4 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg font-semibold hover:from-purple-600 hover:to-purple-700 transition-all duration-300"
                  >
                    Porównanie planów
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === "settings" && (
          <div className="settings-section bg-white rounded-2xl shadow-2xl p-8 relative overflow-hidden">
            {/* Shine effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full animate-shine-slow"></div>
            <div className="relative">
              <Settings userData={userData} />
            </div>
          </div>
        )}

        {/* Dashboard content wrapper for tour */}
        <div className="dashboard-content" />
      </div>

      {/* Onboarding Components */}
      <OnboardingWizard
        isVisible={onboardingState.isVisible && !onboardingState.showFeatureTour}
        userData={userData}
        onComplete={completeOnboarding}
        onSkip={skipOnboarding}
      />

      <FeatureTour
        isVisible={onboardingState.showFeatureTour}
        userData={userData}
        onComplete={completeFeatureTour}
        onSkip={skipFeatureTour}
      />

      {/* Help Floating Button */}
      <HelpFloatingButton
        onStartTour={startFeatureTour}
        onStartOnboarding={startOnboarding}
        isOnboardingCompleted={onboardingState.isCompleted}
      />
    </div>
  );
}
