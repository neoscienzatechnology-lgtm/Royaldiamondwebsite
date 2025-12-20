import { useState, useEffect } from 'react';
import { Menu, X, Phone } from 'lucide-react';
import logo from '@/assets/logo.png';
import { Button } from '@/components/ui/button';

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'Our Services', href: '#services' },
  { name: 'Why Royal Diamond', href: '#why-us' },
  { name: 'About Us', href: '#about' },
  { name: 'FAQ', href: '#faq' },
  { name: 'Contact', href: '#contact' },
];

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const openChat = () => {
    window.dispatchEvent(new CustomEvent('openEstimateChat'));
    setIsMobileMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-card/95 backdrop-blur-md shadow-card py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <a href="#home" className="flex items-center gap-2 group">
            <img src={logo} alt="Royal Diamond Cleaning Service" className="h-[72px] w-auto" />
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`text-sm font-medium transition-colors duration-300 hover:text-gold ${
                  isScrolled ? 'text-foreground' : 'text-primary-foreground'
                }`}
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden lg:flex items-center gap-4">
            <a href="sms:+14253996635" className={`flex items-center gap-2 text-sm font-medium transition-colors ${isScrolled ? 'text-foreground' : 'text-primary-foreground'}`}>
              <Phone className="w-4 h-4" />
              (425) 399-6635
            </a>
            <Button variant="gold" size="lg" onClick={openChat}>
              Request a Free Estimate
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`lg:hidden p-2 transition-colors ${isScrolled ? 'text-foreground' : 'text-primary-foreground'}`}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-card shadow-elevated animate-fade-in">
            <nav className="container mx-auto px-4 py-6 flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-foreground font-medium py-2 hover:text-gold transition-colors"
                >
                  {link.name}
                </a>
              ))}
              <div className="pt-4 border-t border-border space-y-4">
                <a href="sms:+14253996635" className="flex items-center justify-center gap-2 text-foreground font-medium py-2 hover:text-gold transition-colors">
                  <Phone className="w-4 h-4" />
                  (425) 399-6635
                </a>
                <Button variant="gold" size="lg" className="w-full" onClick={openChat}>
                  Request a Free Estimate
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
