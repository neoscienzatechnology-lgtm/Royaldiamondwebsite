import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Sarah Mitchell',
    location: 'North Bend, WA',
    rating: 5,
    text: 'Royal Diamond has been cleaning my home for over a year now. Their attention to detail is incredible, and my house has never looked better. Highly recommend!',
    image: 'SM',
  },
  {
    name: 'Michael Chen',
    location: 'Snoqualmie, WA',
    rating: 5,
    text: 'Professional, punctual, and thorough. The team always goes above and beyond. I love coming home to a spotless house after their visits.',
    image: 'MC',
  },
  {
    name: 'Jennifer Adams',
    location: 'Issaquah, WA',
    rating: 5,
    text: 'We used their move-out cleaning service and were amazed at the results. They transformed our old apartment and we got our full deposit back!',
    image: 'JA',
  },
  {
    name: 'David Thompson',
    location: 'Fall City, WA',
    rating: 5,
    text: 'As a busy professional, having Royal Diamond handle my cleaning needs has been a game-changer. Reliable, trustworthy, and excellent quality every time.',
    image: 'DT',
  },
];

const TestimonialsSection = () => {
  return (
    <section className="py-24 bg-cream">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-gold/10 text-gold text-sm font-semibold mb-4">
            Testimonials
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            What Our Customers{' '}
            <span className="text-gradient-gold">Are Saying</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Don't just take our word for it. Here's what our valued customers 
            have to say about their Royal Diamond experience.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.name}
              className="relative p-8 bg-card rounded-2xl shadow-card hover:shadow-elevated transition-shadow duration-300"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Quote Icon */}
              <div className="absolute top-6 right-6 opacity-10">
                <Quote className="w-16 h-16 text-gold" />
              </div>

              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-gold text-gold" />
                ))}
              </div>

              {/* Text */}
              <p className="text-foreground/80 leading-relaxed mb-6 relative z-10">
                "{testimonial.text}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gold to-peach flex items-center justify-center">
                  <span className="text-navy font-bold text-sm">{testimonial.image}</span>
                </div>
                <div>
                  <p className="font-semibold text-foreground">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Badge */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-card shadow-card">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-gold text-gold" />
              ))}
            </div>
            <span className="text-foreground font-medium">4.9 out of 5 based on 500+ reviews</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
