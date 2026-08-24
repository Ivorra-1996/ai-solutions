import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Compass } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";
import { usePageMeta } from "../hooks/use-page-meta";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();
  const { t } = useLanguage();
  usePageMeta(`${t('notFound.title')} | AI Solutions`, t('notFound.message'));

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-primary text-white overflow-hidden">
      <div
        className="absolute inset-0 z-0 opacity-[0.08] animate-grid-pan motion-reduce:animate-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(217,119,6,1) 1px, transparent 1px), linear-gradient(90deg, rgba(217,119,6,1) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />
      <div className="relative z-10 text-center px-4">
        <div className="relative inline-block mb-8 border border-white/20 bg-white/[0.03] px-10 py-8 sm:px-16 animate-scale-in">
          <span className="absolute -top-px -left-px h-4 w-4 border-t-2 border-l-2 border-accent" />
          <span className="absolute -top-px -right-px h-4 w-4 border-t-2 border-r-2 border-accent" />
          <span className="absolute -bottom-px -left-px h-4 w-4 border-b-2 border-l-2 border-accent" />
          <span className="absolute -bottom-px -right-px h-4 w-4 border-b-2 border-r-2 border-accent" />
          <Compass className="w-10 h-10 text-accent mx-auto mb-4" />
          <h1 className="font-display text-6xl md:text-7xl font-bold">{t('notFound.title')}</h1>
        </div>
        <p className="text-lg text-gray-300 mb-8 max-w-md mx-auto">{t('notFound.message')}</p>
        <Button
          asChild
          size="lg"
          className="bg-accent hover:bg-accent-light text-white transition-all hover:-translate-y-0.5"
        >
          <Link to="/">{t('notFound.backHome')}</Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
