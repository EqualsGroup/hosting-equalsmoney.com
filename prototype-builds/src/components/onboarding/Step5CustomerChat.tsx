import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, ArrowLeft, Loader2, CheckCircle, Sparkles } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { StepProps } from '../../types/onboarding';

interface Message {
  id: string;
  type: 'bot' | 'user';
  content: string;
  timestamp: Date;
}

export const Step5CustomerChat: React.FC<StepProps> = ({ data, onUpdate, onNext, onBack }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      content: "Hello! I'm here to help you understand your customers better. Let's start with some basic questions about who you'll be serving.",
      timestamp: new Date()
    },
    {
      id: '2',
      type: 'bot',
      content: "Could you describe your customers?",
      timestamp: new Date()
    }
  ]);
  
  const [currentMessage, setCurrentMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [questionsAnswered, setQuestionsAnswered] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Total questions needed for completion
  const totalQuestionsNeeded = 3;
  const progressPercentage = Math.round((questionsAnswered / totalQuestionsNeeded) * 100);

  // Loading steps - Updated to British English
  const loadingSteps = [
    { text: "Analysing your business requirements", duration: 2000 },
    { text: "Setting up your payment infrastructure", duration: 2500 },
    { text: "Configuring your card designs", duration: 2000 },
    { text: "Preparing your customer experience", duration: 2000 },
    { text: "Finalising your application", duration: 1500 }
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getNextQuestion = (questionNumber: number): string => {
    switch (questionNumber) {
      case 2:
        return "That's helpful! What are the typical spending patterns you expect? For example: daily small purchases, monthly larger transactions, or international spending?";
      case 3:
        return "Perfect! One final question - what features do you think your customers would value most? For example: mobile app controls, spending notifications, or security features?";
      default:
        return "Thank you for all that information! I now have a good understanding of your customers and can help tailor the perfect experience for them.";
    }
  };

  const handleSendMessage = async () => {
    if (!currentMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: currentMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    
    // Increment questions answered
    const newQuestionsAnswered = questionsAnswered + 1;
    setQuestionsAnswered(newQuestionsAnswered);
    
    setCurrentMessage('');
    setIsTyping(true);

    // Store customer insights
    onUpdate({
      customerInsights: [
        ...(data.customerInsights || []),
        currentMessage
      ]
    });

    // Simulate AI thinking time
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: getNextQuestion(newQuestionsAnswered + 1),
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleComplete = async () => {
    setIsLoading(true);
    setLoadingStep(0);

    // Simulate the loading process
    for (let i = 0; i < loadingSteps.length; i++) {
      setLoadingStep(i);
      await new Promise(resolve => setTimeout(resolve, loadingSteps[i].duration));
    }

    // Final step - redirect
    setLoadingStep(loadingSteps.length);
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Redirect to the specified URL
    window.location.href = 'https://verdant-sprite-8fe470.netlify.app/';
  };

  const isSetupComplete = questionsAnswered >= totalQuestionsNeeded;

  // Enhanced Light Mode Layout Building Animation Component
  const LightModeLayoutBuildingAnimation = () => {
    const [animationStep, setAnimationStep] = useState(0);
    const [particles, setParticles] = useState<Array<{id: number, x: number, y: number, delay: number}>>([]);

    useEffect(() => {
      // Generate random particles
      const newParticles = Array.from({length: 12}, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: Math.random() * 2000
      }));
      setParticles(newParticles);

      const interval = setInterval(() => {
        setAnimationStep(prev => (prev + 1) % 16); // Extended animation cycle
      }, 600);

      return () => clearInterval(interval);
    }, []);

    return (
      <div className="relative w-96 h-56 mx-auto overflow-hidden">
        {/* Light Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-white via-blue-50 to-indigo-50 animate-pulse"></div>
        
        {/* Floating Particles */}
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute w-1 h-1 bg-gradient-to-r from-[#ffb900] to-[#dc1982] rounded-full animate-ping"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              animationDelay: `${particle.delay}ms`,
              animationDuration: '2s'
            }}
          />
        ))}

        {/* Light Border Effect */}
        <div className="absolute inset-0 border-2 border-transparent bg-gradient-to-r from-[#ffb900] via-blue-500 to-[#dc1982] rounded-xl opacity-20 animate-pulse"></div>
        <div className="absolute inset-1 bg-white rounded-lg shadow-inner"></div>

        {/* Header Bar with Light Theme */}
        <div className={`absolute top-2 left-2 right-2 h-10 bg-gradient-to-r from-[#ffb900] via-orange-400 to-[#dc1982] rounded-t-lg transition-all duration-1000 shadow-lg ${
          animationStep >= 0 ? 'opacity-100 scale-100 shadow-orange-200' : 'opacity-0 scale-95'
        }`}>
          <div className="flex items-center justify-between px-4 h-full">
            <div className="flex space-x-1">
              {[0, 1, 2].map(dot => (
                <div key={dot} className="w-2 h-2 bg-white/60 rounded-full animate-pulse"></div>
              ))}
            </div>
            <div className="text-xs text-white font-bold animate-pulse">Building App</div>
            <div className="flex space-x-1">
              {[0, 1, 2].map(line => (
                <div key={line} className="w-3 h-0.5 bg-white/60 rounded animate-pulse"></div>
              ))}
            </div>
          </div>
        </div>

        {/* Light Sidebar */}
        <div className={`absolute top-12 left-2 w-20 bottom-2 bg-gradient-to-b from-gray-100 via-blue-50 to-indigo-50 transition-all duration-1000 delay-300 shadow-lg border border-gray-200 ${
          animationStep >= 1 ? 'opacity-100 translate-x-0 shadow-blue-100' : 'opacity-0 -translate-x-8'
        }`}>
          {/* Light sidebar items */}
          {[0, 1, 2, 3, 4].map((item, index) => (
            <div
              key={item}
              className={`mx-2 mt-2 h-4 bg-gradient-to-r from-[#ffb900] to-[#dc1982] rounded transition-all duration-700 shadow-sm ${
                animationStep >= 2 + index ? 'opacity-100 scale-100 shadow-pink-200' : 'opacity-0 scale-90'
              }`}
              style={{ animationDelay: `${index * 200}ms` }}
            />
          ))}
        </div>

        {/* Light Main Content Area */}
        <div className={`absolute top-12 left-22 right-2 bottom-2 bg-gradient-to-br from-white via-blue-50 to-indigo-50 transition-all duration-1000 delay-500 shadow-lg border border-gray-200 ${
          animationStep >= 2 ? 'opacity-100 translate-y-0 shadow-indigo-100' : 'opacity-0 translate-y-8'
        }`}>
          {/* Light Navigation Bar */}
          <div className={`mx-3 mt-3 h-8 bg-gradient-to-r from-gray-100 to-blue-100 rounded transition-all duration-800 delay-700 shadow-sm border border-gray-200 ${
            animationStep >= 3 ? 'opacity-100 scale-100 shadow-blue-100' : 'opacity-0 scale-95'
          }`}>
            <div className="flex items-center justify-between px-3 h-full">
              <div className="flex space-x-1">
                {[0, 1, 2, 3].map(dot => (
                  <div key={dot} className="w-1 h-1 bg-gray-400 rounded-full animate-pulse"></div>
                ))}
              </div>
              <div className="w-8 h-1 bg-gradient-to-r from-[#ffb900] to-[#dc1982] rounded animate-pulse"></div>
            </div>
          </div>

          {/* Light Content Cards */}
          <div className="p-3 space-y-2">
            {/* Card 1 - Payment Form */}
            <div className={`h-16 bg-gradient-to-r from-blue-100 via-green-100 to-blue-100 border-2 border-blue-200 rounded-lg transition-all duration-1000 delay-1000 shadow-md ${
              animationStep >= 4 ? 'opacity-100 translate-x-0 shadow-blue-200 scale-105' : 'opacity-0 -translate-x-12'
            }`}>
              <div className="flex items-center px-4 h-full space-x-3">
                <div className="w-8 h-3 bg-gradient-to-r from-[#ffb900] to-[#dc1982] rounded-full animate-pulse shadow-sm"></div>
                <div className="flex-1 space-y-1">
                  <div className="w-full h-1.5 bg-gradient-to-r from-gray-300 to-blue-300 rounded animate-pulse"></div>
                  <div className="w-3/4 h-1.5 bg-gradient-to-r from-gray-300 to-green-300 rounded animate-pulse"></div>
                </div>
                <div className="w-2 h-2 bg-green-500 rounded-full animate-ping"></div>
              </div>
            </div>

            {/* Card 2 - Dashboard */}
            <div className={`h-20 bg-gradient-to-r from-orange-100 via-yellow-100 to-orange-100 border-2 border-orange-200 rounded-lg transition-all duration-1000 delay-1200 shadow-md ${
              animationStep >= 5 ? 'opacity-100 translate-x-0 shadow-orange-200 scale-105' : 'opacity-0 translate-x-12'
            }`}>
              <div className="p-3 h-full">
                <div className="grid grid-cols-3 gap-2 h-full">
                  {[0, 1, 2].map(item => (
                    <div key={item} className={`bg-gradient-to-br from-[#ffb900] to-[#dc1982] rounded transition-all duration-700 shadow-sm ${
                      animationStep >= 6 + item ? 'opacity-100 scale-100 shadow-pink-200' : 'opacity-0 scale-90'
                    }`} style={{ animationDelay: `${item * 150}ms` }}>
                      <div className="w-full h-full bg-gradient-to-br from-orange-200/50 to-transparent rounded animate-pulse"></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Card 3 - User Profile */}
            <div className={`h-14 bg-gradient-to-r from-purple-100 via-pink-100 to-purple-100 border-2 border-purple-200 rounded-lg transition-all duration-1000 delay-1400 shadow-md ${
              animationStep >= 7 ? 'opacity-100 translate-y-0 shadow-purple-200 scale-105' : 'opacity-0 translate-y-8'
            }`}>
              <div className="flex items-center px-4 h-full space-x-3">
                <div className="w-6 h-6 bg-gradient-to-br from-[#ffb900] to-[#dc1982] rounded-full animate-spin shadow-sm"></div>
                <div className="flex-1 space-y-1">
                  <div className="w-2/3 h-1.5 bg-gradient-to-r from-gray-300 to-purple-300 rounded animate-pulse"></div>
                  <div className="w-1/2 h-1.5 bg-gradient-to-r from-gray-300 to-pink-300 rounded animate-pulse"></div>
                </div>
                <Sparkles className="w-3 h-3 text-purple-500 animate-pulse" />
              </div>
            </div>
          </div>

          {/* Light Footer */}
          <div className={`absolute bottom-3 left-3 right-3 h-6 bg-gradient-to-r from-gray-100 via-blue-100 to-gray-100 rounded transition-all duration-800 delay-1600 shadow-sm border border-gray-200 ${
            animationStep >= 8 ? 'opacity-100 scale-100 shadow-blue-100' : 'opacity-0 scale-95'
          }`}>
            <div className="flex items-center justify-center h-full">
              <div className="flex space-x-1">
                {[0, 1, 2, 3, 4].map(dot => (
                  <div
                    key={dot}
                    className={`w-1.5 h-1.5 rounded-full transition-all duration-500 ${
                      animationStep >= 9 + (dot % 3) ? 'bg-gradient-to-r from-[#ffb900] to-[#dc1982] shadow-sm animate-pulse' : 'bg-gray-300'
                    }`}
                    style={{ animationDelay: `${dot * 100}ms` }}
                  ></div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Light Floating Elements */}
        {animationStep >= 10 && (
          <>
            <div className="absolute top-16 right-6 w-4 h-4 bg-gradient-to-r from-[#ffb900] to-[#dc1982] rounded-full animate-bounce shadow-md">
              <div className="absolute inset-0 bg-gradient-to-r from-[#ffb900] to-[#dc1982] rounded-full animate-ping opacity-75"></div>
            </div>
            <div className="absolute bottom-20 left-24 w-3 h-3 bg-gradient-to-r from-[#ffb900] to-[#dc1982] rounded-full animate-pulse shadow-md">
              <div className="absolute inset-0 bg-gradient-to-r from-[#ffb900] to-[#dc1982] rounded-full animate-ping opacity-75"></div>
            </div>
            <div className="absolute top-24 left-12 w-2 h-2 bg-gradient-to-r from-[#ffb900] to-[#dc1982] rounded-full animate-spin shadow-md">
              <div className="absolute inset-0 bg-gradient-to-r from-[#ffb900] to-[#dc1982] rounded-full animate-ping opacity-75"></div>
            </div>
          </>
        )}

        {/* Light Connection Lines */}
        {animationStep >= 11 && (
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            <defs>
              <linearGradient id="lightConnectionGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ffb900" stopOpacity="0.6" />
                <stop offset="50%" stopColor="#10b981" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#dc1982" stopOpacity="0.6" />
              </linearGradient>
              <filter id="lightGlow">
                <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                <feMerge> 
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            <path
              d="M 60 50 Q 150 70 240 90 Q 300 110 360 130"
              stroke="url(#lightConnectionGradient)"
              strokeWidth="2"
              fill="none"
              strokeDasharray="6 6"
              filter="url(#lightGlow)"
              className="animate-pulse"
            />
            <path
              d="M 80 120 Q 160 140 240 160"
              stroke="url(#lightConnectionGradient)"
              strokeWidth="2"
              fill="none"
              strokeDasharray="4 4"
              filter="url(#lightGlow)"
              className="animate-pulse"
              style={{ animationDelay: '0.5s' }}
            />
          </svg>
        )}

        {/* Light Flash Effects */}
        {animationStep >= 12 && (
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-32 h-0.5 bg-gradient-to-r from-transparent via-[#ffb900] to-transparent animate-pulse opacity-40"></div>
            <div className="absolute top-3/4 right-1/4 w-24 h-0.5 bg-gradient-to-r from-transparent via-[#dc1982] to-transparent animate-pulse opacity-40" style={{ animationDelay: '0.3s' }}></div>
          </div>
        )}

        {/* Light Overlay Effect */}
        {animationStep >= 13 && (
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-100/30 to-transparent animate-pulse opacity-50 pointer-events-none"></div>
        )}
      </div>
    );
  };

  // Light Mode Loading Screen - COMPLETELY SEPARATE FROM MAIN LAYOUT
  if (isLoading) {
    const currentLoadingStep = loadingSteps[loadingStep];
    const isComplete = loadingStep >= loadingSteps.length;
    const loadingProgress = ((loadingStep + 1) / (loadingSteps.length + 1)) * 100;

    return (
      <div className="fixed inset-0 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center z-50 overflow-hidden">
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

        <div className="text-center max-w-2xl mx-auto px-8 flex flex-col items-center justify-center min-h-screen relative z-10">
          {/* Enhanced Layout Building Animation */}
          <div className="mb-16 flex justify-center">
            {isComplete ? (
              <div className="w-20 h-20 relative flex items-center justify-center">
                <CheckCircle className="w-20 h-20 text-green-500 animate-pulse" />
                <div className="absolute inset-0 w-20 h-20 border-4 border-green-400 rounded-full animate-ping opacity-75"></div>
                <div className="absolute inset-2 w-16 h-16 border-2 border-green-400 rounded-full animate-spin opacity-50"></div>
              </div>
            ) : (
              <LightModeLayoutBuildingAnimation />
            )}
          </div>

          {/* Enhanced Main Message */}
          <div className="mb-12 text-center">
            <h1 className="text-gray-900 text-4xl font-light mb-6 animate-pulse">
              {isComplete ? 'Your application is ready' : 'Building your application'}
            </h1>
            <p className="text-gray-600 text-xl leading-relaxed">
              {isComplete 
                ? 'Redirecting you to your new financial platform...' 
                : 'Creating your personalised financial solution with advanced features'
              }
            </p>
          </div>

          {/* Enhanced Progress with new gradient - CHANGED TO BLACK */}
          <div className="mb-10 flex flex-col items-center">
            <div className="w-80 bg-gray-200 rounded-full h-2 overflow-hidden shadow-inner">
              <div 
                className="h-full bg-gradient-to-r from-[#ffb900] to-[#dc1982] rounded-full transition-all duration-1000 ease-out shadow-sm"
                style={{ 
                  width: `${loadingProgress}%`,
                  boxShadow: '0 0 10px rgba(255, 185, 0, 0.3)'
                }}
              />
            </div>
            {/* CHANGED: Percentage text is now black */}
            <div className="text-black font-bold text-2xl mt-8">
              {Math.round(loadingProgress)}%
            </div>
          </div>

          {/* Enhanced Current Step */}
          <div className="text-gray-700 text-xl font-light bg-gradient-to-r from-gray-50 to-blue-50 px-8 py-4 rounded-lg shadow-sm border border-gray-200 flex items-center justify-center">
            {isComplete 
              ? (
                <div className="flex items-center justify-center space-x-3">
                  <Sparkles className="w-6 h-6 text-green-500 animate-spin" />
                  <span>Complete</span>
                  <Sparkles className="w-6 h-6 text-green-500 animate-spin" />
                </div>
              )
              : (
                <div className="flex items-center justify-center space-x-3">
                  <div className="w-2 h-2 bg-[#ffb900] rounded-full animate-pulse"></div>
                  <span>{currentLoadingStep?.text || 'Building your application'}</span>
                  <div className="w-2 h-2 bg-[#dc1982] rounded-full animate-pulse"></div>
                </div>
              )
            }
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-3xl mx-auto px-3 sm:px-4">
      {/* Header */}
      <div className="text-center mb-3 sm:mb-4">
        <h1 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-1.5">
          Your customers
        </h1>
        
        {/* Progress Line */}
        <div className="w-32 mx-auto mb-2">
          <div className="w-full bg-gray-200 rounded-full h-1 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-blue-500 to-green-500 rounded-full transition-all duration-700 ease-out"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>
        
        <p className="text-gray-600 text-sm sm:text-base max-w-2xl mx-auto">
          Help us understand your customers better so we can tailor the perfect experience for them.
        </p>
      </div>

      {/* Separator Line */}
      <div className="w-full h-px bg-gray-200 mb-3 sm:mb-4"></div>

      {/* Chat Container - More Compact */}
      <div className="bg-white rounded-lg overflow-hidden mb-3 sm:mb-4 border border-gray-200 shadow-sm">
        {/* Chat Header - More Compact */}
        <div className="bg-gray-50 px-3 py-2 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                <Bot className="w-3 h-3 text-white" />
              </div>
              <div>
                <div className="text-gray-900 font-medium text-xs">Customer Insights AI</div>
                <div className="text-gray-500 text-xs">Online</div>
              </div>
            </div>
            <div className="flex flex-col items-end">
              <div className="text-gray-900 text-xs font-medium">{progressPercentage}% Complete</div>
              {/* Small progress line */}
              <div className="w-12 mt-0.5">
                <div className="w-full bg-gray-200 rounded-full h-0.5 overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-blue-500 to-green-500 rounded-full transition-all duration-700 ease-out"
                    style={{ width: `${progressPercentage}%` }}
                  />
                </div>
              </div>
              <div className="text-gray-500 text-xs">
                {isSetupComplete ? 'Ready!' : 'Learning...'}
              </div>
            </div>
          </div>
        </div>

        {/* Messages Area - Reduced Height */}
        <div className="h-64 overflow-y-auto p-3 space-y-3 bg-gray-50">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex items-start space-x-2 max-w-[85%] ${
                message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''
              }`}>
                <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${
                  message.type === 'bot' ? 'bg-blue-500' : 'bg-[#ffb900]'
                }`}>
                  {message.type === 'bot' ? (
                    <Bot className="w-2.5 h-2.5 text-white" />
                  ) : (
                    <User className="w-2.5 h-2.5 text-white" />
                  )}
                </div>
                <div className={`rounded-lg px-2.5 py-1.5 shadow-sm ${
                  message.type === 'bot' 
                    ? 'bg-white text-gray-900 border border-gray-200' 
                    : 'bg-blue-500 text-white'
                }`}>
                  <p className="text-xs leading-relaxed">{message.content}</p>
                  <div className="text-xs opacity-60 mt-1">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex justify-start">
              <div className="flex items-start space-x-2 max-w-[85%]">
                <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <Bot className="w-2.5 h-2.5 text-white" />
                </div>
                <div className="bg-white rounded-lg px-2.5 py-1.5 border border-gray-200 shadow-sm">
                  <div className="flex space-x-1">
                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area - More Compact */}
        <div className="border-t border-gray-200 p-2.5 bg-white">
          <div className="flex items-center space-x-2">
            <Input
              ref={inputRef}
              value={currentMessage}
              onChange={(e) => setCurrentMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={isSetupComplete ? "Setup complete! Click 'Complete Setup' to finish." : "Type your message..."}
              className="flex-1 h-8 bg-white border-gray-300 text-gray-900 placeholder-gray-500 rounded-lg text-sm"
              disabled={isTyping || isSetupComplete}
            />
            <Button
              onClick={handleSendMessage}
              disabled={!currentMessage.trim() || isTyping || isSetupComplete}
              className="w-8 h-8 p-0 bg-blue-500 hover:bg-blue-600 rounded-lg disabled:opacity-50"
            >
              <Send className="w-3 h-3" />
            </Button>
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
        <Button
          onClick={onBack}
          variant="secondary"
          className="flex items-center justify-center space-x-2 h-8 sm:h-9 px-4 sm:px-6 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 order-2 sm:order-1"
          disabled={isLoading}
        >
          <ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4" />
          <span className="text-sm sm:text-base">Back</span>
        </Button>
        <Button
          onClick={handleComplete}
          disabled={!isSetupComplete || isLoading}
          className="flex-1 h-8 sm:h-9 bg-black text-white rounded-md hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base font-medium order-1 sm:order-2"
        >
          {isLoading ? (
            <div className="flex items-center space-x-2">
              <Loader2 className="w-3 h-3 animate-spin" />
              <span>Building App...</span>
            </div>
          ) : (
            'Complete Setup'
          )}
        </Button>
      </div>
    </div>
  );
};