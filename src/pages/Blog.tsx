import { Newspaper } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import PageHeader from '../components/layout/PageHeader';
import EmptyState from '../components/layout/EmptyState';
import { useLanguage } from '../contexts/LanguageContext';
import { usePageMeta } from '../hooks/use-page-meta';

const Blog = () => {
  const { t } = useLanguage();
  usePageMeta(`${t('blogPage.title')} | AI Solutions`, t('blogPage.intro'));

  return (
    <div className="min-h-screen">
      <Navbar />
      <PageHeader title={t('blogPage.title')} subtitle={t('blogPage.intro')} />
      <EmptyState
        icon={Newspaper}
        message={t('blogPage.message')}
        ctaLabel={t('blogPage.cta')}
      />
      <Footer />
    </div>
  );
};

export default Blog;
