import { Brain, Factory, Building, Tractor } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { Card } from '@/components/ui/card';
import { useInView } from '@/hooks/use-in-view';
import { cn } from '@/lib/utils';

const Services = () => {
  const { t } = useLanguage();
  const { ref, inView } = useInView<HTMLDivElement>();

  const services = [
    {
      icon: Brain,
      titleKey: 'services.items.ai.title',
      descriptionKey: 'services.items.ai.description',
    },
    {
      icon: Factory,
      titleKey: 'services.items.automation.title',
      descriptionKey: 'services.items.automation.description',
    },
    {
      icon: Tractor,
      titleKey: 'services.items.agro.title',
      descriptionKey: 'services.items.agro.description',
    },
    {
      icon: Building,
      titleKey: 'services.items.construction.title',
      descriptionKey: 'services.items.construction.description',
    }
  ];

  return (
    <div id="services" ref={ref} className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2
          className={cn(
            'font-display text-3xl font-bold text-center mb-12 text-primary',
            inView ? 'animate-fade-in' : 'opacity-0'
          )}
        >
          {t('services.title')}
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <Card
              key={index}
              className={cn(
                'group p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300',
                inView ? 'animate-fade-in' : 'opacity-0'
              )}
              style={{ animationDelay: inView ? `${index * 100}ms` : undefined }}
            >
              <div className="w-14 h-14 flex items-center justify-center border-2 border-accent mb-5 group-hover:bg-accent/10 transition-colors">
                <service.icon className="w-7 h-7 text-accent" />
              </div>
              <h3 className="font-display text-xl font-semibold mb-3 text-primary">{t(service.titleKey)}</h3>
              <p className="text-gray-600">{t(service.descriptionKey)}</p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;