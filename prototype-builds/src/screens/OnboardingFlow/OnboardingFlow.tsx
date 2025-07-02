import React, { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Sidebar } from '../../components/onboarding/Sidebar';
import { Step1Branding } from '../../components/onboarding/Step1Branding';
import { Step2BusinessCase } from '../../components/onboarding/Step2BusinessCase';
import { StepCardDesign } from '../../components/onboarding/StepCardDesign';
import { Step3Countries } from '../../components/onboarding/Step3Countries';
import { Step4PaymentMethods } from '../../components/onboarding/Step4PaymentMethods';
import { Step5CustomerChat } from '../../components/onboarding/Step5CustomerChat';
import { OnboardingData } from '../../types/onboarding';

const OnboardingFlowContent = (): JSX.Element => {
  const [data, setData] = useState<OnboardingData>({
    step: 1, // Start at step 1 (Branding)
    branding: {
      companyName: '',
      primaryColor: '#FFB900',
      secondaryColor: '#4C97E8'
    },
    businessCase: {
      cards: false,
      payments: false,
      multiCurrency: false
    },
    cardDesign: {
      selectedDesign: 'classic',
      selectedNetwork: 'visa'
    },
    countries: [],
    paymentMethods: [],
    customerInsights: []
  });

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const updateData = (updates: Partial<OnboardingData>) => {
    setData(prev => ({ ...prev, ...updates }));
  };

  const nextStep = () => {
    // Custom logic for step progression
    if (data.step === 2 && data.businessCase.cards) {
      // If cards is selected, go to card design step
      setData(prev => ({ ...prev, step: 3 }));
    } else if (data.step === 2 && !data.businessCase.cards) {
      // If cards is not selected, skip card design and go to countries
      setData(prev => ({ ...prev, step: 4 }));
    } else if (data.step === 3) {
      // From card design, go to countries
      setData(prev => ({ ...prev, step: 4 }));
    } else if (data.step === 4) {
      // From countries, go to payment methods
      setData(prev => ({ ...prev, step: 5 }));
    } else if (data.step === 5) {
      // From payment methods, go to customer chat
      setData(prev => ({ ...prev, step: 6 }));
    } else {
      // Normal progression
      setData(prev => ({ ...prev, step: Math.min(prev.step + 1, 6) }));
    }
  };

  const prevStep = () => {
    // Custom logic for step regression
    if (data.step === 4 && data.businessCase.cards) {
      // If coming back to countries and cards is selected, go to card design
      setData(prev => ({ ...prev, step: 3 }));
    } else if (data.step === 4 && !data.businessCase.cards) {
      // If coming back to countries and cards is not selected, go to services
      setData(prev => ({ ...prev, step: 2 }));
    } else if (data.step === 3) {
      // From card design, go back to services
      setData(prev => ({ ...prev, step: 2 }));
    } else if (data.step === 6) {
      // From customer chat, go back to payment methods
      setData(prev => ({ ...prev, step: 5 }));
    } else if (data.step === 5) {
      // From payment methods, go back to countries
      setData(prev => ({ ...prev, step: 4 }));
    } else {
      // Normal regression
      setData(prev => ({ ...prev, step: Math.max(prev.step - 1, 1) }));
    }
  };

  const renderStep = () => {
    const stepProps = {
      data,
      onUpdate: updateData,
      onNext: nextStep,
      onBack: prevStep
    };

    switch (data.step) {
      case 1:
        return <Step1Branding {...stepProps} />;
      case 2:
        return <Step2BusinessCase {...stepProps} />;
      case 3:
        return <StepCardDesign {...stepProps} />;
      case 4:
        return <Step3Countries {...stepProps} />;
      case 5:
        return <Step4PaymentMethods {...stepProps} />;
      case 6:
        return <Step5CustomerChat {...stepProps} />;
      default:
        return <Step1Branding {...stepProps} />;
    }
  };

  return (
    <div className="flex min-h-screen h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Large gradient orbs */}
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-indigo-400/20 to-pink-600/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-cyan-400/10 to-blue-600/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }}></div>
        
        {/* Floating particles */}
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-400/60 rounded-full animate-bounce" style={{ animationDelay: '1s', animationDuration: '3s' }}></div>
        <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-purple-400/60 rounded-full animate-bounce" style={{ animationDelay: '2s', animationDuration: '4s' }}></div>
        <div className="absolute top-1/2 left-3/4 w-1.5 h-1.5 bg-indigo-400/60 rounded-full animate-bounce" style={{ animationDelay: '3s', animationDuration: '5s' }}></div>
        
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.03)_1px,transparent_1px)] bg-[size:20px_20px]"></div>
        
        {/* Radial gradient overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.1)_0%,transparent_50%)]"></div>
      </div>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="lg:hidden fixed top-3 left-3 z-50 p-1.5 bg-white/80 backdrop-blur-sm rounded-md text-gray-700 border border-gray-200/50 shadow-lg hover:bg-white/90 transition-all duration-200"
      >
        {sidebarOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
      </button>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/20 backdrop-blur-sm z-30"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar - Fixed/Sticky with full height */}
      <div className={`
        fixed lg:sticky lg:top-0 inset-y-0 left-0 z-40 w-64 sm:w-72 transform transition-transform duration-300 ease-in-out h-screen
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <Sidebar currentStep={data.step} hasCardService={data.businessCase.cards} />
      </div>
      
      {/* Main Content - Centered */}
      <div className="flex-1 p-3 sm:p-4 lg:p-6 overflow-y-auto relative z-10 h-screen flex items-center justify-center">
        <div className="w-full max-w-6xl">
          {renderStep()}
        </div>
      </div>
    </div>
  );
};

export const OnboardingFlow = (): JSX.Element => {
  return (
    <BrowserRouter basename="/prototype-builds">
      <OnboardingFlowContent />
    </BrowserRouter>
  );
};