'use client';

import React, { ReactNode } from 'react';
import { motion, Variants } from 'framer-motion';
import { cn } from '@/lib/utils';
import { fadeIn, slideUp, slideDown, slideLeft, slideRight, scale } from '@/utils/animations';

export type AnimationType = 'fade' | 'slideUp' | 'slideDown' | 'slideLeft' | 'slideRight' | 'scale';

export interface AnimatedContainerProps {
  children: ReactNode;
  animation?: AnimationType;
  delay?: number;
  duration?: number;
  className?: string;
  once?: boolean; // Only animate once when in view
}

const animationVariants: Record<AnimationType, Variants> = {
  fade: {
    initial: fadeIn.initial,
    animate: fadeIn.animate,
    exit: fadeIn.exit,
  },
  slideUp: {
    initial: slideUp.initial,
    animate: slideUp.animate,
    exit: slideUp.exit,
  },
  slideDown: {
    initial: slideDown.initial,
    animate: slideDown.animate,
    exit: slideDown.exit,
  },
  slideLeft: {
    initial: slideLeft.initial,
    animate: slideLeft.animate,
    exit: slideLeft.exit,
  },
  slideRight: {
    initial: slideRight.initial,
    animate: slideRight.animate,
    exit: slideRight.exit,
  },
  scale: {
    initial: scale.initial,
    animate: scale.animate,
    exit: scale.exit,
  },
};

const AnimatedContainer: React.FC<AnimatedContainerProps> = ({
  children,
  animation = 'fade',
  delay = 0,
  duration = 0.2,
  className,
  once = false,
}) => {
  const variants = animationVariants[animation];

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={variants}
      transition={{
        duration,
        delay: delay / 1000,
        ease: 'easeOut',
      }}
      viewport={{ once }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedContainer;

