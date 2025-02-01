import { Brain, Factory, Building, Tractor } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

const Services = () => {
  const { t } = useLanguage();

  const services = [
    {
      icon: Brain,
      titleKey: 'services.items.ai.title',
      descriptionKey: 'services.items.ai.description',
      image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7"
    },
    {
      icon: Factory,
      titleKey: 'services.items.automation.title',
      descriptionKey: 'services.items.automation.description',
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d"
    },
    {
      icon: Tractor,
      titleKey: 'services.items.agro.title',
      descriptionKey: 'services.items.agro.description',
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158"
    },
    {
      icon: Building,
      titleKey: 'services.items.construction.title',
      descriptionKey: 'services.items.construction.description',
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085"
    }
  ];

  return (
    <div className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-primary">
          {t('services.title')}
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="group bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-in overflow-hidden"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="relative h-40 mb-6 overflow-hidden rounded-lg">
                <img 
                  src={service.image} 
                  alt={t(service.titleKey)}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <service.icon className="absolute bottom-4 left-4 w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-primary">{t(service.titleKey)}</h3>
              <p className="text-gray-600">{t(service.descriptionKey)}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;