import { ArrowRight, Sparkles, Shield, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import heroBackground from '@/assets/hero-background.jpg';

const HeroSection = () => {
  const openChat = () => {
    window.dispatchEvent(new CustomEvent('openEstimateChat'));
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img 
          src={heroBackground}
          alt="Luxury clean home interior"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy/95 via-navy/85 to-navy/70" />
      </div>

      {/* Content */}
      <div className="relative container mx-auto px-4 pt-32 pb-20">
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/10 border border-gold/30 mb-8 animate-fade-in">
            <Sparkles className="w-4 h-4 text-gold" />
            <span className="text-sm font-medium text-gold">Premium Cleaning Services</span>
          </div>

          {/* Headline */}
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground leading-tight mb-6 animate-slide-up">
            Premium Cleaning Services{' '}
            <span className="text-gradient-gold">You Can Trust</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-primary-foreground/80 mb-10 max-w-2xl animate-slide-up delay-100">
            Impeccable cleaning for homes and businesses across Washington. 
            Experience the Royal Diamond difference with our professional, reliable, and detail-oriented service.
          </p>

          {/* CTA Button */}
          <div className="mb-12 animate-slide-up delay-200">
            <Button onClick={openChat} variant="hero" size="xl" className="group">
              Get a Free Estimate
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap gap-6 animate-slide-up delay-300">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gold/20 flex items-center justify-center">
                <Shield className="w-6 h-6 text-gold" />
              </div>
              <div>
                <p className="text-primary-foreground font-semibold">Fully Insured</p>
                <p className="text-primary-foreground/60 text-sm">& Background Checked</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gold/20 flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-gold" />
              </div>
              <div>
                <p className="text-primary-foreground font-semibold">5-Star Rated</p>
                <p className="text-primary-foreground/60 text-sm">Customer Reviews</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gold/20 flex items-center justify-center">
                <Clock className="w-6 h-6 text-gold" />
              </div>
              <div>
                <p className="text-primary-foreground font-semibold">Same-Day</p>
                <p className="text-primary-foreground/60 text-sm">Availability</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default HeroSection;
