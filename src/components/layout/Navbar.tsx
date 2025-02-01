import { useState } from 'react';
import { Menu, X, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'es' ? 'en' : 'es');
  };

  return (
    <nav className="bg-white shadow-md fixed w-full z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-2xl font-bold text-primary">
            AI Solutions
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-accent transition-colors">
              {t('nav.home')}
            </Link>
            <Link to="/services" className="text-gray-700 hover:text-accent transition-colors">
              {t('nav.services')}
            </Link>
            <Link to="/projects" className="text-gray-700 hover:text-accent transition-colors">
              {t('nav.projects')}
            </Link>
            <Link to="/blog" className="text-gray-700 hover:text-accent transition-colors">
              {t('nav.blog')}
            </Link>
            <Link to="/contact" className="text-gray-700 hover:text-accent transition-colors">
              {t('nav.contact')}
            </Link>
            <button 
              onClick={toggleLanguage}
              className="flex items-center text-gray-700 hover:text-accent transition-colors"
            >
              <Globe className="w-5 h-5 mr-1" />
              {language.toUpperCase()}
            </button>
          </div>

          <button
            className="md:hidden text-gray-700"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden py-4 animate-fade-in">
            <div className="flex flex-col space-y-4">
              <Link to="/" className="text-gray-700 hover:text-accent transition-colors">
                {t('nav.home')}
              </Link>
              <Link to="/services" className="text-gray-700 hover:text-accent transition-colors">
                {t('nav.services')}
              </Link>
              <Link to="/projects" className="text-gray-700 hover:text-accent transition-colors">
                {t('nav.projects')}
              </Link>
              <Link to="/blog" className="text-gray-700 hover:text-accent transition-colors">
                {t('nav.blog')}
              </Link>
              <Link to="/contact" className="text-gray-700 hover:text-accent transition-colors">
                {t('nav.contact')}
              </Link>
              <button 
                onClick={toggleLanguage}
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