export interface OnboardingData {
  step: number;
  branding: {
    companyName: string;
    primaryColor: string;
    secondaryColor: string;
    logo?: File;
    favicon?: File;
  };
  businessCase: {
    cards: boolean;
    payments: boolean;
    multiCurrency: boolean;
  };
  cardDesign?: {
    selectedDesign: string;
    selectedNetwork: string;
  };
  countries: string[];
  paymentMethods: string[];
  customerInsights?: string[];
}

export interface StepProps {
  data: OnboardingData;
  onUpdate: (updates: Partial<OnboardingData>) => void;
  onNext: () => void;
  onBack: () => void;
}