import React from 'react';
import { Sparkles } from 'lucide-react';

interface SidebarProps {
  currentStep: number;
  hasCardService?: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentStep, hasCardService = false }) => {
  const baseSteps = [
    { number: 1, title: 'Branding', completed: currentStep > 1 },
    { number: 2, title: 'Services', completed: currentStep > 2 },
  ];

  const cardDesignStep = { number: 3, title: 'Design Card', completed: currentStep > 3 };
  
  const laterSteps = [
    { number: hasCardService ? 4 : 3, title: 'Countries', completed: currentStep > (hasCardService ? 4 : 3) },
    { number: hasCardService ? 5 : 4, title: 'Payment Methods', completed: currentStep > (hasCardService ? 5 : 4) },
    { number: hasCardService ? 6 : 5, title: 'Your Customers', completed: currentStep > (hasCardService ? 6 : 5) },
  ];

  // Build steps array conditionally
  const steps = [
    ...baseSteps,
    ...(hasCardService ? [cardDesignStep] : []),
    ...laterSteps
  ];

  const completedSteps = steps.filter(step => step.completed).length;
  const progressPercentage = (completedSteps / steps.length) * 100;

  return (
    <div className="w-full min-h-screen h-full bg-white/90 backdrop-blur-xl border-r border-gray-200/50 sticky top-0 overflow-y-auto shadow-xl flex flex-col">
      {/* Content */}
      <div className="p-3 sm:p-4 flex flex-col flex-1 min-h-0">
        {/* Clean Welcome Message */}
        <div className="mb-4 sm:mb-6 relative flex-shrink-0">
          {/* Simple card with subtle styling */}
          <div className="bg-gradient-to-r from-blue-50/80 to-indigo-50/80 backdrop-blur-sm rounded-lg p-4 border border-blue-100/50 shadow-sm">
            {/* Header with icon */}
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-8 h-8 bg-gradient-to-r from-[#ffb900] to-orange-500 rounded-lg flex items-center justify-center shadow-sm">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1">
                <h2 className="text-gray-900 font-semibold text-lg leading-tight">
                  Let's set up your business
                </h2>
              </div>
            </div>
            
            {/* Clean subtitle */}
            <p className="text-gray-600 text-sm leading-relaxed">
              We'll guide you through each step to create the best solution for your customers
            </p>
          </div>
        </div>

        {/* Account Setup Progress */}
        <div className="mb-4 sm:mb-6 p-3 bg-gray-50/80 backdrop-blur-sm rounded-lg border border-gray-100/50 shadow-sm flex-shrink-0">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-900 font-medium text-xs sm:text-sm">Account setup</span>
            <span className="text-black font-bold text-xs sm:text-sm">{Math.round(progressPercentage)}%</span>
          </div>
          <div className="w-full bg-gray-200/80 rounded-full h-1.5 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-[#ffb900] to-orange-500 rounded-full transition-all duration-700 ease-out shadow-sm"
              style={{ width: `${progressPercentage}%` }}
            >
            </div>
          </div>
        </div>

        {/* Steps Navigation */}
        <nav className="flex-1 min-h-0">
          <ul className="space-y-0.5">
            {steps.map((step) => {
              const isActive = step.number === currentStep;
              const isCompleted = step.completed;

              return (
                <li key={step.number}>
                  <div className="relative flex items-center justify-between py-1.5 px-1">
                    {/* Step Content */}
                    <span className={`text-sm transition-all duration-300 ${
                      isActive
                        ? 'text-gray-900 font-bold'
                        : isCompleted
                        ? 'text-gray-900 font-normal'
                        : 'text-gray-500 font-normal'
                    }`}>
                      {step.title}
                    </span>

                    {/* Status Indicator */}
                    {isActive && (
                      <Sparkles className="w-3 h-3 text-[#ffb900] animate-pulse flex-shrink-0" />
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Powered by Equals Logo - Smaller and left-aligned */}
        <div className="mt-auto pt-4 border-t border-gray-200/50 flex-shrink-0">
          <div className="flex justify-start">
            <img 
              src="/Power by Equals.svg" 
              alt="Powered by Equals" 
              className="h-3 transition-opacity duration-200"
            />
          </div>
        </div>
      </div>
    </div>
  );
};