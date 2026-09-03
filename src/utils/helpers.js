// Helper utilities for KOPA

/**
 * Copy text to clipboard
 * @param {string} text - Text to copy
 * @returns {Promise<boolean>} Whether copy was successful
 */
export async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    console.error('Failed to copy:', err);
    return false;
  }
}

/**
 * Generate KOPA link for a username
 * @param {string} username - Creator username
 * @returns {string} Full KOPA link
 */
export function generateKopaLink(username) {
  return `kopa.africa/${username}`;
}

/**
 * Generate full URL for KOPA link
 * @param {string} username - Creator username
 * @returns {string} Full URL
 */
export function generateKopaUrl(username) {
  return `https://kopa.africa/${username}`;
}

/**
 * Debounce function
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} Debounced function
 */
export function debounce(func, wait = 300) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Generate random ID
 * @returns {string} Random ID
 */
export function generateId() {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Sleep utility for async operations
 * @param {number} ms - Milliseconds to sleep
 * @returns {Promise} Promise that resolves after ms
 */
export function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Get avatar color based on name
 * @param {string} name - Name to generate color from
 * @returns {string} Hex color
 */
export function getAvatarColor(name) {
  const colors = [
    '#2563EB', '#7C3AED', '#DB2777', '#DC2626',
    '#EA580C', '#D97706', '#059669', '#0891B2'
  ];
  
  if (!name) return colors[0];
  
  const charSum = name.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0);
  return colors[charSum % colors.length];
}

/**
 * Calculate conversion rate
 * @param {number} conversions - Number of conversions
 * @param {number} total - Total number of attempts
 * @returns {number} Conversion rate as percentage
 */
export function calculateConversionRate(conversions, total) {
  if (!total || total === 0) return 0;
  return (conversions / total) * 100;
}

/**
 * Share via Web Share API with fallback
 * @param {object} data - Data to share (title, text, url)
 * @returns {Promise<boolean>} Whether share was successful
 */
export async function share(data) {
  if (navigator.share) {
    try {
      await navigator.share(data);
      return true;
    } catch (err) {
      if (err.name !== 'AbortError') {
        console.error('Share failed:', err);
      }
      return false;
    }
  }
  // Fallback: copy URL to clipboard
  if (data.url) {
    return await copyToClipboard(data.url);
  }
  return false;
}
