import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import PageHeader from '../components/layout/PageHeader';
import ContactForm from '../components/home/Contact';
import { useLanguage } from '../contexts/LanguageContext';
import { usePageMeta } from '../hooks/use-page-meta';

const ContactPage = () => {
  const { t } = useLanguage();
  usePageMeta(`${t('contact.title')} | AI Solutions`, t('contactPage.intro'));

  return (
    <div className="min-h-screen">
      <Navbar />
      <PageHeader title={t('contact.title')} subtitle={t('contactPage.intro')} />
      <ContactForm showHeading={false} />
      <Footer />
    </div>
  );
};

export default ContactPage;
