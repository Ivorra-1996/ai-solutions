interface PageHeaderProps {
  title: string;
  subtitle?: string;
}

const PageHeader = ({ title, subtitle }: PageHeaderProps) => {
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
      <div className="container mx-auto px-4 relative z-10 text-center">
        <h1 className="font-display text-4xl md:text-5xl font-bold mb-4 animate-fade-in">{title}</h1>
        {subtitle && (
          <p
            className="text-lg text-gray-300 max-w-2xl mx-auto animate-fade-in"
            style={{ animationDelay: '100ms' }}
          >
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
};

export default PageHeader;
