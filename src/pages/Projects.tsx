import { FolderKanban } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import PageHeader from '../components/layout/PageHeader';
import EmptyState from '../components/layout/EmptyState';
import { useLanguage } from '../contexts/LanguageContext';
import { usePageMeta } from '../hooks/use-page-meta';

const Projects = () => {
  const { t } = useLanguage();
  usePageMeta(`${t('projectsPage.title')} | AI Solutions`, t('projectsPage.intro'));

  return (
    <div className="min-h-screen">
      <Navbar />
      <PageHeader title={t('projectsPage.title')} subtitle={t('projectsPage.intro')} />
      <EmptyState
        icon={FolderKanban}
        message={t('projectsPage.message')}
        ctaLabel={t('projectsPage.cta')}
      />
      <Footer />
    </div>
  );
};

export default Projects;
