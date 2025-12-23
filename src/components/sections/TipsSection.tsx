import { ArrowRight, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';

const tips = [
  {
    title: '10 Spring Cleaning Tips for a Fresh Start',
    excerpt: 'Transform your home this spring with our expert tips for a thorough seasonal clean.',
    category: 'Seasonal',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1527515545081-5db817172677?w=400&h=300&fit=crop',
  },
  {
    title: 'How to Keep Your Kitchen Spotless Daily',
    excerpt: 'Simple daily habits that will keep your kitchen looking pristine without the stress.',
    category: 'Kitchen',
    readTime: '4 min read',
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop',
  },
  {
    title: 'Bathroom Cleaning Hacks That Save Time',
    excerpt: 'Learn professional techniques to keep your bathroom sparkling clean with minimal effort.',
    category: 'Bathroom',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=400&h=300&fit=crop',
  },
];

const TipsSection = () => {
  return (
    <section id="tips" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <span className="inline-block px-4 py-1.5 rounded-full bg-gold/10 text-gold text-sm font-semibold mb-4">
              Cleaning Tips
            </span>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
              Expert Cleaning{' '}
              <span className="text-gradient-gold">Advice</span>
            </h2>
          </div>
          <Button variant="goldOutline" size="lg">
            View All Articles
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>

        {/* Tips Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tips.map((tip, index) => (
            <article
              key={tip.title}
              className="group cursor-pointer"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Image */}
              <div className="relative overflow-hidden rounded-2xl mb-6">
                <img
                  src={tip.image}
                  alt={tip.title}
                  className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-gold text-navy text-xs font-semibold">
                  {tip.category}
                </span>
              </div>

              {/* Content */}
              <div className="flex items-center gap-2 text-muted-foreground text-sm mb-3">
                <Clock className="w-4 h-4" />
                {tip.readTime}
              </div>
              <h3 className="font-serif text-xl font-bold text-foreground mb-3 group-hover:text-gold transition-colors">
                {tip.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                {tip.excerpt}
              </p>
              <a
                href="#"
                className="inline-flex items-center gap-2 text-gold font-semibold group-hover:gap-3 transition-all"
              >
                Read More
                <ArrowRight className="w-4 h-4" />
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TipsSection;
