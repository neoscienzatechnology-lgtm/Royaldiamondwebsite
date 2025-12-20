import { Helmet } from 'react-helmet-async';
import Header from '@/components/layout/Header';
import HeroSection from '@/components/sections/HeroSection';
import ServicesSection from '@/components/sections/ServicesSection';
import WhyChooseSection from '@/components/sections/WhyChooseSection';
import AboutSection from '@/components/sections/AboutSection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';

import FAQSection from '@/components/sections/FAQSection';
import CTASection from '@/components/sections/CTASection';
import Footer from '@/components/layout/Footer';
import ChatWidget from '@/components/chat/ChatWidget';

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Royal Diamond Cleaning | Premium Cleaning Services in North Bend, WA</title>
        <meta 
          name="description" 
          content="Royal Diamond Cleaning offers premium cleaning services for homes and businesses in the North Bend area. Serving communities within 30 miles including Snoqualmie, Issaquah, and Fall City." 
        />
        <meta name="keywords" content="cleaning service North Bend, house cleaning Snoqualmie, professional cleaners Issaquah, deep cleaning Fall City, move out cleaning WA" />
        <link rel="canonical" href="https://royaldiamondwa.com" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Royal Diamond Cleaning | Premium Cleaning Services in North Bend" />
        <meta property="og:description" content="Impeccable cleaning for homes and businesses in the North Bend area. Experience the Royal Diamond difference." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://royaldiamondwa.com" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Royal Diamond Cleaning | Premium Cleaning Services in North Bend" />
        <meta name="twitter:description" content="Impeccable cleaning for homes and businesses in the North Bend area." />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        <main>
          <HeroSection />
          <ServicesSection />
          <WhyChooseSection />
          <AboutSection />
          <TestimonialsSection />
          
          <FAQSection />
          <CTASection />
        </main>
        <Footer />
        <ChatWidget />
      </div>
    </>
  );
};

export default Index;
