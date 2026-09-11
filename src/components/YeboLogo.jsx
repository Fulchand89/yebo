import React from 'react';
import yeboLogoImg from '@/assets/logo/Image (YEBO PERKS).png';

export function YeboLogo({ className = "h-12 md:h-14", alt = "YEBO PERKS - Big Savings, Lekker Living" }) {
  return (
    <div className="inline-flex items-center select-none">
      <img
        src={yeboLogoImg}
        alt={alt}
        className={`w-auto object-contain drop-shadow-xs transition-transform hover:scale-[1.02] ${className}`}
      />
    </div>
  );
}

export default YeboLogo;
