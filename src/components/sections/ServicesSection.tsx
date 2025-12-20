import { 
  Sparkles, 
  CalendarDays, 
  Home, 
  Truck, 
  Building2, 
  Leaf, 
  ArrowRight 
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const services = [
  {
    icon: CalendarDays,
    title: 'Recurring Cleaning',
    description: 'Regular weekly, bi-weekly, or monthly cleaning to keep your home consistently pristine.',
    link: '#',
  },
  {
    icon: Sparkles,
    title: 'One-Time Cleaning',
    description: 'Perfect for special occasions, guests, or when you need a thorough refresh.',
    link: '#',
  },
  {
    icon: Home,
    title: 'Deep Cleaning',
    description: 'Comprehensive top-to-bottom cleaning that reaches every corner and crevice.',
    link: '#',
  },
  {
    icon: Truck,
    title: 'Move In / Move Out',
    description: 'Ensure your new home is spotless or leave your old one in perfect condition.',
    link: '#',
  },
  {
    icon: Building2,
    title: 'Apartment & Condo',
    description: 'Specialized cleaning services tailored for apartment and condo living spaces.',
    link: '#',
  },
  {
    icon: Leaf,
    title: 'Eco-Friendly Cleaning',
    description: 'Green cleaning solutions that are safe for your family and the environment.',
    link: '#',
  },
];

const ServicesSection = () => {
  return (
    <section id="services" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-gold/10 text-gold text-sm font-semibold mb-4">
            Our Services
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Professional Cleaning Tailored to{' '}
            <span className="text-gradient-gold">Your Needs</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            From routine maintenance to deep cleaning, we offer comprehensive services 
            to keep your space immaculate and inviting.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={service.title}
              className="group relative p-8 bg-card rounded-2xl border border-border shadow-card hover:shadow-elevated transition-all duration-500 hover:-translate-y-1"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Icon */}
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-gold/20 to-peach/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <service.icon className="w-8 h-8 text-gold" />
              </div>

              {/* Content */}
              <h3 className="font-serif text-xl font-bold text-foreground mb-3 group-hover:text-gold transition-colors">
                {service.title}
              </h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                {service.description}
              </p>

              {/* Link */}
              <a
                href={service.link}
                className="inline-flex items-center gap-2 text-gold font-semibold hover:gap-3 transition-all"
              >
                Learn More
                <ArrowRight className="w-4 h-4" />
              </a>

              {/* Decorative accent */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-gold/5 to-transparent rounded-tr-2xl rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <Button 
            variant="gold" 
            size="xl"
            onClick={() => window.dispatchEvent(new CustomEvent('openEstimateChat'))}
          >
            View All Services
            <ArrowRight className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
