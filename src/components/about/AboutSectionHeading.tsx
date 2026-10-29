interface AboutSectionHeadingProps {
  id: string;
  eyebrow: string;
  title: string;
  description?: string;
}

export function AboutSectionHeading({ id, eyebrow, title, description }: AboutSectionHeadingProps) {
  return (
    <div className="mb-8 max-w-2xl sm:mb-10">
      <p className="mb-3 text-sm font-medium text-brand-primary">{eyebrow}</p>
      <h2 id={id} className="home-heading">{title}</h2>
      {description && <p className="mt-4 text-base leading-relaxed text-gray-600">{description}</p>}
    </div>
  );
}
