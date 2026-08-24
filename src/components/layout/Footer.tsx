import { Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import { navLinks } from '../../config/navigation';
import { CONTACT_EMAIL } from '../../config/contact';
import { useInView } from '@/hooks/use-in-view';
import { cn } from '@/lib/utils';

const Footer = () => {
  const { t } = useLanguage();
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <footer className="bg-primary text-white">
      <div ref={ref} className="container mx-auto px-4 py-12">
        <div className={cn('grid md:grid-cols-4 gap-8', inView ? 'animate-fade-in' : 'opacity-0')}>
          <div>
            <h3 className="font-display text-xl font-bold mb-4">AI Solutions</h3>
            <p className="text-gray-300">
              {t('footer.description')}
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">{t('footer.quickLinks')}</h4>
            <ul className="space-y-2">
              {navLinks.map(({ to, labelKey }) => (
                <li key={to}>
                  <Link to={to} className="text-gray-300 hover:text-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-primary rounded-sm">
                    {t(labelKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">{t('footer.contact')}</h4>
            <ul className="space-y-2 text-gray-300">
              <li>{CONTACT_EMAIL}</li>
              <li>+34 900 123 456</li>
              <li>Madrid, España</li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">{t('footer.followUs')}</h4>
            <div className="flex space-x-4">
              <a href="#" aria-label="Facebook" className="text-gray-300 hover:text-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-primary rounded-sm">
                <Facebook className="w-6 h-6" />
              </a>
              <a href="#" aria-label="Twitter" className="text-gray-300 hover:text-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-primary rounded-sm">
                <Twitter className="w-6 h-6" />
              </a>
              <a href="#" aria-label="LinkedIn" className="text-gray-300 hover:text-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-primary rounded-sm">
                <Linkedin className="w-6 h-6" />
              </a>
              <a href="#" aria-label="Instagram" className="text-gray-300 hover:text-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-primary rounded-sm">
                <Instagram className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
          <p>&copy; 2024 AI Solutions. {t('footer.rights')}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
