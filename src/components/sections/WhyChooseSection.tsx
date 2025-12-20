import { 
  ClipboardCheck, 
  Shield, 
  Sparkles, 
  Leaf, 
  Award, 
  HeartHandshake 
} from 'lucide-react';

const features = [
  {
    icon: ClipboardCheck,
    title: 'Customized Cleaning Plans',
    description: 'Every home is unique. We create personalized cleaning plans tailored to your specific needs and preferences.',
  },
  {
    icon: Shield,
    title: 'Trained & Insured Professionals',
    description: 'All our cleaners are thoroughly trained, fully insured, and background-checked for your peace of mind.',
  },
  {
    icon: Sparkles,
    title: 'Checklist-Based Cleaning',
    description: 'We follow a detailed checklist to ensure consistent, high-standard results every single time.',
  },
  {
    icon: Leaf,
    title: 'Eco-Friendly Products',
    description: 'Choose our green cleaning options using environmentally safe products that protect your family and planet.',
  },
  {
    icon: Award,
    title: '100% Satisfaction Guarantee',
    description: 'Not completely satisfied? We\'ll re-clean the area for free. Your happiness is our top priority.',
  },
  {
    icon: HeartHandshake,
    title: 'Reliable & Trustworthy',
    description: 'Count on us to show up on time, every time. We treat your home with the respect it deserves.',
  },
];

const WhyChooseSection = () => {
  return (
    <section id="why-us" className="py-24 bg-navy relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{ 
          backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', 
          backgroundSize: '40px 40px' 
        }} />
      </div>

      <div className="container mx-auto px-4 relative">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-gold/20 text-gold text-sm font-semibold mb-4">
            Why Choose Us
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-6">
            The Royal Diamond{' '}
            <span className="text-gradient-gold">Difference</span>
          </h2>
          <p className="text-lg text-primary-foreground/70">
            We don't just clean homes — we create pristine spaces where families thrive. 
            Discover why thousands trust Royal Diamond WA.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="group relative p-8 rounded-2xl bg-navy-light/50 border border-primary-foreground/10 hover:border-gold/30 transition-all duration-500"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Icon */}
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-gold to-gold-light flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                <feature.icon className="w-7 h-7 text-navy" />
              </div>

              {/* Content */}
              <h3 className="font-serif text-xl font-bold text-primary-foreground mb-3">
                {feature.title}
              </h3>
              <p className="text-primary-foreground/70 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Stats Bar */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 p-8 rounded-2xl bg-gold/10 border border-gold/20">
          <div className="text-center">
            <p className="font-serif text-4xl md:text-5xl font-bold text-gold mb-2">10+</p>
            <p className="text-primary-foreground/70 text-sm">Years Experience</p>
          </div>
          <div className="text-center">
            <p className="font-serif text-4xl md:text-5xl font-bold text-gold mb-2">5,000+</p>
            <p className="text-primary-foreground/70 text-sm">Happy Customers</p>
          </div>
          <div className="text-center">
            <p className="font-serif text-4xl md:text-5xl font-bold text-gold mb-2">50+</p>
            <p className="text-primary-foreground/70 text-sm">Trained Cleaners</p>
          </div>
          <div className="text-center">
            <p className="font-serif text-4xl md:text-5xl font-bold text-gold mb-2">100%</p>
            <p className="text-primary-foreground/70 text-sm">Satisfaction Rate</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseSection;
