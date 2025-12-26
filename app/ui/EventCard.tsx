'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';

type EventCardProps = {
  title: string;
  description: string;
  image: string[];
  date: string;
}

const formatDate = (dateStr: string): string => {
  const date = new Date(dateStr); // Convert to Date here
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};



export default function EventCard({ title, description, image, date }: EventCardProps) {
  const [currI, setCurrI] = useState(0);

  const nextImage = () => {
    setCurrI((prev) => (prev + 1) % image.length);
  };

  const previousImage = () => {
    setCurrI((prev) => (prev - 1 + image.length) % image.length);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-[1.10]">
      <div className="relative w-full h-48 sm:h-64 md:h-72">
        <Image
          src={image[currI]}
          alt={`${title} - Image ${currI + 1}`}
          fill
          className="object-cover rounded-t-lg"
          priority
        />

        {image.length > 1 && (
          <>
            <button
              onClick={previousImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-1 rounded-full hover:bg-black/70 transition-colors"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-1 rounded-full hover:bg-black/70 transition-colors"
              aria-label="Next image"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
              {image.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrI(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currI ? 'bg-white' : 'bg-white/50'
                  }`}
                  aria-label={`Go to image ${index + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      <div className="p-6">        
        <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
        <div className="text-sm text-gray-500 mb-0 mt-3">{formatDate(date)}</div>
      </div>
    </div>
  );
};

