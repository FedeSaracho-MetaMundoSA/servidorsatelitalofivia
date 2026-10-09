import React, { useEffect, useCallback, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function SolarCarousel({ images }: { images: string[] }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'center' }, [Autoplay({ delay: 5000, stopOnInteraction: false })]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi, setSelectedIndex]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on('select', onSelect);
    onSelect();
  }, [emblaApi, onSelect]);

  return (
    <div className="relative group w-full rounded-3xl overflow-hidden shadow-2xl">
      <div className="overflow-hidden w-full h-[500px]" ref={emblaRef}>
        <div className="flex h-full">
          {images.map((src, index) => (
            <div className="flex-[0_0_100%] min-w-0 relative h-full" key={index}>
              <img
                src={src}
                alt={`Solar Installation ${index + 1}`}
                className="w-full h-full object-cover brightness-75 hover:brightness-100 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0b0e14] via-transparent to-transparent pointer-events-none" />
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={scrollPrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/50 backdrop-blur-md border border-white/10 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-[#FF5665] cursor-pointer"
      >
        <ChevronLeft />
      </button>

      <button
        onClick={scrollNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/50 backdrop-blur-md border border-white/10 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-[#FF5665] cursor-pointer"
      >
        <ChevronRight />
      </button>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => emblaApi?.scrollTo(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === selectedIndex ? 'w-8 bg-amber-500' : 'w-2 bg-white/30'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
