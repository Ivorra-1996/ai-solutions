import Navbar from '../components/layout/Navbar';
import Hero from '../components/home/Hero';
import Services from '../components/home/Services';
import Contact from '../components/home/Contact';
import Footer from '../components/layout/Footer';
import { usePageMeta } from '../hooks/use-page-meta';
import { useLanguage } from '../contexts/LanguageContext';

const Index = () => {
  const { t } = useLanguage();
  usePageMeta('AI Solutions', t('hero.subtitle'));

  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <Services />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;