"use client"
import { useState } from 'react';
import OnboardingWizard from './OnboardingWizard';
import TutorialSteps from './TutorialSteps';
import WelcomeGuide from './WelcomeGuide';
import FeatureTour from './FeatureTour';
import QuickStart from './QuickStart';
import HelpCenter from './HelpCenter';
import HelpFloatingButton from './HelpFloatingButton';
import useOnboarding from './useOnboarding';

// Main Onboarding component for the tab
function Onboarding({ userData, onboardingState, onComplete, onSkip, onStartTour, onCompleteTour, onSkipTour }) {
  const [activeView, setActiveView] = useState('welcome');

  const renderContent = () => {
    switch (activeView) {
      case 'welcome':
        return (
          <WelcomeGuide 
            userData={userData}
            onNext={() => setActiveView('quickstart')}
          />
        );
      case 'quickstart':
        return (
          <QuickStart 
            userData={userData}
            onNext={() => setActiveView('tutorial')}
            onBack={() => setActiveView('welcome')}
          />
        );
      case 'tutorial':
        return (
          <TutorialSteps 
            userData={userData}
            onNext={() => setActiveView('help')}
            onBack={() => setActiveView('quickstart')}
          />
        );
      case 'help':
        return (
          <HelpCenter 
            userData={userData}
            onBack={() => setActiveView('tutorial')}
          />
        );
      default:
        return (
          <WelcomeGuide 
            userData={userData}
            onNext={() => setActiveView('quickstart')}
          />
        );
    }
  };

  return (
    <div className="onboarding-container">
      {/* Navigation Tabs */}
      <div className="mb-8">
        <nav className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
          <button
            onClick={() => setActiveView('welcome')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeView === 'welcome'
                ? 'bg-white text-orange-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Witamy
          </button>
          <button
            onClick={() => setActiveView('quickstart')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeView === 'quickstart'
                ? 'bg-white text-orange-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Szybki Start
          </button>
          <button
            onClick={() => setActiveView('tutorial')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeView === 'tutorial'
                ? 'bg-white text-orange-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Tutorial
          </button>
          <button
            onClick={() => setActiveView('help')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeView === 'help'
                ? 'bg-white text-orange-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Pomoc
          </button>
        </nav>
      </div>

      {/* Content */}
      <div className="onboarding-content">
        {renderContent()}
      </div>

      {/* Feature Tour Button */}
      <div className="mt-8 text-center">
        <button
          onClick={onStartTour}
          className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-orange-600 hover:to-orange-700 transition-all duration-300 shadow-lg hover:shadow-xl"
        >
          🚀 Rozpocznij Tour Funkcji
        </button>
      </div>
    </div>
  );
}

// Export the main component as default
export default Onboarding;

// Export individual components
export { default as OnboardingWizard } from './OnboardingWizard';
export { default as TutorialSteps } from './TutorialSteps';
export { default as WelcomeGuide } from './WelcomeGuide';
export { default as FeatureTour } from './FeatureTour';
export { default as QuickStart } from './QuickStart';
export { default as HelpCenter } from './HelpCenter';
export { default as HelpFloatingButton } from './HelpFloatingButton';
export { default as useOnboarding } from './useOnboarding'; 