import React from 'react';
import { CreditCard, Smartphone, Building, CheckCircle, ArrowLeft, DollarSign, Banknote, Link } from 'lucide-react';
import { Button } from '../ui/button';
import { StepProps } from '../../types/onboarding';

export const Step4PaymentMethods: React.FC<StepProps> = ({ data, onUpdate, onNext, onBack }) => {
  const payInMethods = [
    {
      id: 'pay_by_card',
      title: 'Pay by card',
      description: 'Credit and debit card payments',
      icon: CreditCard,
      color: 'bg-purple-100',
      popular: true
    },
    {
      id: 'pay_by_digital_wallet',
      title: 'Pay by Digital Wallet',
      description: 'Apple Pay, Google Pay, Samsung Pay',
      icon: Smartphone,
      color: 'bg-blue-100',
      popular: true
    },
    {
      id: 'pay_by_roqqett',
      title: 'Pay by Roqqett',
      description: 'Open banking solution for instant payments',
      icon: Link,
      color: 'bg-green-100',
      popular: false
    },
    {
      id: 'pay_by_bank_transfer',
      title: 'Pay by bank transfer',
      description: 'Direct bank transfers',
      icon: Building,
      color: 'bg-orange-100',
      popular: false
    },
    {
      id: 'usdc_pay_in',
      title: 'USDC',
      description: 'USD Coin payments',
      icon: Banknote,
      color: 'bg-indigo-100',
      popular: false
    }
  ];

  const payOutMethods = [
    {
      id: 'faster_payments',
      title: 'Faster payments',
      description: 'UK instant payments',
      icon: Building,
      color: 'bg-green-100',
      popular: true
    },
    {
      id: 'bacs',
      title: 'BACS',
      description: 'UK bank transfers',
      icon: Building,
      color: 'bg-blue-100',
      popular: true
    },
    {
      id: 'swift',
      title: 'SWIFT',
      description: 'International wire transfers',
      icon: Building,
      color: 'bg-purple-100',
      popular: false
    },
    {
      id: 'sepa_ct',
      title: 'SEPA CT, SEPA Instant',
      description: 'European credit transfers',
      icon: Building,
      color: 'bg-orange-100',
      popular: true
    },
    {
      id: 'sepa_direct_debit',
      title: 'SEPA Direct Debit',
      description: 'European direct debits',
      icon: Building,
      color: 'bg-yellow-100',
      popular: false
    },
    {
      id: 'ach',
      title: 'ACH',
      description: 'US automated clearing house',
      icon: Building,
      color: 'bg-red-100',
      popular: false
    },
    {
      id: 'wires',
      title: 'Wires',
      description: 'Wire transfers',
      icon: Building,
      color: 'bg-pink-100',
      popular: false
    },
    {
      id: 'usdc_pay_out',
      title: 'USDC',
      description: 'USD Coin payouts',
      icon: Banknote,
      color: 'bg-indigo-100',
      popular: false
    }
  ];

  const togglePaymentMethod = (methodId: string) => {
    const updatedMethods = data.paymentMethods.includes(methodId)
      ? data.paymentMethods.filter(m => m !== methodId)
      : [...data.paymentMethods, methodId];

    onUpdate({ paymentMethods: updatedMethods });
  };

  const hasSelection = data.paymentMethods.length > 0;

  const renderMethodSection = (title: string, methods: typeof payInMethods) => (
    <div className="mb-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-3">{title}</h3>
      <div className="space-y-2">
        {methods.map((method) => {
          const Icon = method.icon;
          const isSelected = data.paymentMethods.includes(method.id);

          return (
            <div
              key={method.id}
              onClick={() => togglePaymentMethod(method.id)}
              className={`relative p-3 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                isSelected
                  ? 'border-blue-400 bg-blue-50'
                  : 'border-gray-200 bg-gray-50 hover:border-blue-300'
              }`}
            >
              {method.popular && (
                <div className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
                  Popular
                </div>
              )}
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-lg ${method.color} flex-shrink-0`}>
                  <Icon className="w-4 h-4 text-gray-700" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-base font-semibold text-gray-900 mb-0.5">
                    {method.title}
                  </h4>
                  <p className="text-gray-500 text-xs">
                    {method.description}
                  </p>
                </div>
                <div className="flex items-center justify-center w-4 h-4 flex-shrink-0">
                  {isSelected ? (
                    <CheckCircle className="w-4 h-4 text-blue-500" />
                  ) : (
                    <div className="w-3 h-3 rounded border-2 border-gray-300" />
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="w-full max-w-3xl mx-auto px-3 sm:px-4">
      {/* Header */}
      <div className="text-center mb-3 sm:mb-4">
        <h1 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-1.5">
          Choose Payment Methods
        </h1>
        <p className="text-gray-600 text-sm sm:text-base max-w-lg mx-auto">
          Select the payment methods you want to accept and send
        </p>
      </div>

      {/* Separator Line */}
      <div className="w-full h-px bg-gray-200 mb-3 sm:mb-4"></div>

      {/* Payment Methods - Two Sections */}
      <div className="bg-white rounded-lg p-4 mb-3 sm:mb-4 border border-gray-200 shadow-sm max-h-96 overflow-y-auto">
        {renderMethodSection('Pay in', payInMethods)}
        {renderMethodSection('Pay out', payOutMethods)}
      </div>

      {/* Navigation Buttons */}
      <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
        <Button
          onClick={onBack}
          variant="secondary"
          className="flex items-center justify-center space-x-2 h-8 sm:h-9 px-4 sm:px-6 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 order-2 sm:order-1"
        >
          <ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4" />
          <span className="text-sm sm:text-base">Back</span>
        </Button>
        <Button
          onClick={onNext}
          disabled={!hasSelection}
          className="flex-1 h-8 sm:h-9 bg-black text-white rounded-md hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base font-medium order-1 sm:order-2"
        >
          Continue
        </Button>
      </div>
    </div>
  );
};