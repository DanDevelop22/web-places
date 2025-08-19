'use client';

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { PhotoCarouselProps } from '@/types';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const PhotoCarousel: React.FC<PhotoCarouselProps> = ({ photos, placeName }) => {
  return (
    <div className="relative w-full h-64 md:h-80 rounded-brand-lg overflow-hidden">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        loop={photos.length > 1}
        className="w-full h-full"
      >
        {photos.map((photo, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-full">
              <img
                src={photo}
                alt={`${placeName} - Foto ${index + 1}`}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-dark-900/20 to-transparent" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      
      {/* Custom navigation buttons */}
      <div className="absolute top-1/2 left-2 transform -translate-y-1/2 z-10">
        <button className="swiper-button-prev-custom bg-white/80 hover:bg-white text-brand-dark-800 rounded-full p-2 shadow-brand transition-all duration-200">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      </div>
      
      <div className="absolute top-1/2 right-2 transform -translate-y-1/2 z-10">
        <button className="swiper-button-next-custom bg-white/80 hover:bg-white text-brand-dark-800 rounded-full p-2 shadow-brand transition-all duration-200">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default PhotoCarousel;
