import React, { useState } from 'react';
import { Search, MapPin, ArrowLeft } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { StepProps } from '../../types/onboarding';

export const Step3Countries: React.FC<StepProps> = ({ data, onUpdate, onNext, onBack }) => {
  const [searchTerm, setSearchTerm] = useState('');

  // Priority countries (UK, US, Belgium)
  const priorityCountries = [
    { code: 'GB', name: 'United Kingdom', flag: '🇬🇧' },
    { code: 'US', name: 'United States', flag: '🇺🇸' },
    { code: 'BE', name: 'Belgium', flag: '🇧🇪' }
  ];

  // European countries (alphabetical order, excluding priority countries)
  const europeanCountries = [
    { code: 'AT', name: 'Austria', flag: '🇦🇹' },
    { code: 'DK', name: 'Denmark', flag: '🇩🇰' },
    { code: 'FI', name: 'Finland', flag: '🇫🇮' },
    { code: 'FR', name: 'France', flag: '🇫🇷' },
    { code: 'DE', name: 'Germany', flag: '🇩🇪' },
    { code: 'IT', name: 'Italy', flag: '🇮🇹' },
    { code: 'NL', name: 'Netherlands', flag: '🇳🇱' },
    { code: 'NO', name: 'Norway', flag: '🇳🇴' },
    { code: 'ES', name: 'Spain', flag: '🇪🇸' },
    { code: 'SE', name: 'Sweden', flag: '🇸🇪' },
    { code: 'CH', name: 'Switzerland', flag: '🇨🇭' }
  ];

  // Rest of the world (alphabetical order, excluding Russia, North Korea, Iran)
  const restOfWorldCountries = [
    { code: 'AU', name: 'Australia', flag: '🇦🇺' },
    { code: 'CA', name: 'Canada', flag: '🇨🇦' },
    { code: 'JP', name: 'Japan', flag: '🇯🇵' },
    { code: 'SG', name: 'Singapore', flag: '🇸🇬' }
  ];

  // Combine all countries in the specified order
  const availableCountries = [
    ...priorityCountries,
    ...europeanCountries,
    ...restOfWorldCountries
  ];

  const filteredCountries = availableCountries.filter(country =>
    country.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    country.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleCountry = (countryCode: string) => {
    const updatedCountries = data.countries.includes(countryCode)
      ? data.countries.filter(c => c !== countryCode)
      : [...data.countries, countryCode];

    onUpdate({ countries: updatedCountries });
  };

  const hasSelection = data.countries.length > 0;

  return (
    <div className="w-full max-w-3xl mx-auto px-3 sm:px-4">
      {/* Header */}
      <div className="text-center mb-4 sm:mb-6">
        <h1 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-2">
          Select Operating Countries
        </h1>
        <p className="text-gray-600 text-sm sm:text-base max-w-xl mx-auto">
          Choose the countries where you want to operate your services
        </p>
      </div>

      {/* Separator Line */}
      <div className="w-full h-px bg-gray-200 mb-4 sm:mb-6"></div>

      {/* Content */}
      <div className="bg-white rounded-lg sm:rounded-xl p-3 sm:p-4 mb-4 sm:mb-6 border border-gray-200 shadow-sm">
        {/* Search */}
        <div className="relative mb-3 sm:mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-3 h-3 sm:w-4 sm:h-4 text-gray-400" />
          <Input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search countries..."
            className="pl-8 sm:pl-10 h-8 sm:h-9 bg-white border-gray-300 text-gray-900 placeholder-gray-500 rounded-md text-sm"
          />
        </div>

        {/* Selected Countries Summary */}
        {data.countries.length > 0 && (
          <div className="mb-3 sm:mb-4 p-2.5 sm:p-3 bg-blue-50 rounded-md border border-blue-100">
            <div className="flex items-center space-x-1.5 mb-1.5 sm:mb-2">
              <MapPin className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600 flex-shrink-0" />
              <span className="text-gray-900 font-medium text-xs sm:text-sm">
                Selected Countries ({data.countries.length})
              </span>
            </div>
            <div className="flex flex-wrap gap-1">
              {data.countries.map(countryCode => {
                const country = availableCountries.find(c => c.code === countryCode);
                return country ? (
                  <span
                    key={countryCode}
                    className="inline-flex items-center space-x-1 px-1.5 sm:px-2 py-0.5 bg-blue-500 text-white rounded-full text-xs font-medium"
                  >
                    <span>{country.flag}</span>
                    <span className="hidden sm:inline">{country.name}</span>
                    <span className="sm:hidden">{country.code}</span>
                  </span>
                ) : null;
              })}
            </div>
          </div>
        )}

        {/* Countries Grid */}
        <div className="max-h-48 sm:max-h-64 overflow-y-auto">
          <div className="grid grid-cols-1 gap-1.5 sm:gap-2">
            {filteredCountries.map((country) => {
              const isSelected = data.countries.includes(country.code);

              return (
                <div
                  key={country.code}
                  onClick={() => toggleCountry(country.code)}
                  className={`p-2.5 sm:p-3 rounded-md border cursor-pointer transition-all duration-200 ${
                    isSelected
                      ? 'border-blue-400 bg-blue-50'
                      : 'border-gray-200 bg-gray-50 hover:border-blue-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 min-w-0 flex-1">
                      <span className="text-base sm:text-lg flex-shrink-0">{country.flag}</span>
                      <div className="min-w-0 flex-1">
                        <div className="text-gray-900 font-medium text-xs sm:text-sm truncate">{country.name}</div>
                        <div className="text-gray-500 text-xs">{country.code}</div>
                      </div>
                    </div>
                    <div
                      className={`w-3 h-3 sm:w-4 sm:h-4 rounded border-2 transition-all duration-200 flex-shrink-0 ${
                        isSelected
                          ? 'bg-blue-500 border-blue-500'
                          : 'border-gray-300'
                      }`}
                    >
                      {isSelected && (
                        <div className="w-full h-full flex items-center justify-center">
                          <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-white rounded-sm" />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
        <Button
          onClick={onBack}
          variant="secondary"
          className="flex items-center justify-center space-x-2 h-9 sm:h-10 px-4 sm:px-6 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 order-2 sm:order-1"
        >
          <ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4" />
          <span className="text-sm sm:text-base">Back</span>
        </Button>
        <Button
          onClick={onNext}
          disabled={!hasSelection}
          className="flex-1 h-9 sm:h-10 bg-black text-white rounded-md hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base font-medium order-1 sm:order-2"
        >
          Continue
        </Button>
      </div>
    </div>
  );
};