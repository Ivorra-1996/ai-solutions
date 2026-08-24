import { useEffect, useState } from 'react';
import { Menu, X, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import { navLinks } from '../../config/navigation';
import { cn } from '@/lib/utils';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'es' ? 'en' : 'es');
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      className={cn(
        'bg-white fixed w-full z-50 transition-shadow duration-300',
        scrolled ? 'shadow-md' : 'shadow-none'
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="font-display text-2xl font-bold text-primary">
            AI Solutions
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map(({ to, labelKey }) => (
              <Link
                key={to}
                to={to}
                className="text-gray-700 hover:text-accent transition-colors"
              >
                {t(labelKey)}
              </Link>
            ))}
            <button
              onClick={toggleLanguage}
              aria-label={t('nav.toggleLanguage')}
              className="flex items-center text-gray-700 hover:text-accent transition-colors"
            >
              <Globe className="w-5 h-5 mr-1" />
              {language.toUpperCase()}
            </button>
          </div>

          <button
            className="md:hidden text-gray-700"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? t('nav.closeMenu') : t('nav.openMenu')}
            aria-expanded={isOpen}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden py-4 animate-fade-in">
            <div className="flex flex-col space-y-4">
              {navLinks.map(({ to, labelKey }) => (
                <Link
                  key={to}
                  to={to}
                  onClick={() => setIsOpen(false)}
                  className="text-gray-700 hover:text-accent transition-colors"
                >
                  {t(labelKey)}
                </Link>
              ))}
              <button
                onClick={toggleLanguage}
                aria-label={t('nav.toggleLanguage')}
                className="flex items-center text-gray-700 hover:text-accent transition-colors"
              >
                <Globe className="w-5 h-5 mr-1" />
                {language.toUpperCase()}
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
