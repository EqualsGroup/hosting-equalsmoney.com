import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { StepProps } from '../../types/onboarding';

export const StepCardDesign: React.FC<StepProps> = ({ data, onUpdate, onNext, onBack }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });

  const cardNetworks = [
    { id: 'visa', name: 'Visa', logo: 'VISA' },
    { id: 'mastercard', name: 'Mastercard', logo: 'mastercard' }
  ];

  const handleNetworkChange = (networkId: string) => {
    onUpdate({
      cardDesign: {
        ...data.cardDesign,
        selectedNetwork: networkId
      }
    });
  };

  const handleColourChange = (type: 'primaryColor' | 'secondaryColor', color: string) => {
    onUpdate({
      branding: {
        ...data.branding,
        [type]: color
      }
    });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartPos({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    
    const deltaX = e.clientX - startPos.x;
    const deltaY = e.clientY - startPos.y;
    
    const newRotationY = Math.max(-45, Math.min(45, deltaX * 0.5));
    const newRotationX = Math.max(-20, Math.min(20, -deltaY * 0.3));
    
    setRotation({ x: newRotationX, y: newRotationY });
    
    // Auto-flip when rotated significantly
    if (Math.abs(newRotationY) > 30) {
      setIsFlipped(newRotationY > 0);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    // Reset rotation smoothly
    setTimeout(() => {
      setRotation({ x: 0, y: 0 });
    }, 100);
  };

  const selectedNetwork = data.cardDesign?.selectedNetwork || 'visa';

  return (
    <div className="w-full max-w-6xl mx-auto px-3 sm:px-4">
      {/* Header */}
      <div className="text-center mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-3">
          Design your card
        </h1>
        <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto">
          Customise the appearance of your payment cards for your customers.
        </p>
      </div>

      {/* Separator Line */}
      <div className="w-full h-px bg-gray-200 mb-6 sm:mb-8"></div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-6 sm:mb-8">
        {/* Card Preview Section */}
        <div className="bg-white rounded-xl p-6 sm:p-8 border border-gray-200 shadow-sm">
          <div className="text-center mb-6">
            <h3 className="text-gray-900 font-semibold text-xl mb-2">Card Preview</h3>
            <p className="text-gray-600 text-sm">See how your card will look</p>
          </div>
          
          {/* 3D Card Container */}
          <div className="flex justify-center items-center min-h-[280px] perspective-1000">
            <div
              className="relative preserve-3d cursor-grab active:cursor-grabbing transition-transform duration-300 ease-out"
              style={{
                transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) ${isFlipped ? 'rotateY(180deg)' : ''}`
              }}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
            >
              {/* Front of Card */}
              <div className="w-80 h-48 backface-hidden">
                <div 
                  className="w-full h-full rounded-xl p-6 text-white shadow-2xl relative overflow-hidden"
                  style={{
                    background: `linear-gradient(135deg, ${data.branding.primaryColor || '#FFB900'} 0%, ${data.branding.secondaryColor || '#4C97E8'} 100%)`
                  }}
                >
                  {/* Background Pattern */}
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-4 right-4 w-16 h-16 border-2 border-white rounded-full"></div>
                    <div className="absolute bottom-4 left-4 w-8 h-8 border border-white rounded-full"></div>
                  </div>
                  
                  {/* Card Content */}
                  <div className="relative z-10 h-full flex flex-col justify-between">
                    {/* Top Section */}
                    <div className="flex justify-between items-start">
                      <div className="text-sm font-medium opacity-90">
                        {data.branding.companyName || 'Your Company'}
                      </div>
                      <div className="w-10 h-6 bg-white/20 rounded backdrop-blur-sm"></div>
                    </div>

                    {/* Chip */}
                    <div className="absolute top-16 left-6">
                      <div className="w-12 h-9 bg-gradient-to-br from-yellow-300 to-yellow-500 rounded-md relative">
                        <div className="absolute inset-1 bg-gradient-to-br from-yellow-200 to-yellow-400 rounded-sm"></div>
                      </div>
                    </div>

                    {/* Card Number */}
                    <div className="mt-8">
                      <div className="font-mono text-lg tracking-wider mb-4">
                        •••• •••• •••• 1234
                      </div>
                    </div>

                    {/* Bottom Section */}
                    <div className="flex justify-between items-end">
                      <div>
                        <div className="text-xs opacity-70 mb-1">CARDHOLDER NAME</div>
                        <div className="text-sm font-medium uppercase tracking-wide">
                          JOHN SMITH
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div>
                          <div className="text-xs opacity-70 mb-1">VALID THRU</div>
                          <div className="text-sm font-medium">12/28</div>
                        </div>
                        <div className="text-right">
                          {selectedNetwork === 'visa' ? (
                            <div className="text-xl font-bold tracking-wider">VISA</div>
                          ) : (
                            <div className="flex space-x-1">
                              <div className="w-6 h-6 bg-red-500 rounded-full"></div>
                              <div className="w-6 h-6 bg-yellow-500 rounded-full -ml-3"></div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Back of Card */}
              <div className="w-80 h-48 absolute inset-0 backface-hidden rotate-y-180">
                <div 
                  className="w-full h-full rounded-xl text-white shadow-2xl relative overflow-hidden"
                  style={{
                    background: `linear-gradient(135deg, ${data.branding.primaryColor || '#FFB900'} 0%, ${data.branding.secondaryColor || '#4C97E8'} 100%)`
                  }}
                >
                  {/* Magnetic Strip */}
                  <div className="w-full h-12 bg-black mt-6"></div>
                  
                  {/* Signature Strip */}
                  <div className="mx-6 mt-4">
                    <div className="w-full h-8 bg-white rounded-sm flex items-center px-2">
                      <div className="text-black text-xs italic">Authorised Signature</div>
                    </div>
                  </div>

                  {/* CVV */}
                  <div className="mx-6 mt-3 flex justify-end">
                    <div className="bg-white text-black px-2 py-1 rounded text-sm font-mono">
                      123
                    </div>
                  </div>

                  {/* Bottom Info */}
                  <div className="absolute bottom-4 left-6 right-6">
                    <div className="text-xs opacity-80">
                      {data.branding.companyName || 'Your Company'}
                    </div>
                    <div className="text-xs opacity-60 mt-1">
                      Customer Service: 0800-XXX-XXXX
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-4">
            <p className="text-gray-500 text-sm">
              Drag the card to rotate and see both sides
            </p>
          </div>
        </div>

        {/* Customise Section - More Compact */}
        <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
          <h3 className="text-gray-900 font-semibold text-xl mb-5">Customise</h3>
          
          <div className="space-y-4">
            {/* Card Network */}
            <div>
              <label className="block text-gray-900 font-medium text-sm mb-2">
                Card Network
              </label>
              <div className="grid grid-cols-2 gap-2">
                {cardNetworks.map((network) => (
                  <div
                    key={network.id}
                    onClick={() => handleNetworkChange(network.id)}
                    className={`p-3 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                      selectedNetwork === network.id
                        ? 'border-blue-400 bg-blue-50'
                        : 'border-gray-200 bg-gray-50 hover:border-blue-300'
                    }`}
                  >
                    <div className="text-center">
                      {network.id === 'visa' ? (
                        <div className="text-gray-900 font-bold text-base mb-1">VISA</div>
                      ) : (
                        <div className="flex justify-center space-x-1 mb-1">
                          <div className="w-5 h-5 bg-red-500 rounded-full"></div>
                          <div className="w-5 h-5 bg-yellow-500 rounded-full -ml-2"></div>
                        </div>
                      )}
                      <div className="text-gray-700 text-xs">{network.name}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Primary Colour */}
            <div>
              <label className="block text-gray-900 font-medium text-sm mb-2">
                Primary Colour
              </label>
              <div className="flex items-center space-x-2">
                <div
                  className="w-10 h-9 rounded border-2 border-gray-300 cursor-pointer flex-shrink-0"
                  style={{ backgroundColor: data.branding.primaryColor }}
                  onClick={() => document.getElementById('primary-colour-card')?.click()}
                />
                <Input
                  id="primary-colour-card"
                  type="color"
                  value={data.branding.primaryColor || '#FFB900'}
                  onChange={(e) => handleColourChange('primaryColor', e.target.value)}
                  className="w-0 h-0 opacity-0 absolute"
                />
                <Input
                  value={data.branding.primaryColor || '#FFB900'}
                  onChange={(e) => handleColourChange('primaryColor', e.target.value)}
                  className="flex-1 h-9 bg-white border-gray-300 text-gray-900 rounded-lg text-sm"
                />
              </div>
            </div>

            {/* Secondary Colour */}
            <div>
              <label className="block text-gray-900 font-medium text-sm mb-2">
                Secondary Colour
              </label>
              <div className="flex items-center space-x-2">
                <div
                  className="w-10 h-9 rounded border-2 border-gray-300 cursor-pointer flex-shrink-0"
                  style={{ backgroundColor: data.branding.secondaryColor }}
                  onClick={() => document.getElementById('secondary-colour-card')?.click()}
                />
                <Input
                  id="secondary-colour-card"
                  type="color"
                  value={data.branding.secondaryColor || '#4C97E8'}
                  onChange={(e) => handleColourChange('secondaryColor', e.target.value)}
                  className="w-0 h-0 opacity-0 absolute"
                />
                <Input
                  value={data.branding.secondaryColor || '#4C97E8'}
                  onChange={(e) => handleColourChange('secondaryColor', e.target.value)}
                  className="flex-1 h-9 bg-white border-gray-300 text-gray-900 rounded-lg text-sm"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
        <Button
          onClick={onBack}
          variant="secondary"
          className="flex items-center justify-center space-x-2 h-10 px-6 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 order-2 sm:order-1"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </Button>
        <Button
          onClick={onNext}
          className="flex-1 h-10 bg-black text-white rounded-md hover:bg-gray-800 font-medium order-1 sm:order-2"
        >
          Continue
        </Button>
      </div>
    </div>
  );
};