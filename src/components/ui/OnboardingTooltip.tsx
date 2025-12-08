'use client';

import React, { useState, useEffect } from 'react';
import { X, ChevronRight, ChevronLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import Button from './Button';

export interface OnboardingStep {
  id: string;
  target: string; // CSS selector or ref
  title: string;
  content: React.ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
}

export interface OnboardingTooltipProps {
  steps: OnboardingStep[];
  isOpen: boolean;
  onClose: () => void;
  onComplete?: () => void;
  storageKey?: string; // To remember if user has seen onboarding
  className?: string;
}

const OnboardingTooltip: React.FC<OnboardingTooltipProps> = ({
  steps,
  isOpen,
  onClose,
  onComplete,
  storageKey,
  className,
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const [targetElement, setTargetElement] = useState<HTMLElement | null>(null);

  const currentStepData = steps[currentStep];
  const isFirst = currentStep === 0;
  const isLast = currentStep === steps.length - 1;

  useEffect(() => {
    if (!isOpen || !currentStepData) return;

    const element = document.querySelector(currentStepData.target) as HTMLElement;
    if (element) {
      setTargetElement(element);
      updatePosition(element);
    }

    const handleResize = () => {
      if (element) updatePosition(element);
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleResize, true);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleResize, true);
    };
  }, [isOpen, currentStep, currentStepData]);

  const updatePosition = (element: HTMLElement) => {
    const rect = element.getBoundingClientRect();
    const tooltipWidth = 320;
    const tooltipHeight = 200;
    const gap = 12;

    let top = 0;
    let left = 0;

    switch (currentStepData.position || 'bottom') {
      case 'top':
        top = rect.top - tooltipHeight - gap;
        left = rect.left + rect.width / 2 - tooltipWidth / 2;
        break;
      case 'bottom':
        top = rect.bottom + gap;
        left = rect.left + rect.width / 2 - tooltipWidth / 2;
        break;
      case 'left':
        top = rect.top + rect.height / 2 - tooltipHeight / 2;
        left = rect.left - tooltipWidth - gap;
        break;
      case 'right':
        top = rect.top + rect.height / 2 - tooltipHeight / 2;
        left = rect.right + gap;
        break;
    }

    // Keep within viewport
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    if (left < 0) left = gap;
    if (left + tooltipWidth > viewportWidth) left = viewportWidth - tooltipWidth - gap;
    if (top < 0) top = gap;
    if (top + tooltipHeight > viewportHeight) top = viewportHeight - tooltipHeight - gap;

    setPosition({ top, left });
  };

  const handleNext = () => {
    if (isLast) {
      handleComplete();
    } else {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (!isFirst) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleComplete = () => {
    if (storageKey && typeof window !== 'undefined') {
      localStorage.setItem(storageKey, 'true');
    }
    onComplete?.();
    onClose();
  };

  const handleSkip = () => {
    handleComplete();
  };

  if (!isOpen || !currentStepData) return null;

  return (
    <>
      {/* Overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-40 bg-black/50"
        onClick={handleSkip}
      />

      {/* Highlight */}
      {targetElement && (
        <div
          className="fixed z-30 pointer-events-none"
          style={{
            top: targetElement.getBoundingClientRect().top - 4,
            left: targetElement.getBoundingClientRect().left - 4,
            width: targetElement.getBoundingClientRect().width + 8,
            height: targetElement.getBoundingClientRect().height + 8,
            borderRadius: '8px',
            boxShadow: '0 0 0 9999px rgba(0, 0, 0, 0.5)',
          }}
        />
      )}

      {/* Tooltip */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className={cn(
          'fixed z-50 bg-white rounded-lg shadow-xl border border-gray-200 w-80',
          className
        )}
        style={{
          top: `${position.top}px`,
          left: `${position.left}px`,
        }}
      >
        <div className="p-4">
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                {currentStepData.title}
              </h3>
              <p className="text-sm text-gray-500">
                Step {currentStep + 1} of {steps.length}
              </p>
            </div>
            <button
              onClick={handleSkip}
              className="p-1 text-gray-400 hover:text-gray-600"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="text-sm text-gray-700 mb-4">
            {currentStepData.content}
          </div>

          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleSkip}
            >
              Skip
            </Button>
            <div className="flex items-center gap-2">
              {!isFirst && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handlePrevious}
                  leftIcon={<ChevronLeft className="w-4 h-4" />}
                >
                  Previous
                </Button>
              )}
              <Button
                variant="primary"
                size="sm"
                onClick={handleNext}
                rightIcon={isLast ? undefined : <ChevronRight className="w-4 h-4" />}
              >
                {isLast ? 'Complete' : 'Next'}
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default OnboardingTooltip;

