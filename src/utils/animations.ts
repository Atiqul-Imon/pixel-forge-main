/**
 * Animation utilities and constants
 */

export const animationDurations = {
  fast: 150,
  normal: 200,
  slow: 300,
  slower: 500,
};

export const animationEasings = {
  linear: 'linear',
  easeIn: 'ease-in',
  easeOut: 'ease-out',
  easeInOut: 'ease-in-out',
  spring: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
};

/**
 * Fade in animation
 */
export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: animationDurations.normal / 1000 },
};

/**
 * Slide up animation
 */
export const slideUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: animationDurations.normal / 1000 },
};

/**
 * Slide down animation
 */
export const slideDown = {
  initial: { opacity: 0, y: -20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 20 },
  transition: { duration: animationDurations.normal / 1000 },
};

/**
 * Slide left animation
 */
export const slideLeft = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -20 },
  transition: { duration: animationDurations.normal / 1000 },
};

/**
 * Slide right animation
 */
export const slideRight = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 20 },
  transition: { duration: animationDurations.normal / 1000 },
};

/**
 * Scale animation
 */
export const scale = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.95 },
  transition: { duration: animationDurations.normal / 1000 },
};

/**
 * Stagger children animation
 */
export const staggerChildren = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

/**
 * Hover scale animation
 */
export const hoverScale = {
  scale: 1.05,
  transition: { duration: animationDurations.fast / 1000 },
};

/**
 * Tap scale animation
 */
export const tapScale = {
  scale: 0.95,
  transition: { duration: animationDurations.fast / 1000 },
};

