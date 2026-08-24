import { LucideIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

interface EmptyStateProps {
  icon: LucideIcon;
  message: string;
  ctaLabel: string;
}

const EmptyState = ({ icon: Icon, message, ctaLabel }: EmptyStateProps) => {
  return (
    <div className="py-24 bg-white">
      <div className="container mx-auto px-4 text-center">
        <div className="relative inline-block mb-8 border border-gray-200 bg-gray-50 px-10 py-10 sm:px-16 animate-scale-in">
          <span className="absolute -top-px -left-px h-4 w-4 border-t-2 border-l-2 border-accent" />
          <span className="absolute -top-px -right-px h-4 w-4 border-t-2 border-r-2 border-accent" />
          <span className="absolute -bottom-px -left-px h-4 w-4 border-b-2 border-l-2 border-accent" />
          <span className="absolute -bottom-px -right-px h-4 w-4 border-b-2 border-r-2 border-accent" />
          <Icon className="w-10 h-10 text-accent mx-auto" />
        </div>
        <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">{message}</p>
        <Button
          asChild
          size="lg"
          className="bg-accent hover:bg-accent-light text-white transition-all hover:-translate-y-0.5"
        >
          <Link to="/contact">{ctaLabel}</Link>
        </Button>
      </div>
    </div>
  );
};

export default EmptyState;
