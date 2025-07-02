import React from 'react';
import { CreditCard, DollarSign, Globe, ArrowLeft, Check } from 'lucide-react';
import { Button } from '../ui/button';
import { StepProps } from '../../types/onboarding';

export const Step2BusinessCase: React.FC<StepProps> = ({ data, onUpdate, onNext, onBack }) => {
  const businessOptions = [
    {
      key: 'cards' as const,
      title: 'Cards',
      description: 'Issue and manage payment cards for your customers',
      icon: CreditCard,
      color: 'bg-gradient-to-br from-purple-100 to-purple-200'
    },
    {
      key: 'payments' as const,
      title: 'Payments',
      description: 'Process online and offline payments seamlessly',
      icon: DollarSign,
      color: 'bg-gradient-to-br from-blue-100 to-blue-200'
    },
    {
      key: 'multiCurrency' as const,
      title: 'Multi Currency',
      description: 'Support multiple currencies and exchange rates',
      icon: Globe,
      color: 'bg-gradient-to-br from-green-100 to-green-200'
    }
  ];

  const toggleOption = (key: keyof typeof data.businessCase) => {
    onUpdate({
      businessCase: {
        ...data.businessCase,
        [key]: !data.businessCase[key]
      }
    });
  };

  const hasSelection = Object.values(data.businessCase).some(Boolean);

  return (
    <div className="w-full max-w-2xl mx-auto px-3 sm:px-4">
      {/* Header */}
      <div className="text-center mb-3 sm:mb-4">
        <h1 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-1.5">
          Choose Your Services
        </h1>
        <p className="text-gray-600 text-sm sm:text-base max-w-lg mx-auto">
          Select the services you want to offer to your customers
        </p>
      </div>

      {/* Separator Line */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent mb-3 sm:mb-4"></div>

      {/* Service Options - Same width as branding */}
      <div className="bg-white/80 backdrop-blur-sm rounded-lg p-3 mb-3 sm:mb-4 border border-gray-200/50 shadow-lg">
        <div className="space-y-2">
          {businessOptions.map((option) => {
            const Icon = option.icon;
            const isSelected = data.businessCase[option.key];

            return (
              <div
                key={option.key}
                onClick={() => toggleOption(option.key)}
                className={`group relative p-3 rounded-lg border-2 cursor-pointer transition-all duration-300 hover:scale-[1.01] ${
                  isSelected
                    ? 'border-blue-400/50 bg-gradient-to-r from-blue-50/80 to-green-50/80 shadow-lg shadow-blue-200/50 backdrop-blur-sm'
                    : 'border-gray-200/50 bg-gray-50/80 hover:border-blue-300/50 hover:bg-blue-50/50 backdrop-blur-sm'
                }`}
              >
                {/* Selection indicator */}
                <div className={`absolute top-2 right-2 w-5 h-5 rounded-full border-2 transition-all duration-300 ${
                  isSelected
                    ? 'bg-blue-500 border-blue-500 scale-110 shadow-sm'
                    : 'border-gray-300/50 group-hover:border-blue-400/50'
                }`}>
                  {isSelected && (
                    <Check className="w-2.5 h-2.5 text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                  )}
                </div>

                <div className="flex items-center space-x-3 pr-6">
                  {/* Icon */}
                  <div className={`p-2.5 rounded-lg ${option.color} flex-shrink-0 transition-transform duration-300 shadow-sm ${
                    isSelected ? 'scale-105' : 'group-hover:scale-105'
                  }`}>
                    <Icon className="w-4 h-4 text-gray-700" />
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <h3 className={`text-base font-semibold mb-1 transition-colors duration-300 ${
                      isSelected ? 'text-gray-900' : 'text-gray-900 group-hover:text-gray-900'
                    }`}>
                      {option.title}
                    </h3>
                    <p className={`text-xs transition-colors duration-300 ${
                      isSelected ? 'text-gray-600' : 'text-gray-500 group-hover:text-gray-600'
                    }`}>
                      {option.description}
                    </p>
                  </div>
                </div>

                {/* Subtle glow effect for selected items */}
                {isSelected && (
                  <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-50/30 to-green-50/30 pointer-events-none" />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
        <Button
          onClick={onBack}
          variant="secondary"
          className="flex items-center justify-center space-x-2 h-8 sm:h-9 px-4 sm:px-6 bg-gray-100/80 backdrop-blur-sm text-gray-700 rounded-md hover:bg-gray-200/80 border border-gray-200/50 shadow-sm order-2 sm:order-1"
        >
          <ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4" />
          <span className="text-sm sm:text-base">Back</span>
        </Button>
        <Button
          onClick={onNext}
          disabled={!hasSelection}
          className="flex-1 h-8 sm:h-9 bg-black text-white rounded-md hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base font-medium shadow-lg transition-all duration-200 order-1 sm:order-2"
        >
          Continue
        </Button>
      </div>
    </div>
  );
};