interface ArticleHeroImageProps {
  filename: string;
  alt: string;
}

export default function ArticleHeroImage({ filename, alt }: ArticleHeroImageProps) {
  return (
    <div className="w-full aspect-video relative rounded-xl overflow-hidden shadow-md mb-8 bg-[var(--color-cream)]">
      <picture>
        <source media="(max-width: 639px)" srcSet={`/images/articles/mobile/${filename}`} />
        <source media="(max-width: 1023px)" srcSet={`/images/articles/tablet/${filename}`} />
        <img
          src={`/images/articles/desktop/${filename}`}
          alt={alt}
          className="w-full h-full object-cover"
          loading="eager"
          decoding="async"
        />
      </picture>
    </div>
  );
}
