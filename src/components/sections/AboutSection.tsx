import { Users, Target, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';

const AboutSection = () => {
  return (
    <section id="about" className="py-24 bg-background overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div>
            <span className="inline-block px-4 py-1.5 rounded-full bg-gold/10 text-gold text-sm font-semibold mb-4">
              About Us
            </span>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              A Legacy of{' '}
              <span className="text-gradient-gold">Excellence</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              Founded with a vision to redefine cleaning standards in the North Bend area, 
              Royal Diamond has grown from a small family business to a trusted 
              name in premium cleaning services, proudly serving communities within 30 miles of North Bend.
            </p>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Our commitment to excellence, attention to detail, and dedication to 
              customer satisfaction have earned us a reputation as the go-to choice 
              for homeowners and businesses who demand the very best.
            </p>

            {/* Values */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
              <div className="flex flex-col items-center text-center p-4">
                <div className="w-14 h-14 rounded-xl bg-gold/10 flex items-center justify-center mb-3">
                  <Users className="w-7 h-7 text-gold" />
                </div>
                <h3 className="font-semibold text-foreground mb-1">Our Team</h3>
                <p className="text-sm text-muted-foreground">50+ dedicated professionals</p>
              </div>
              <div className="flex flex-col items-center text-center p-4">
                <div className="w-14 h-14 rounded-xl bg-gold/10 flex items-center justify-center mb-3">
                  <Target className="w-7 h-7 text-gold" />
                </div>
                <h3 className="font-semibold text-foreground mb-1">Our Mission</h3>
                <p className="text-sm text-muted-foreground">Excellence in every detail</p>
              </div>
              <div className="flex flex-col items-center text-center p-4">
                <div className="w-14 h-14 rounded-xl bg-gold/10 flex items-center justify-center mb-3">
                  <Heart className="w-7 h-7 text-gold" />
                </div>
                <h3 className="font-semibold text-foreground mb-1">Our Values</h3>
                <p className="text-sm text-muted-foreground">Trust, quality, care</p>
              </div>
            </div>

            <Button variant="gold" size="lg">
              Learn More About Us
            </Button>
          </div>

          {/* Image Grid */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="rounded-2xl overflow-hidden shadow-elevated">
                  <img
                    src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&h=500&fit=crop"
                    alt="Professional cleaner at work"
                    className="w-full h-64 object-cover"
                  />
                </div>
                <div className="rounded-2xl overflow-hidden shadow-elevated">
                  <img
                    src="https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?w=400&h=300&fit=crop"
                    alt="Clean modern kitchen"
                    className="w-full h-48 object-cover"
                  />
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="rounded-2xl overflow-hidden shadow-elevated">
                  <img
                    src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&h=300&fit=crop"
                    alt="Luxury home interior"
                    className="w-full h-48 object-cover"
                  />
                </div>
                <div className="rounded-2xl overflow-hidden shadow-elevated">
                  <img
                    src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=500&fit=crop"
                    alt="Cleaning supplies"
                    className="w-full h-64 object-cover"
                  />
                </div>
              </div>
            </div>
            {/* Decorative element */}
            <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-br from-gold/5 to-peach/5 rounded-full blur-3xl" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
