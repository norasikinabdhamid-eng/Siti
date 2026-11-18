import {useState} from 'react';
import {INSTITUTION_INFO} from '../data/gisData';

interface BrandLogoProps {
  className?: string;
}

export function BrandLogo({className = 'h-9 w-9'}: BrandLogoProps) {
  const [imgFailed, setImgFailed] = useState(false);

  if (!imgFailed) {
    return (
      <img
        src={`/${INSTITUTION_INFO.logoFilename}`}
        alt={`Logo Rasmi ${INSTITUTION_INFO.name}`}
        referrerPolicy="no-referrer"
        onError={() => setImgFailed(true)}
        className={`${className} rounded-md object-cover border border-white/15 bg-[#111827] shrink-0`}
      />
    );
  }

  return (
    <span
      className={`${className} inline-flex items-center justify-center rounded-md bg-[#111827] border border-white/15 shrink-0`}
      aria-hidden="true"
    >
      <svg viewBox="0 0 36 36" fill="none" className="h-6 w-6">
        <rect x="3" y="3" width="30" height="30" rx="6" stroke="#00d2ff" strokeWidth="1.5" strokeOpacity="0.55" />
        <path
          d="M18 9L27 13.5L18 18L9 13.5L18 9Z"
          stroke="#00d2ff"
          strokeWidth="1.75"
          strokeLinejoin="round"
        />
        <path
          d="M12 16.5V22.2C12 23.8 14.7 25.5 18 25.5C21.3 25.5 24 23.8 24 22.2V16.5"
          stroke="#ff7a00"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M27 13.5V20" stroke="#00d2ff" strokeWidth="1.75" strokeLinecap="round" />
      </svg>
    </span>
  );
}
