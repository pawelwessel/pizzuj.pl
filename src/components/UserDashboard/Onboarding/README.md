# Animated User Onboarding System

A comprehensive animated onboarding system for the Pizzuj user dashboard, featuring interactive tours, step-by-step wizards, and smooth animations.

## 🚀 Features

### Core Components
- **OnboardingWizard**: Step-by-step wizard with progress tracking
- **FeatureTour**: Interactive guided tour using custom implementation
- **CustomTour**: Custom tour implementation with spotlight effects
- **HelpFloatingButton**: Floating help button for quick access
- **useOnboarding**: Custom hook for state management

### Animations & UX
- Smooth transitions using Framer Motion
- Progress bars with animated fills
- Floating action buttons with hover effects
- Spotlight effects for tour elements
- Custom tooltips with animations

### State Management
- Firebase integration for persistent state
- Progress tracking across sessions
- User preferences storage
- Completion status tracking

## 📦 Dependencies

```json
{
  "framer-motion": "^12.22.0",
  "react-icons": "^5.5.0",
  "react-toastify": "^11.0.5"
}
```

## 🛠️ Installation

The required dependencies are already installed. If you need to install them manually:

```bash
npm install framer-motion react-icons react-toastify
```

## 📖 Usage

### Basic Implementation

```jsx
import { useOnboarding } from './Onboarding/useOnboarding';
import OnboardingWizard from './Onboarding/OnboardingWizard';
import FeatureTour from './Onboarding/FeatureTour';

function UserDashboard() {
  const {
    onboardingState,
    startOnboarding,
    completeOnboarding,
    startFeatureTour,
  } = useOnboarding(userId);

  return (
    <div>
      {/* Your dashboard content */}
      
      <OnboardingWizard
        isVisible={onboardingState.isVisible}
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
    </div>
  );
}
```

### Using the Hook

```jsx
const {
  onboardingState,
  loading,
  startOnboarding,
  completeOnboarding,
  skipOnboarding,
  startFeatureTour,
  completeFeatureTour,
  skipFeatureTour,
  updatePreferences,
  shouldShowOnboarding,
  resetOnboarding,
} = useOnboarding(userId);
```

### Hook Methods

| Method | Description |
|--------|-------------|
| `startOnboarding()` | Starts the wizard onboarding |
| `completeOnboarding()` | Marks onboarding as completed |
| `skipOnboarding()` | Skips the onboarding |
| `startFeatureTour()` | Starts the interactive tour |
| `completeFeatureTour()` | Completes the feature tour |
| `skipFeatureTour()` | Skips the feature tour |
| `resetOnboarding()` | Resets all onboarding progress |
| `updatePreferences(prefs)` | Updates user preferences |

### State Properties

| Property | Type | Description |
|----------|------|-------------|
| `isVisible` | boolean | Whether onboarding is visible |
| `isCompleted` | boolean | Whether onboarding is completed |
| `currentStep` | number | Current step index |
| `completedSteps` | Set | Set of completed step indices |
| `showFeatureTour` | boolean | Whether feature tour is active |
| `preferences` | object | User preferences |

## 🎨 Customization

### Tour Steps Configuration

```jsx
const steps = [
  {
    target: '.user-header',
    content: (
      <motion.div>
        <h3>Welcome!</h3>
        <p>This is your user dashboard.</p>
      </motion.div>
    ),
    placement: 'bottom',
  },
  // ... more steps
];
```

### Styling

The system uses Tailwind CSS classes and custom animations defined in `globals.css`:

```css
/* Onboarding animations */
.animate-onboarding-pulse {
  animation: onboarding-pulse 2s ease-in-out infinite;
}

.tour-spotlight {
  position: relative;
  z-index: 1001;
}
```

### Custom Tooltips

You can customize the tooltip appearance by modifying the `CustomTour.js` component. The tour includes spotlight effects, smooth animations, and responsive positioning.

## 🔧 Integration with Firebase

The onboarding system automatically saves state to Firebase:

```jsx
// State is saved to users/{userId}/onboarding
{
  onboarding: {
    isVisible: false,
    isCompleted: true,
    currentStep: 0,
    completedSteps: [0, 1, 2],
    showFeatureTour: false,
    lastCompletedAt: "2024-01-01T00:00:00.000Z",
    preferences: {
      showOnboarding: true,
      autoStart: true,
      showTips: true,
    }
  }
}
```

## 🎯 Tour Targets

Add these CSS classes to your elements to make them tour targets:

```jsx
<div className="user-header">
  <UserHeader />
</div>

<div className="tab-navigation">
  <TabNavigation />
</div>

<div className="profile-section">
  <ProfileForm />
</div>

<div className="pizzerias-section">
  <PizzeriaDashboard />
</div>

<div className="dashboard-content">
  {/* Dashboard content */}
</div>
```

## 🧪 Testing

The onboarding system can be tested by navigating to the "Onboarding" tab in the user dashboard. This provides:
- Interactive tutorial sections
- Real-time status monitoring
- Easy testing of all features

## 🎨 Animation Features

### Smooth Transitions
- Fade in/out effects
- Scale animations
- Slide transitions
- Bounce effects

### Interactive Elements
- Hover animations
- Click feedback
- Progress indicators
- Floating buttons

### Visual Feedback
- Progress bars
- Step counters
- Completion indicators
- Spotlight effects
- Keyboard navigation (Arrow keys, Space, Escape)

### Custom Tour Features
- Spotlight highlighting of target elements
- Automatic positioning and viewport detection
- Smooth scrolling to target elements
- Responsive tooltip positioning
- Pause/resume functionality

## 🔄 State Flow

1. **Initial Load**: Check Firebase for existing onboarding state
2. **First Time User**: Show onboarding automatically
3. **Returning User**: Check if onboarding was completed
4. **Manual Trigger**: Allow users to restart via help button
5. **Completion**: Save state to Firebase and show success message

## 🚀 Performance

- Lazy loading of tour components
- Optimized animations with Framer Motion
- Efficient state updates
- Minimal re-renders

## 🐛 Troubleshooting

### Common Issues

1. **Tour not starting**: Check if `isVisible` is true
2. **Targets not found**: Ensure CSS classes are applied
3. **State not saving**: Verify Firebase connection
4. **Animations not working**: Check Framer Motion installation
5. **Tooltip positioning**: Check viewport boundaries and target element visibility
6. **Keyboard navigation**: Ensure no other components are capturing keyboard events

### Debug Mode

Enable debug logging by adding to your component:

```jsx
console.log('Onboarding State:', onboardingState);
```

## 📝 Future Enhancements

- [ ] A/B testing for different onboarding flows
- [ ] Analytics tracking for completion rates
- [ ] Multi-language support
- [ ] Video tutorials integration
- [ ] Personalized onboarding based on user role
- [ ] Mobile-optimized tour experience

## 🤝 Contributing

When adding new features:

1. Follow the existing animation patterns
2. Use the established state management
3. Test with the demo component
4. Update documentation
5. Ensure Firebase integration

## 📄 License

This onboarding system is part of the Pizzuj project and follows the same licensing terms. 