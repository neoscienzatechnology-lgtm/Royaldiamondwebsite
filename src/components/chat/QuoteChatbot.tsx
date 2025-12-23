import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Sparkles, Phone, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

type CleaningType = 'regular' | 'deep' | null;
type Frequency = 'weekly' | 'biweekly' | 'monthly' | null;
type HomeSize = '2/2' | '3/2-3' | '4/2.5-3' | '5/4' | null;
type Extra = 'oven1' | 'oven2' | 'fridge' | 'none';

interface QuoteData {
  cleaningType: CleaningType;
  frequency: Frequency;
  homeSize: HomeSize;
  extras: Extra[];
}

const PHONE_NUMBER = '+14253996635';
const PHONE_DISPLAY = '(425) 399-6635';

// Pricing tables
const PRICING = {
  regular: {
    weekly: { '2/2': 120, '3/2-3': 150, '4/2.5-3': 160, '5/4': 180 },
    biweekly: { '2/2': 150, '3/2-3': 170, '4/2.5-3': 200, '5/4': 240 },
    monthly: { '2/2': 180, '3/2-3': 200, '4/2.5-3': 250, '5/4': 280 },
  },
  extras: {
    oven1: 30,
    oven2: 50,
    fridge: 50,
    none: 0,
  },
};

const HOME_SIZE_LABELS: Record<string, string> = {
  '2/2': '2 bedrooms / 2 bathrooms',
  '3/2-3': '3 bedrooms / 2-3 bathrooms',
  '4/2.5-3': '4 bedrooms / 2.5-3 bathrooms',
  '5/4': '5 bedrooms / 4 bathrooms',
};

const FREQUENCY_LABELS: Record<string, string> = {
  weekly: 'Weekly',
  biweekly: 'Bi-weekly',
  monthly: 'Monthly',
};

const EXTRA_LABELS: Record<string, string> = {
  oven1: 'Oven (1 door) - $30',
  oven2: 'Oven (2 doors) - $50',
  fridge: 'Refrigerator - $50',
  none: 'None',
};

type Step = 'cleaningType' | 'frequency' | 'homeSize' | 'extras' | 'quote';

interface Message {
  type: 'bot' | 'user';
  content: string;
  options?: { value: string; label: string }[];
  isQuote?: boolean;
  quoteData?: {
    cleaningType: string;
    frequency: string;
    homeSize: string;
    extras: string[];
    basePrice: number;
    extrasPrice: number;
    total: number;
    isDeepClean: boolean;
  };
}

const QuoteChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<Step>('cleaningType');
  const [quoteData, setQuoteData] = useState<QuoteData>({
    cleaningType: null,
    frequency: null,
    homeSize: null,
    extras: [],
  });
  const [messages, setMessages] = useState<Message[]>([]);
  const [emailSent, setEmailSent] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const handleOpenChat = () => setIsOpen(true);
    window.addEventListener('openEstimateChat', handleOpenChat);
    return () => window.removeEventListener('openEstimateChat', handleOpenChat);
  }, []);

  // Initialize chat when opened
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          type: 'bot',
          content: 'Hello! 👋 Get your cleaning quote in seconds.',
        },
        {
          type: 'bot',
          content: 'What type of cleaning do you need?',
          options: [
            { value: 'regular', label: 'Regular Cleaning' },
            { value: 'deep', label: 'Deep Cleaning (Move-in/Move-out)' },
          ],
        },
      ]);
    }
  }, [isOpen, messages.length]);

  const calculateQuote = () => {
    if (quoteData.cleaningType === 'deep') {
      return {
        basePrice: 0,
        extrasPrice: 0,
        total: 0,
        isDeepClean: true,
      };
    }

    const freq = quoteData.frequency as 'weekly' | 'biweekly' | 'monthly';
    const size = quoteData.homeSize as '2/2' | '3/2-3' | '4/2.5-3' | '5/4';
    
    const basePrice = PRICING.regular[freq]?.[size] || 0;
    const extrasPrice = quoteData.extras.reduce((sum, extra) => {
      return sum + (PRICING.extras[extra] || 0);
    }, 0);

    return {
      basePrice,
      extrasPrice,
      total: basePrice + extrasPrice,
      isDeepClean: false,
    };
  };

  const sendQuoteEmail = async (quoteInfo: any) => {
    if (emailSent) return;
    
    try {
      const { error } = await supabase.functions.invoke('send-lead-email', {
        body: {
          name: 'Quote Request',
          service: quoteInfo.cleaningType,
          estimate: quoteInfo.isDeepClean 
            ? '$60/hour (minimum 2 cleaners)' 
            : `$${quoteInfo.total}`,
          details: `
Cleaning Type: ${quoteInfo.cleaningType}
${quoteInfo.frequency ? `Frequency: ${quoteInfo.frequency}` : ''}
Home Size: ${quoteInfo.homeSize}
Extras: ${quoteInfo.extras.length > 0 ? quoteInfo.extras.join(', ') : 'None'}
${!quoteInfo.isDeepClean ? `
Base Price: $${quoteInfo.basePrice}
Extras Price: $${quoteInfo.extrasPrice}
Total: $${quoteInfo.total}` : ''}
          `.trim(),
        },
      });

      if (!error) {
        setEmailSent(true);
        console.log('Quote email sent successfully');
      }
    } catch (error) {
      console.error('Failed to send quote email:', error);
    }
  };

  const handleOptionSelect = (value: string) => {
    switch (step) {
      case 'cleaningType':
        setQuoteData(prev => ({ ...prev, cleaningType: value as CleaningType }));
        setMessages(prev => [
          ...prev,
          { type: 'user', content: value === 'regular' ? 'Regular Cleaning' : 'Deep Cleaning (Move-in/Move-out)' },
        ]);
        
        if (value === 'deep') {
          // Skip frequency for deep cleaning, go to home size
          setTimeout(() => {
            setMessages(prev => [
              ...prev,
              {
                type: 'bot',
                content: 'How many bedrooms and bathrooms?',
                options: [
                  { value: '2/2', label: '2 bed / 2 bath' },
                  { value: '3/2-3', label: '3 bed / 2-3 bath' },
                  { value: '4/2.5-3', label: '4 bed / 2.5-3 bath' },
                  { value: '5/4', label: '5 bed / 4 bath' },
                ],
              },
            ]);
            setStep('homeSize');
          }, 300);
        } else {
          setTimeout(() => {
            setMessages(prev => [
              ...prev,
              {
                type: 'bot',
                content: 'How often?',
                options: [
                  { value: 'weekly', label: 'Weekly' },
                  { value: 'biweekly', label: 'Bi-weekly' },
                  { value: 'monthly', label: 'Monthly' },
                ],
              },
            ]);
            setStep('frequency');
          }, 300);
        }
        break;

      case 'frequency':
        setQuoteData(prev => ({ ...prev, frequency: value as Frequency }));
        setMessages(prev => [
          ...prev,
          { type: 'user', content: FREQUENCY_LABELS[value] },
        ]);
        
        setTimeout(() => {
          setMessages(prev => [
            ...prev,
            {
              type: 'bot',
              content: 'How many bedrooms and bathrooms?',
              options: [
                { value: '2/2', label: '2 bed / 2 bath' },
                { value: '3/2-3', label: '3 bed / 2-3 bath' },
                { value: '4/2.5-3', label: '4 bed / 2.5-3 bath' },
                { value: '5/4', label: '5 bed / 4 bath' },
              ],
            },
          ]);
          setStep('homeSize');
        }, 300);
        break;

      case 'homeSize':
        setQuoteData(prev => ({ ...prev, homeSize: value as HomeSize }));
        setMessages(prev => [
          ...prev,
          { type: 'user', content: HOME_SIZE_LABELS[value] },
        ]);
        
        setTimeout(() => {
          setMessages(prev => [
            ...prev,
            {
              type: 'bot',
              content: 'Any extras?',
              options: [
                { value: 'oven1', label: 'Oven (1 door) +$30' },
                { value: 'oven2', label: 'Oven (2 doors) +$50' },
                { value: 'fridge', label: 'Refrigerator +$50' },
                { value: 'none', label: 'None' },
              ],
            },
          ]);
          setStep('extras');
        }, 300);
        break;

      case 'extras':
        const updatedExtras = value === 'none' ? [] : [...quoteData.extras, value as Extra];
        setQuoteData(prev => ({ ...prev, extras: updatedExtras }));
        
        const extraLabel = value === 'none' ? 'None' : EXTRA_LABELS[value].split(' - ')[0];
        setMessages(prev => [
          ...prev,
          { type: 'user', content: extraLabel },
        ]);

        // Generate quote
        setTimeout(() => {
          const finalQuoteData = {
            ...quoteData,
            homeSize: quoteData.homeSize,
            extras: updatedExtras,
          };
          
          const quote = calculateQuote();
          const quoteInfo = {
            cleaningType: quoteData.cleaningType === 'deep' ? 'Deep Cleaning (Move-in/Move-out)' : 'Regular Cleaning',
            frequency: quoteData.frequency ? FREQUENCY_LABELS[quoteData.frequency] : 'N/A',
            homeSize: HOME_SIZE_LABELS[quoteData.homeSize!],
            extras: updatedExtras.filter(e => e !== 'none').map(e => EXTRA_LABELS[e].split(' - ')[0]),
            ...quote,
          };

          setMessages(prev => [
            ...prev,
            {
              type: 'bot',
              content: '',
              isQuote: true,
              quoteData: quoteInfo,
            },
          ]);
          setStep('quote');

          // Send email automatically
          sendQuoteEmail(quoteInfo);
        }, 300);
        break;
    }
  };

  const generateSmsBody = () => {
    if (!quoteData.homeSize) return '';
    
    const quote = calculateQuote();
    const cleaningType = quoteData.cleaningType === 'deep' ? 'Deep Cleaning' : 'Regular Cleaning';
    const frequency = quoteData.frequency ? FREQUENCY_LABELS[quoteData.frequency] : '';
    const homeSize = HOME_SIZE_LABELS[quoteData.homeSize];
    
    let message = `Hello! I received a cleaning quote and would like to schedule.\n\n`;
    message += `Type: ${cleaningType}\n`;
    if (frequency) message += `Frequency: ${frequency}\n`;
    message += `Size: ${homeSize}\n`;
    
    if (quote.isDeepClean) {
      message += `Price: $60/hour (min 2 cleaners)`;
    } else {
      message += `Total: $${quote.total}`;
    }
    
    return encodeURIComponent(message);
  };

  const resetChat = () => {
    setStep('cleaningType');
    setQuoteData({ cleaningType: null, frequency: null, homeSize: null, extras: [] });
    setMessages([
      {
        type: 'bot',
        content: 'Hello! 👋 Get your cleaning quote in seconds.',
      },
      {
        type: 'bot',
        content: 'What type of cleaning do you need?',
        options: [
          { value: 'regular', label: 'Regular Cleaning' },
          { value: 'deep', label: 'Deep Cleaning (Move-in/Move-out)' },
        ],
      },
    ]);
    setEmailSent(false);
  };

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full bg-gradient-gold shadow-elegant flex items-center justify-center transition-all duration-300 hover:scale-110 ${isOpen ? 'hidden' : ''}`}
      >
        <MessageCircle className="w-7 h-7 text-navy" />
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-[380px] h-[600px] max-h-[80vh] bg-card rounded-2xl shadow-2xl border border-border flex flex-col overflow-hidden animate-fade-in">
          {/* Header */}
          <div className="bg-gradient-navy p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-gold flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-navy" />
              </div>
              <div>
                <h3 className="font-semibold text-primary-foreground">Quick Quote</h3>
                <p className="text-xs text-primary-foreground/70">Get your estimate now</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-primary-foreground/70 hover:text-primary-foreground transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-background">
            {messages.map((message, index) => (
              <div key={index}>
                {message.type === 'user' ? (
                  <div className="flex justify-end">
                    <div className="max-w-[80%] rounded-2xl px-4 py-2 bg-gradient-gold text-navy rounded-br-md">
                      <p className="text-sm">{message.content}</p>
                    </div>
                  </div>
                ) : message.isQuote ? (
                  <div className="space-y-3">
                    {/* Quote Summary Card */}
                    <div className="bg-muted rounded-xl p-4 border border-border">
                      <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-gold" />
                        Your Quote Summary
                      </h4>
                      
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Type:</span>
                          <span className="text-foreground font-medium">{message.quoteData?.cleaningType}</span>
                        </div>
                        {!message.quoteData?.isDeepClean && (
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Frequency:</span>
                            <span className="text-foreground font-medium">{message.quoteData?.frequency}</span>
                          </div>
                        )}
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Size:</span>
                          <span className="text-foreground font-medium">{message.quoteData?.homeSize}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Extras:</span>
                          <span className="text-foreground font-medium">
                            {message.quoteData?.extras.length ? message.quoteData.extras.join(', ') : 'None'}
                          </span>
                        </div>
                        
                        <div className="border-t border-border my-3" />
                        
                        {message.quoteData?.isDeepClean ? (
                          <div className="bg-gold/10 rounded-lg p-3">
                            <p className="text-foreground font-semibold text-center">$60/hour</p>
                            <p className="text-muted-foreground text-xs text-center mt-1">
                              Minimum 2 cleaners. Final price based on estimated time.
                            </p>
                          </div>
                        ) : (
                          <>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Base Price:</span>
                              <span className="text-foreground">${message.quoteData?.basePrice}</span>
                            </div>
                            {(message.quoteData?.extrasPrice ?? 0) > 0 && (
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Extras:</span>
                                <span className="text-foreground">+${message.quoteData?.extrasPrice}</span>
                              </div>
                            )}
                            <div className="flex justify-between text-lg font-bold mt-2">
                              <span className="text-foreground">Total:</span>
                              <span className="text-gold">${message.quoteData?.total}</span>
                            </div>
                          </>
                        )}
                      </div>
                    </div>

                    {/* CTA Message */}
                    <div className="bg-muted rounded-2xl rounded-bl-md px-4 py-3">
                      <p className="text-sm text-foreground font-medium">Would you like to schedule now?</p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      <a
                        href={`tel:${PHONE_NUMBER}`}
                        className="flex-1"
                      >
                        <Button className="w-full bg-gradient-gold text-navy hover:opacity-90 gap-2">
                          <Phone className="w-4 h-4" />
                          Call Now
                        </Button>
                      </a>
                      <a
                        href={`sms:${PHONE_NUMBER}?body=${generateSmsBody()}`}
                        className="flex-1"
                      >
                        <Button variant="outline" className="w-full gap-2 border-gold text-gold hover:bg-gold/10">
                          <MessageSquare className="w-4 h-4" />
                          Send SMS
                        </Button>
                      </a>
                    </div>

                    {/* Start Over */}
                    <button
                      onClick={resetChat}
                      className="text-xs text-muted-foreground hover:text-foreground transition-colors text-center w-full mt-2"
                    >
                      Start a new quote
                    </button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <div className="flex justify-start">
                      <div className="max-w-[80%] rounded-2xl px-4 py-2 bg-muted text-foreground rounded-bl-md">
                        <p className="text-sm">{message.content}</p>
                      </div>
                    </div>
                    {message.options && (
                      <div className="flex flex-wrap gap-2 ml-2">
                        {message.options.map((option) => (
                          <button
                            key={option.value}
                            onClick={() => handleOptionSelect(option.value)}
                            className="px-4 py-2 text-sm rounded-full border border-gold text-gold hover:bg-gold hover:text-navy transition-all duration-200"
                          >
                            {option.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Footer */}
          <div className="p-3 border-t border-border bg-card text-center">
            <p className="text-xs text-muted-foreground">
              Questions? Call us: <a href={`tel:${PHONE_NUMBER}`} className="text-gold hover:underline">{PHONE_DISPLAY}</a>
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default QuoteChatbot;
