/**
 * Validation utilities for forms
 */

export interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  email?: boolean;
  url?: boolean;
  min?: number;
  max?: number;
  custom?: (value: any) => string | null;
}

export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

/**
 * Validate a single field
 */
export function validateField(
  value: any,
  rules: ValidationRule,
  fieldName: string
): string | null {
  // Required check
  if (rules.required && (value === undefined || value === null || value === '')) {
    return `${fieldName} is required`;
  }

  // Skip other validations if value is empty (unless required)
  if (!value && !rules.required) {
    return null;
  }

  // Type checks
  if (typeof value === 'string') {
    // Min length
    if (rules.minLength && value.length < rules.minLength) {
      return `${fieldName} must be at least ${rules.minLength} characters`;
    }

    // Max length
    if (rules.maxLength && value.length > rules.maxLength) {
      return `${fieldName} must be no more than ${rules.maxLength} characters`;
    }

    // Email validation
    if (rules.email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        return `${fieldName} must be a valid email address`;
      }
    }

    // URL validation
    if (rules.url) {
      try {
        new URL(value);
      } catch {
        return `${fieldName} must be a valid URL`;
      }
    }

    // Pattern validation
    if (rules.pattern && !rules.pattern.test(value)) {
      return `${fieldName} format is invalid`;
    }
  }

  // Number validations
  if (typeof value === 'number') {
    if (rules.min !== undefined && value < rules.min) {
      return `${fieldName} must be at least ${rules.min}`;
    }

    if (rules.max !== undefined && value > rules.max) {
      return `${fieldName} must be no more than ${rules.max}`;
    }
  }

  // Custom validation
  if (rules.custom) {
    const customError = rules.custom(value);
    if (customError) {
      return customError;
    }
  }

  return null;
}

/**
 * Validate multiple fields
 */
export function validateForm(
  data: Record<string, any>,
  rules: Record<string, ValidationRule>
): ValidationResult {
  const errors: Record<string, string> = {};

  Object.keys(rules).forEach((fieldName) => {
    const fieldRules = rules[fieldName];
    const value = data[fieldName];
    const error = validateField(value, fieldRules, fieldName);

    if (error) {
      errors[fieldName] = error;
    }
  });

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

/**
 * Common validation patterns
 */
export const validationPatterns = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  phone: /^[\d\s\-\+\(\)]+$/,
  url: /^https?:\/\/.+/,
  slug: /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
  alphanumeric: /^[a-zA-Z0-9]+$/,
  numeric: /^\d+$/,
};

/**
 * Common validation rules
 */
export const commonRules = {
  required: { required: true },
  email: { email: true },
  url: { url: true },
  phone: { pattern: validationPatterns.phone },
  slug: { pattern: validationPatterns.slug },
  minLength: (length: number) => ({ minLength: length }),
  maxLength: (length: number) => ({ maxLength: length }),
  min: (value: number) => ({ min: value }),
  max: (value: number) => ({ max: value }),
};

