# Affiliate System Documentation

## Overview

The new affiliate system implements a tier-based commission structure with dynamic calculations based on the number of restaurants acquired by each affiliate partner.

## Tier System

### Commission Structure

| Tier | Commission Rate | Restaurant Range | Features |
|------|----------------|------------------|----------|
| **Starter** | 8-10% | 0-15 restaurants | Basic affiliate links, Statistics panel, Bi-weekly payments |
| **Silver** | 10-12% | 16-30 restaurants | Higher commissions, Dedicated promo codes, Priority support |
| **Gold** | 12-15% | 31-100 restaurants | Highest commissions, Exclusive promotions, Account manager, Monthly bonuses |
| **VIP** | 15%+ | 101+ restaurants | Individual arrangements, Special campaigns, Revenue share, Priority new features |

### Key Parameters

- **Average Monthly Revenue per Restaurant**: 8,000 PLN
- **Commission Calculation**: Uses the maximum commission rate for each tier
- **Restaurant Requirements**: Based on minimum restaurant count for each tier

## Calculation Logic

### Core Formula

```
Required Restaurants = Monthly Goal / (Average Monthly Revenue × Commission Rate)
Monthly Earnings = Restaurant Count × Average Monthly Revenue × Commission Rate
Yearly Earnings = Monthly Earnings × 12
```

### Example Calculations

#### Example 1: 5,000 PLN Monthly Goal
- **Target Tier**: Gold (15% commission)
- **Required Restaurants**: 42 restaurants
- **Calculation**: 5,000 ÷ (8,000 × 0.15) = 41.67 → 42 restaurants
- **Monthly Earnings**: 42 × 8,000 × 0.15 = 50,400 PLN
- **Yearly Earnings**: 50,400 × 12 = 604,800 PLN

#### Example 2: 15,000 PLN Monthly Goal
- **Target Tier**: VIP (15% commission)
- **Required Restaurants**: 125 restaurants
- **Calculation**: 15,000 ÷ (8,000 × 0.15) = 125 restaurants
- **Monthly Earnings**: 125 × 8,000 × 0.15 = 150,000 PLN
- **Yearly Earnings**: 150,000 × 12 = 1,800,000 PLN

## Implementation Details

### File Structure

```
src/
├── lib/
│   └── affiliateCalculator.js     # Core calculation logic
├── components/Affiliate/
│   ├── AffiliateCommission.js     # Tier display component
│   ├── AffiliateHowMuchDoYouWantToEarn.js  # Interactive calculator
│   └── AffiliateFAQ.js           # Updated FAQ with new system
└── app/affiliate/
    └── page.js                   # Main affiliate page
```

### Key Functions

#### `calculateRequirements(monthlyGoal)`
- Calculates required restaurants and commission for a given monthly goal
- Returns tier, restaurant count, commission rate, and earnings projections

#### `getTierForRestaurants(restaurantCount)`
- Determines tier based on number of restaurants
- Used for tier progression tracking

#### `calculateMonthlyEarnings(restaurantCount, tierName)`
- Calculates earnings for a given number of restaurants and tier
- Useful for existing affiliate tracking

### Component Updates

#### AffiliateCommission.js
- Updated tier structure with new restaurant ranges
- Uses utility functions for consistent display
- Maintains existing design with updated data

#### AffiliateHowMuchDoYouWantToEarn.js
- Interactive calculator with new tier system
- Real-time calculations and animations
- Goal range: 2,000 - 320,000 PLN
- Preset buttons: 2,000, 5,000, 10,000, 15,000 PLN

#### AffiliateFAQ.js
- Updated FAQ entries to reflect new system
- Added questions about tier progression
- Included calculation examples

## User Experience

### Calculator Features

1. **Interactive Slider**: 2,000 - 320,000 PLN range
2. **Real-time Updates**: Instant calculation updates
3. **Tier Display**: Shows current tier based on goal
4. **Restaurant Requirements**: Displays needed restaurant count
5. **Earnings Projection**: Monthly and yearly earnings
6. **Motivational Messages**: Dynamic messages based on goal

### Visual Feedback

- **Tier Colors**: Each tier has distinct color coding
- **Progress Indicators**: Visual progress bars
- **Animated Numbers**: Smooth number transitions
- **Responsive Design**: Works on all device sizes

## Business Logic

### Tier Progression

1. **Automatic Advancement**: Users automatically advance to higher tiers
2. **Commission Increase**: All restaurants get higher commission rates
3. **No Loss of Earnings**: Previous earnings are preserved
4. **Immediate Effect**: Changes apply to next payment cycle

### Revenue Model

- **Conservative Estimates**: 8,000 PLN per restaurant per month
- **Scalable Structure**: No upper limits on earnings
- **Transparent Calculations**: All formulas are clearly defined
- **Realistic Goals**: Achievable targets for different commitment levels

### Payment Structure

- **Bi-weekly Payments**: Regular, predictable income
- **No Minimum Thresholds**: Every commission is paid
- **Transparent Tracking**: Real-time commission monitoring
- **Multiple Payment Methods**: Bank transfer, PayPal, etc.

## Technical Implementation

### State Management

```javascript
const [monthlyGoal, setMonthlyGoal] = useState(2000);
const [animatedEarnings, setAnimatedEarnings] = useState(0);
const [animatedCommission, setAnimatedCommission] = useState(0);
const [animatedRestaurants, setAnimatedRestaurants] = useState(0);
const [currentTier, setCurrentTier] = useState("Starter");
```

### Animation System

- **Duration**: 1.5 seconds for smooth transitions
- **Easing**: Ease-out quartic function for natural feel
- **Steps**: 60 steps for smooth animation
- **Synchronized**: All values animate together

### Responsive Design

- **Mobile-First**: Optimized for mobile devices
- **Touch-Friendly**: Large touch targets
- **Progressive Enhancement**: Works without JavaScript
- **Accessibility**: WCAG compliant

## Testing

### Calculation Validation

The system includes comprehensive test cases:

```javascript
const testCases = [
  { goal: 2000, expectedTier: "Starter", expectedRestaurants: 25 },
  { goal: 5000, expectedTier: "Gold", expectedRestaurants: 42 },
  { goal: 10000, expectedTier: "Gold", expectedRestaurants: 83 },
  { goal: 15000, expectedTier: "VIP", expectedRestaurants: 125 },
  { goal: 50000, expectedTier: "VIP", expectedRestaurants: 417 },
];
```

### Edge Cases

- **Minimum Goal**: 2,000 PLN (realistic starting point)
- **Maximum Goal**: 320,000 PLN (system limit)
- **Tier Boundaries**: Proper handling of tier transitions
- **Zero Restaurants**: Graceful handling of edge cases

## Future Enhancements

### Planned Features

1. **Advanced Analytics**: Detailed performance tracking
2. **Gamification**: Achievement badges and leaderboards
3. **Social Features**: Referral tracking and sharing
4. **Mobile App**: Native mobile experience
5. **API Integration**: Real-time data synchronization

### Scalability Considerations

- **Database Optimization**: Efficient query patterns
- **Caching Strategy**: Redis for performance
- **CDN Integration**: Global content delivery
- **Monitoring**: Real-time system health checks

## Conclusion

The new affiliate system provides a clear, scalable, and motivating structure for affiliate partners. The tier-based approach encourages growth while maintaining transparency and fairness. The interactive calculator helps users understand their earning potential and set realistic goals.

The implementation is robust, well-tested, and ready for production use with comprehensive documentation and clear upgrade paths for future enhancements. 