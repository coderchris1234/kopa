// Validation utilities for KOPA

/**
 * Validate email address
 * @param {string} email - Email to validate
 * @returns {boolean} Whether email is valid
 */
export function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validate password strength
 * @param {string} password - Password to validate
 * @returns {object} Validation result with isValid and message
 */
export function validatePassword(password) {
  if (!password) {
    return { isValid: false, message: 'Password is required' };
  }
  if (password.length < 8) {
    return { isValid: false, message: 'Password must be at least 8 characters' };
  }
  if (!/[A-Z]/.test(password)) {
    return { isValid: false, message: 'Password must contain an uppercase letter' };
  }
  if (!/[a-z]/.test(password)) {
    return { isValid: false, message: 'Password must contain a lowercase letter' };
  }
  if (!/[0-9]/.test(password)) {
    return { isValid: false, message: 'Password must contain a number' };
  }
  return { isValid: true, message: '' };
}

/**
 * Validate username format
 * @param {string} username - Username to validate
 * @returns {object} Validation result with isValid and message
 */
export function validateUsername(username) {
  if (!username) {
    return { isValid: false, message: 'Username is required' };
  }
  if (username.length < 3) {
    return { isValid: false, message: 'Username must be at least 3 characters' };
  }
  if (username.length > 30) {
    return { isValid: false, message: 'Username must be less than 30 characters' };
  }
  if (!/^[a-z0-9_]+$/.test(username)) {
    return { isValid: false, message: 'Username can only contain lowercase letters, numbers, and underscores' };
  }
  return { isValid: true, message: '' };
}

/**
 * Validate required field
 * @param {any} value - Value to validate
 * @param {string} fieldName - Name of the field for error message
 * @returns {string} Error message or empty string if valid
 */
export function validateRequired(value, fieldName) {
  if (!value || (typeof value === 'string' && !value.trim())) {
    return `${fieldName} is required`;
  }
  return '';
}

/**
 * Validate Nigerian Naira amount
 * @param {number} amount - Amount to validate
 * @returns {object} Validation result with isValid and message
 */
export function validateAmount(amount) {
  if (amount === null || amount === undefined || amount === '') {
    return { isValid: false, message: 'Amount is required' };
  }
  const numAmount = Number(amount);
  if (isNaN(numAmount)) {
    return { isValid: false, message: 'Amount must be a valid number' };
  }
  if (numAmount < 100) {
    return { isValid: false, message: 'Amount must be at least ₦100' };
  }
  if (numAmount > 10000000) {
    return { isValid: false, message: 'Amount cannot exceed ₦10,000,000' };
  }
  return { isValid: true, message: '' };
}

/**
 * Validate URL format
 * @param {string} url - URL to validate
 * @returns {boolean} Whether URL is valid
 */
export function isValidUrl(url) {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}
