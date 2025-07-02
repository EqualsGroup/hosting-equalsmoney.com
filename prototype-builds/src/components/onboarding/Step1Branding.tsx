import React, { useRef, useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { StepProps } from '../../types/onboarding';

export const Step1Branding: React.FC<StepProps> = ({ data, onUpdate, onNext }) => {
  const logoInputRef = useRef<HTMLInputElement>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);

  const handleFileUpload = (file: File | null) => {
    onUpdate({
      branding: {
        ...data.branding,
        logo: file
      }
    });

    // Create preview URL for the uploaded image
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setLogoPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setLogoPreview(null);
    }
  };

  const handleColourChange = (type: 'primaryColor' | 'secondaryColor', color: string) => {
    onUpdate({
      branding: {
        ...data.branding,
        [type]: color
      }
    });
  };

  // Clear preview if logo is removed
  useEffect(() => {
    if (!data.branding.logo) {
      setLogoPreview(null);
    }
  }, [data.branding.logo]);

  const isValid = data.branding.companyName && data.branding.primaryColor && data.branding.secondaryColor;

  return (
    <div className="w-full max-w-2xl mx-auto px-3 sm:px-4">
      {/* Header */}
      <div className="text-center mb-3 sm:mb-4">
        <h1 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-1.5">
          Set up your branding
        </h1>
        <p className="text-gray-600 text-sm sm:text-base max-w-lg mx-auto">
          Upload your logo and choose your brand colours to personalise your account.
        </p>
      </div>

      {/* Separator Line */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent mb-3 sm:mb-4"></div>

      {/* Form Content */}
      <div className="bg-white/80 backdrop-blur-sm rounded-lg p-3 sm:p-4 mb-3 sm:mb-4 border border-gray-200/50 shadow-lg">
        <div className="space-y-3 sm:space-y-4">
          {/* Company Name */}
          <div className="space-y-1">
            <label className="block text-gray-900 font-medium text-sm">
              Company Name
            </label>
            <Input
              value={data.branding.companyName}
              onChange={(e) => onUpdate({
                branding: { ...data.branding, companyName: e.target.value }
              })}
              placeholder="Enter your company name"
              className="h-8 sm:h-9 bg-white/90 backdrop-blur-sm border-gray-300/50 text-gray-900 placeholder-gray-500 text-sm rounded-md shadow-sm"
            />
          </div>

          {/* Logo Upload */}
          <div className="space-y-1">
            <label className="block text-gray-900 font-medium text-sm">
              Logo Upload
            </label>
            <div
              onClick={() => logoInputRef.current?.click()}
              className="bg-gray-50/80 backdrop-blur-sm border-2 border-dashed border-gray-300/50 rounded-md p-3 sm:p-4 text-center cursor-pointer hover:border-blue-400/50 hover:bg-blue-50/50 transition-all duration-200"
            >
              <div className="flex flex-col items-center space-y-1.5">
                {logoPreview ? (
                  // Show logo preview
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-md overflow-hidden bg-white flex items-center justify-center border border-gray-200/50 shadow-sm">
                    <img
                      src={logoPreview}
                      alt="Logo preview"
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>
                ) : (
                  // Show upload icon
                  <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-md flex items-center justify-center shadow-sm">
                    <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
                  </div>
                )}
                <div>
                  <p className="text-gray-900 text-sm font-medium mb-0.5">
                    {data.branding.logo ? data.branding.logo.name : 'Upload Logo'}
                  </p>
                  <p className="text-gray-500 text-xs">
                    {logoPreview ? 'Click to change logo' : 'Drag and drop or click to select'}
                  </p>
                </div>
              </div>
            </div>
            <input
              ref={logoInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => handleFileUpload(e.target.files?.[0] || null)}
            />
          </div>

          {/* Colour Selection */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
            <div className="space-y-1">
              <label className="block text-gray-900 font-medium text-sm">
                Primary Colour
              </label>
              <div className="flex items-center space-x-2">
                <div
                  className="w-7 h-7 sm:w-8 sm:h-8 rounded-md cursor-pointer border-2 border-gray-300/50 flex-shrink-0 shadow-sm"
                  style={{ backgroundColor: data.branding.primaryColor || '#FFB900' }}
                  onClick={() => document.getElementById('primary-colour')?.click()}
                />
                <Input
                  id="primary-colour"
                  type="color"
                  value={data.branding.primaryColor || '#FFB900'}
                  onChange={(e) => handleColourChange('primaryColor', e.target.value)}
                  className="w-0 h-0 opacity-0 absolute"
                />
                <Input
                  value={data.branding.primaryColor || '#FFB900'}
                  onChange={(e) => handleColourChange('primaryColor', e.target.value)}
                  className="flex-1 h-7 sm:h-8 bg-white/90 backdrop-blur-sm border-gray-300/50 text-gray-900 rounded-md text-xs sm:text-sm shadow-sm"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="block text-gray-900 font-medium text-sm">
                Secondary Colour
              </label>
              <div className="flex items-center space-x-2">
                <div
                  className="w-7 h-7 sm:w-8 sm:h-8 rounded-md cursor-pointer border-2 border-gray-300/50 flex-shrink-0 shadow-sm"
                  style={{ backgroundColor: data.branding.secondaryColor || '#4C97E8' }}
                  onClick={() => document.getElementById('secondary-colour')?.click()}
                />
                <Input
                  id="secondary-colour"
                  type="color"
                  value={data.branding.secondaryColor || '#4C97E8'}
                  onChange={(e) => handleColourChange('secondaryColor', e.target.value)}
                  className="w-0 h-0 opacity-0 absolute"
                />
                <Input
                  value={data.branding.secondaryColor || '#4C97E8'}
                  onChange={(e) => handleColourChange('secondaryColor', e.target.value)}
                  className="flex-1 h-7 sm:h-8 bg-white/90 backdrop-blur-sm border-gray-300/50 text-gray-900 rounded-md text-xs sm:text-sm shadow-sm"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Continue Button */}
      <Button
        onClick={onNext}
        disabled={!isValid}
        className="w-full h-8 sm:h-9 bg-black text-white rounded-md hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium shadow-lg transition-all duration-200"
      >
        Continue
      </Button>
    </div>
  );
};