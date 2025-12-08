'use client';

import React, { useState, ReactNode } from 'react';
import { ChevronLeft, ChevronRight, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import Button from './Button';

export interface Step {
  id: string;
  title: string;
  description?: string;
  component: ReactNode;
  isValid?: boolean;
}

export interface MultiStepFormProps {
  steps: Step[];
  onSubmit: (data: Record<string, any>) => void | Promise<void>;
  onStepChange?: (stepIndex: number) => void;
  className?: string;
  showProgress?: boolean;
  allowSkip?: boolean;
}

const MultiStepForm: React.FC<MultiStepFormProps> = ({
  steps,
  onSubmit,
  onStepChange,
  className,
  showProgress = true,
  allowSkip = false,
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      const nextStep = currentStep + 1;
      setCurrentStep(nextStep);
      onStepChange?.(nextStep);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      const prevStep = currentStep - 1;
      setCurrentStep(prevStep);
      onStepChange?.(prevStep);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      await onSubmit(formData);
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const updateFormData = (data: Record<string, any>) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  const isLastStep = currentStep === steps.length - 1;
  const isFirstStep = currentStep === 0;
  const currentStepData = steps[currentStep];
  const canProceed = allowSkip || currentStepData.isValid !== false;

  return (
    <div className={cn('w-full', className)}>
      {/* Progress Indicator */}
      {showProgress && (
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {steps.map((step, index) => (
              <React.Fragment key={step.id}>
                <div className="flex items-center">
                  <div
                    className={cn(
                      'w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm transition-colors',
                      index < currentStep
                        ? 'bg-primary-600 text-white'
                        : index === currentStep
                        ? 'bg-primary-100 text-primary-600 border-2 border-primary-600'
                        : 'bg-gray-100 text-gray-400'
                    )}
                  >
                    {index < currentStep ? (
                      <Check className="w-5 h-5" />
                    ) : (
                      index + 1
                    )}
                  </div>
                  <div className="ml-3 hidden sm:block">
                    <p
                      className={cn(
                        'text-sm font-medium',
                        index <= currentStep ? 'text-gray-900' : 'text-gray-400'
                      )}
                    >
                      {step.title}
                    </p>
                    {step.description && (
                      <p className="text-xs text-gray-500">{step.description}</p>
                    )}
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={cn(
                      'flex-1 h-0.5 mx-4 transition-colors',
                      index < currentStep ? 'bg-primary-600' : 'bg-gray-200'
                    )}
                  />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      )}

      {/* Step Content */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
        {React.isValidElement(currentStepData.component) &&
          React.cloneElement(currentStepData.component as React.ReactElement<any>, {
            formData,
            updateFormData,
          })}
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={isFirstStep}
          leftIcon={<ChevronLeft className="w-4 h-4" />}
        >
          Previous
        </Button>

        <div className="text-sm text-gray-500">
          Step {currentStep + 1} of {steps.length}
        </div>

        {isLastStep ? (
          <Button
            variant="primary"
            onClick={handleSubmit}
            disabled={!canProceed || isSubmitting}
            isLoading={isSubmitting}
            rightIcon={<Check className="w-4 h-4" />}
          >
            Submit
          </Button>
        ) : (
          <Button
            variant="primary"
            onClick={handleNext}
            disabled={!canProceed}
            rightIcon={<ChevronRight className="w-4 h-4" />}
          >
            Next
          </Button>
        )}
      </div>
    </div>
  );
};

export default MultiStepForm;

