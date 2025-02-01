import { Brain, Factory, Building } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

const Hero = () => {
  const { t } = useLanguage();

  return (
    <div className="relative bg-gradient-to-br from-primary to-primary-light text-white pt-24 pb-16">
      <div 
        className="absolute inset-0 z-0 opacity-20"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1488590528505-98d2b5aba04b)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {t('hero.title')}
            </h1>
            <p className="text-lg text-gray-300 mb-8">
              {t('hero.subtitle')}
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="bg-accent hover:bg-accent-light text-white px-6 py-3 rounded-lg transition-colors">
                {t('hero.cta1')}
              </button>
              <button className="border border-white text-white px-6 py-3 rounded-lg hover:bg-white hover:text-primary transition-colors">
                {t('hero.cta2')}
              </button>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-6 animate-fade-in">
            <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm">
              <Brain className="w-12 h-12 mb-4 text-accent" />
              <h3 className="text-xl font-semibold mb-2">{t('hero.cards.ai.title')}</h3>
              <p className="text-gray-300">{t('hero.cards.ai.description')}</p>
            </div>
            <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm">
              <Factory className="w-12 h-12 mb-4 text-accent" />
              <h3 className="text-xl font-semibold mb-2">{t('hero.cards.industry.title')}</h3>
              <p className="text-gray-300">{t('hero.cards.industry.description')}</p>
            </div>
            <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm">
              <Building className="w-12 h-12 mb-4 text-accent" />
              <h3 className="text-xl font-semibold mb-2">{t('hero.cards.construction.title')}</h3>
              <p className="text-gray-300">{t('hero.cards.construction.description')}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;