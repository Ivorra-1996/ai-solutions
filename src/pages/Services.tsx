import { Brain, Factory, Building, Tractor, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import PageHeader from '../components/layout/PageHeader';
import { Button } from '@/components/ui/button';
import { useLanguage } from '../contexts/LanguageContext';
import { usePageMeta } from '../hooks/use-page-meta';
import { useInView } from '@/hooks/use-in-view';
import { cn } from '@/lib/utils';

const serviceDetails = [
  {
    icon: Brain,
    titleKey: 'services.items.ai.title',
    descriptionKey: 'services.items.ai.description',
    points: [
      'servicesPage.items.ai.point1',
      'servicesPage.items.ai.point2',
      'servicesPage.items.ai.point3',
    ],
  },
  {
    icon: Factory,
    titleKey: 'services.items.automation.title',
    descriptionKey: 'services.items.automation.description',
    points: [
      'servicesPage.items.automation.point1',
      'servicesPage.items.automation.point2',
      'servicesPage.items.automation.point3',
    ],
  },
  {
    icon: Tractor,
    titleKey: 'services.items.agro.title',
    descriptionKey: 'services.items.agro.description',
    points: [
      'servicesPage.items.agro.point1',
      'servicesPage.items.agro.point2',
      'servicesPage.items.agro.point3',
    ],
  },
  {
    icon: Building,
    titleKey: 'services.items.construction.title',
    descriptionKey: 'services.items.construction.description',
    points: [
      'servicesPage.items.construction.point1',
      'servicesPage.items.construction.point2',
      'servicesPage.items.construction.point3',
    ],
  },
];

const ServicesPage = () => {
  const { t } = useLanguage();
  const { ref, inView } = useInView<HTMLDivElement>();
  usePageMeta(`${t('services.title')} | AI Solutions`, t('servicesPage.intro'));

  return (
    <div className="min-h-screen">
      <Navbar />
      <PageHeader title={t('services.title')} subtitle={t('servicesPage.intro')} />

      <div ref={ref} className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-4xl space-y-12">
          {serviceDetails.map((service, index) => (
            <div
              key={service.titleKey}
              className={cn(
                'flex flex-col sm:flex-row gap-6 border-b border-gray-200 pb-12 last:border-0 last:pb-0',
                inView ? 'animate-fade-in' : 'opacity-0'
              )}
              style={{ animationDelay: inView ? `${index * 100}ms` : undefined }}
            >
              <div className="shrink-0">
                <div className="w-16 h-16 flex items-center justify-center border-2 border-accent">
                  <service.icon className="w-8 h-8 text-accent" />
                </div>
              </div>
              <div>
                <h2 className="font-display text-2xl font-semibold text-primary mb-2">
                  {t(service.titleKey)}
                </h2>
                <p className="text-gray-600 mb-4">{t(service.descriptionKey)}</p>
                <ul className="space-y-2">
                  {service.points.map((point) => (
                    <li key={point} className="flex items-start gap-2 text-gray-700">
                      <Check className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                      <span>{t(point)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-primary mb-3">
            {t('servicesPage.ctaTitle')}
          </h2>
          <p className="text-gray-600 mb-8">{t('servicesPage.ctaSubtitle')}</p>
          <Button
            asChild
            size="lg"
            className="bg-accent hover:bg-accent-light text-white transition-all hover:-translate-y-0.5"
          >
            <Link to="/contact">{t('servicesPage.ctaButton')}</Link>
          </Button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ServicesPage;
