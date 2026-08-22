import { Brain, Factory, Building } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { Button } from '@/components/ui/button';

const heroCards = [
  { icon: Brain, titleKey: 'hero.cards.ai.title', descriptionKey: 'hero.cards.ai.description' },
  { icon: Factory, titleKey: 'hero.cards.industry.title', descriptionKey: 'hero.cards.industry.description' },
  { icon: Building, titleKey: 'hero.cards.construction.title', descriptionKey: 'hero.cards.construction.description' },
] as const;

const Hero = () => {
  const { t } = useLanguage();

  return (
    <div className="relative bg-primary text-white pt-24 pb-16 overflow-hidden">
      <div
        className="absolute inset-0 z-0 opacity-[0.08] animate-grid-pan motion-reduce:animate-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(217,119,6,1) 1px, transparent 1px), linear-gradient(90deg, rgba(217,119,6,1) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in">
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-6">
              {t('hero.title')}
            </h1>
            <p className="text-lg text-gray-300 mb-8">
              {t('hero.subtitle')}
            </p>
            <div className="flex flex-wrap gap-4">
              <Button
                asChild
                size="lg"
                className="bg-accent hover:bg-accent-light text-white transition-all hover:-translate-y-0.5"
              >
                <a href="#services">{t('hero.cta1')}</a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white text-white bg-transparent hover:bg-white hover:text-primary transition-all hover:-translate-y-0.5"
              >
                <a href="#contact">{t('hero.cta2')}</a>
              </Button>
            </div>
          </div>
          <div className="relative animate-fade-in">
            <span className="absolute -top-px -left-px h-4 w-4 border-t-2 border-l-2 border-accent" />
            <span className="absolute -top-px -right-px h-4 w-4 border-t-2 border-r-2 border-accent" />
            <span className="absolute -bottom-px -left-px h-4 w-4 border-b-2 border-l-2 border-accent" />
            <span className="absolute -bottom-px -right-px h-4 w-4 border-b-2 border-r-2 border-accent" />
            <div className="border border-white/20 bg-white/[0.03] divide-y divide-white/10">
              {heroCards.map(({ icon: Icon, titleKey, descriptionKey }) => (
                <div key={titleKey} className="flex items-start gap-4 p-6">
                  <Icon className="w-8 h-8 shrink-0 text-accent" />
                  <div>
                    <h3 className="font-display text-lg font-semibold mb-1">{t(titleKey)}</h3>
                    <p className="text-gray-300 text-sm">{t(descriptionKey)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
