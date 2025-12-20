import { useState } from 'react';
import { MapPin, ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const CTASection = () => {
  const [zipCode, setZipCode] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('CTA ZIP Code submitted:', zipCode);
  };

  return (
    <section className="py-24 bg-navy relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-peach/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

      <div className="container mx-auto px-4 relative">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/20 border border-gold/30 mb-8">
            <Sparkles className="w-4 h-4 text-gold" />
            <span className="text-sm font-medium text-gold">Limited Time Offer</span>
          </div>

          {/* Headline */}
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-6">
            Get Your Free Cleaning{' '}
            <span className="text-gradient-gold">Estimate Today</span>
          </h2>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-primary-foreground/70 mb-10 max-w-2xl mx-auto">
            Experience the Royal Diamond difference. Book now and get 15% off your first cleaning service!
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
            <div className="relative w-full sm:w-auto">
              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Enter your ZIP code"
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value)}
                className="pl-12 h-14 w-full sm:w-72 bg-card border-0 text-foreground placeholder:text-muted-foreground rounded-xl shadow-lg"
              />
            </div>
            <Button type="submit" variant="hero" size="xl" className="group">
              Get My Free Estimate
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </form>

          {/* Trust Text */}
          <p className="text-primary-foreground/50 text-sm">
            No credit card required · Free estimate · No obligation
          </p>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
