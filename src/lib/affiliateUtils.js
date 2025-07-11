/**
 * Affiliate Utilities
 * Handles affiliate link generation, tracking, and management
 */

/**
 * Generate affiliate link with parameters
 * @param {string} baseUrl - Base URL for the registration page
 * @param {string} affiliateId - Affiliate ID
 * @param {string} source - Source of the link (e.g., 'email', 'social', 'website')
 * @param {string} campaign - Campaign name
 * @param {string} referrer - Referrer information
 * @returns {string} Generated affiliate link
 */
export const generateAffiliateLink = (baseUrl, affiliateId, source = null, campaign = null, referrer = null) => {
  const url = new URL(baseUrl);
  
  // Add affiliate parameter
  url.searchParams.set('affiliate', 'true');
  
  // Add affiliate ID if provided
  if (affiliateId) {
    url.searchParams.set('affiliateId', affiliateId);
  }
  
  // Add source parameter
  if (source) {
    url.searchParams.set('source', source);
  }
  
  // Add campaign parameter
  if (campaign) {
    url.searchParams.set('campaign', campaign);
  }
  
  // Add referrer parameter
  if (referrer) {
    url.searchParams.set('referrer', referrer);
  }
  
  return url.toString();
};

/**
 * Parse affiliate parameters from URL
 * @param {URLSearchParams} searchParams - URL search parameters
 * @returns {Object} Parsed affiliate parameters
 */
export const parseAffiliateParams = (searchParams) => {
  return {
    affiliate: searchParams.get('affiliate') === 'true',
    affiliateId: searchParams.get('affiliateId'),
    source: searchParams.get('source'),
    campaign: searchParams.get('campaign'),
    referrer: searchParams.get('referrer'),
  };
};

/**
 * Track affiliate registration
 * @param {Object} userData - User registration data
 * @param {Object} affiliateParams - Affiliate parameters
 * @param {Function} addDocument - Function to add document to Firestore
 */
export const trackAffiliateRegistration = async (userData, affiliateParams, addDocument) => {
  try {
    // Create affiliate registration record
    const registrationData = {
      userId: userData.uid,
      userEmail: userData.email,
      userName: userData.name,
      affiliateId: affiliateParams.affiliateId,
      source: affiliateParams.source,
      campaign: affiliateParams.campaign,
      referrer: affiliateParams.referrer,
      registrationDate: new Date(),
      status: 'pending',
    };

    // Add to affiliate registrations collection
    await addDocument('affiliateRegistrations', `${userData.uid}_${Date.now()}`, registrationData);

    // If affiliate ID is provided, track the referral
    if (affiliateParams.affiliateId) {
      const referralData = {
        affiliateId: affiliateParams.affiliateId,
        referredUserId: userData.uid,
        referredUserEmail: userData.email,
        referredUserName: userData.name,
        source: affiliateParams.source,
        campaign: affiliateParams.campaign,
        referrer: affiliateParams.referrer,
        registrationDate: new Date(),
        status: 'pending',
        earnings: 0,
      };

      await addDocument('referrals', `${affiliateParams.affiliateId}_${userData.uid}`, referralData);
    }

    return true;
  } catch (error) {
    console.error('Error tracking affiliate registration:', error);
    return false;
  }
};

/**
 * Calculate affiliate commission
 * @param {number} restaurantCount - Number of restaurants acquired
 * @param {string} tier - Affiliate tier
 * @param {number} averageRevenue - Average monthly revenue per restaurant
 * @returns {number} Commission amount
 */
export const calculateCommission = (restaurantCount, tier, averageRevenue = 8000) => {
  const tierRates = {
    'Starter': 0.08, // 8%
    'Silver': 0.10,  // 10%
    'Gold': 0.12,    // 12%
    'VIP': 0.15,     // 15%
  };

  const rate = tierRates[tier] || tierRates['Starter'];
  return restaurantCount * averageRevenue * rate;
};

/**
 * Get affiliate tier based on restaurant count
 * @param {number} restaurantCount - Number of restaurants acquired
 * @returns {string} Tier name
 */
export const getAffiliateTier = (restaurantCount) => {
  if (restaurantCount >= 101) return 'VIP';
  if (restaurantCount >= 31) return 'Gold';
  if (restaurantCount >= 16) return 'Silver';
  return 'Starter';
};

/**
 * Validate affiliate link parameters
 * @param {Object} params - URL parameters
 * @returns {boolean} Whether parameters are valid
 */
export const validateAffiliateParams = (params) => {
  // Check if affiliate parameter is present and valid
  if (params.affiliate && params.affiliate !== 'true') {
    return false;
  }

  // Validate affiliate ID format (if provided)
  if (params.affiliateId && !/^[a-zA-Z0-9_-]{3,20}$/.test(params.affiliateId)) {
    return false;
  }

  // Validate source parameter (if provided)
  if (params.source && !/^[a-zA-Z0-9_-]{1,50}$/.test(params.source)) {
    return false;
  }

  // Validate campaign parameter (if provided)
  if (params.campaign && !/^[a-zA-Z0-9_-]{1,50}$/.test(params.campaign)) {
    return false;
  }

  return true;
};

/**
 * Generate affiliate dashboard URL
 * @param {string} userId - User ID
 * @returns {string} Dashboard URL
 */
export const generateAffiliateDashboardUrl = (userId) => {
  return `/user?tab=affiliate&userId=${userId}`;
};

/**
 * Get affiliate statistics
 * @param {Object} userData - User data with affiliate information
 * @returns {Object} Affiliate statistics
 */
export const getAffiliateStats = (userData) => {
  const stats = {
    tier: userData.affiliateTier || 'Starter',
    earnings: userData.affiliateEarnings || 0,
    restaurants: userData.affiliateRestaurants || 0,
    joinedDate: userData.affiliateJoinedDate,
    status: userData.affiliateStatus || 'pending',
  };

  // Calculate potential earnings
  const averageRevenue = 8000;
  const commissionRate = {
    'Starter': 0.08,
    'Silver': 0.10,
    'Gold': 0.12,
    'VIP': 0.15,
  }[stats.tier] || 0.08;

  stats.potentialMonthlyEarnings = stats.restaurants * averageRevenue * commissionRate;
  stats.potentialYearlyEarnings = stats.potentialMonthlyEarnings * 12;

  return stats;
}; 