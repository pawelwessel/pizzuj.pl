import React from 'react';
import CustomTour from './CustomTour';

const FeatureTour = ({ 
  isVisible = false, 
  onComplete, 
  onSkip,
  userData = null,
  activeTab = "profile"
}) => {
  return (
    <CustomTour
      isVisible={isVisible}
      onComplete={onComplete}
      onSkip={onSkip}
      userData={userData}
      activeTab={activeTab}
    />
  );
};

export default FeatureTour; 