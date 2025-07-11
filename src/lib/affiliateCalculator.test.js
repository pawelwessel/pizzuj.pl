// Simple test file to verify affiliate calculations
// This can be run in the browser console or as a simple validation

import { 
  calculateRequirements, 
  getTierForRestaurants, 
  calculateMonthlyEarnings,
  TIER_SYSTEM 
} from './affiliateCalculator.js';

// Test cases
const testCases = [
  { goal: 2000, expectedTier: "Starter", expectedRestaurants: 25 },
  { goal: 5000, expectedTier: "Gold", expectedRestaurants: 42 },
  { goal: 10000, expectedTier: "Gold", expectedRestaurants: 83 },
  { goal: 15000, expectedTier: "VIP", expectedRestaurants: 125 },
  { goal: 50000, expectedTier: "VIP", expectedRestaurants: 417 },
];

console.log("Testing affiliate calculations...");

testCases.forEach((testCase, index) => {
  const result = calculateRequirements(testCase.goal);
  
  console.log(`\nTest ${index + 1}: Goal ${testCase.goal} PLN`);
  console.log(`Expected Tier: ${testCase.expectedTier}, Got: ${result.tier}`);
  console.log(`Expected Restaurants: ${testCase.expectedRestaurants}, Got: ${result.requiredRestaurants}`);
  console.log(`Commission: ${(result.effectiveCommission * 100).toFixed(1)}%`);
  console.log(`Monthly Earnings: ${result.monthlyEarnings.toLocaleString('pl-PL')} PLN`);
  console.log(`Yearly Earnings: ${result.yearlyEarnings.toLocaleString('pl-PL')} PLN`);
  
  // Basic validation
  const tierMatch = result.tier === testCase.expectedTier;
  const restaurantRange = Math.abs(result.requiredRestaurants - testCase.expectedRestaurants) <= 5;
  
  console.log(`✅ Tier Match: ${tierMatch}`);
  console.log(`✅ Restaurant Count Close: ${restaurantRange}`);
});

// Test tier detection
console.log("\nTesting tier detection...");
const tierTests = [5, 20, 50, 150];
tierTests.forEach(restaurantCount => {
  const tier = getTierForRestaurants(restaurantCount);
  console.log(`${restaurantCount} restaurants → ${tier.name} tier`);
});

// Test earnings calculation
console.log("\nTesting earnings calculation...");
const earningsTests = [
  { restaurants: 10, tier: "Starter" },
  { restaurants: 25, tier: "Silver" },
  { restaurants: 50, tier: "Gold" },
  { restaurants: 150, tier: "VIP" }
];

earningsTests.forEach(test => {
  const earnings = calculateMonthlyEarnings(test.restaurants, test.tier);
  console.log(`${test.restaurants} restaurants (${test.tier}) → ${earnings.monthlyEarnings.toLocaleString('pl-PL')} PLN/month`);
});

console.log("\n✅ All tests completed!"); 