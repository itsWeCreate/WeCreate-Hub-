import React, { useState } from 'react';

interface LogoProps {
  className?: string;
}

export const AmericaOnTechLogo: React.FC<LogoProps> = ({ className = "" }) => (
  <svg viewBox="0 0 220 50" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <g className="transition-colors duration-300">
      <path d="M12 5 L28 5 C28 5, 32 20, 20 38 C8 20, 12 5, 12 5 Z" className="fill-current text-slate-300 group-hover:text-[#E65A20] transition-colors duration-300" />
      <path d="M15 8 L25 8 C25 8, 28 19, 20 31 C12 19, 15 8, 15 8 Z" className="fill-current text-white/90" />
      <path d="M20 12 L20 26" stroke="#051D43" strokeWidth="2.5" strokeLinecap="round" className="group-hover:stroke-[#051D43] transition-colors duration-300" />
      <path d="M16 16 L24 16" stroke="#051D43" strokeWidth="2.5" strokeLinecap="round" className="group-hover:stroke-[#051D43] transition-colors duration-300" />
      <text x="44" y="24" className="fill-current text-slate-400 group-hover:text-[#051D43] font-heading font-extrabold tracking-tight text-[15px] uppercase transition-colors duration-300">AMERICA</text>
      <text x="44" y="38" className="fill-current text-slate-400 group-hover:text-[#E65A20] font-heading font-bold tracking-wider text-[11px] uppercase transition-colors duration-300">ON TECH</text>
    </g>
  </svg>
);

export const CityOfMiramarLogo: React.FC<LogoProps> = ({ className = "" }) => (
  <svg viewBox="0 0 220 50" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <g className="transition-colors duration-300">
      <circle cx="22" cy="25" r="16" className="fill-current text-slate-200 group-hover:fill-[#00a896]/10 transition-colors duration-300" />
      <path d="M10 28 Q16 26, 22 28 T34 28" stroke="currentColor" strokeWidth="1.5" className="text-slate-300 group-hover:text-[#00a896] transition-colors duration-300" />
      <path d="M8 32 Q15 30, 22 32 T36 32" stroke="currentColor" strokeWidth="1.5" className="text-slate-300 group-hover:text-[#00a896] transition-colors duration-300" />
      <path d="M22 13 Q21 27, 19 32" stroke="currentColor" strokeWidth="2" className="text-slate-400 group-hover:text-[#0c4e3d] transition-colors duration-300" />
      <path d="M22 15 Q26 13, 31 16" stroke="currentColor" strokeWidth="1.5" className="text-slate-400 group-hover:text-[#00a896] transition-colors duration-300" />
      <path d="M20 18 Q14 17, 12 21" stroke="currentColor" strokeWidth="1.5" className="text-slate-400 group-hover:text-[#00a896] transition-colors duration-300" />
      <path d="M21 16 Q28 18, 30 23" stroke="currentColor" strokeWidth="1.5" className="text-slate-400 group-hover:text-[#00a896] transition-colors duration-300" />
      <text x="46" y="24" className="fill-current text-slate-500 group-hover:text-[#0c4e3d] font-heading font-extrabold tracking-wide text-[13px] uppercase transition-colors duration-300">CITY OF</text>
      <text x="46" y="38" className="fill-current text-slate-400 group-hover:text-[#00a896] font-space font-medium tracking-widest text-[15px] uppercase transition-colors duration-300">MIRAMAR</text>
    </g>
  </svg>
);

export const AgentConLogo: React.FC<LogoProps> = ({ className = "" }) => (
  <svg viewBox="0 0 220 50" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <g className="transition-colors duration-300">
      <path d="M8 20 L20 8 L32 20 L27 38 L13 38 Z" stroke="currentColor" strokeWidth="2" className="text-slate-300 group-hover:text-[#6366f1] transition-colors duration-300" />
      <path d="M15 25 L25 25 M20 20 L20 30" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-slate-400 group-hover:text-[#8b5cf6] transition-colors duration-300" />
      <circle cx="20" cy="25" r="3" className="fill-current text-slate-300 group-hover:text-[#6366f1] transition-colors duration-300" />
      <text x="42" y="31" className="fill-current text-slate-400 group-hover:text-[#6366f1] font-space font-black tracking-tighter text-[24px] uppercase italic transition-colors duration-300">AGENT<tspan className="text-slate-400 group-hover:text-[#8b5cf6] transition-colors duration-300">CON</tspan></text>
    </g>
  </svg>
);

export const IbmLogo: React.FC<LogoProps> = ({ className = "" }) => (
  <svg viewBox="0 0 220 50" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <g className="transition-colors duration-300">
      <g className="fill-current text-slate-300 group-hover:text-[#0f62fe] transition-colors duration-300">
        <rect x="12" y="10" width="12" height="3" />
        <rect x="12" y="14" width="12" height="3" />
        <rect x="12" y="18" width="12" height="3" />
        <rect x="12" y="22" width="12" height="3" />
        <rect x="12" y="26" width="12" height="3" />
        <rect x="12" y="30" width="12" height="3" />
        <rect x="12" y="34" width="12" height="3" />
        <rect x="12" y="38" width="12" height="3" />
        <rect x="34" y="10" width="18" height="3" />
        <rect x="34" y="14" width="6" height="3" /><rect x="46" y="14" width="7" height="3" />
        <rect x="34" y="18" width="6" height="3" /><rect x="47" y="18" width="6" height="3" />
        <rect x="34" y="22" width="19" height="3" />
        <rect x="34" y="26" width="6" height="3" /><rect x="48" y="26" width="5" height="3" />
        <rect x="34" y="30" width="6" height="3" /><rect x="48" y="30" width="5" height="3" />
        <rect x="34" y="34" width="6" height="3" /><rect x="47" y="34" width="6" height="3" />
        <rect x="34" y="38" width="18" height="3" />
        <rect x="62" y="10" width="6" height="3" /><rect x="84" y="10" width="6" height="3" />
        <rect x="62" y="14" width="7" height="3" /><rect x="73" y="14" width="6" height="3" /><rect x="83" y="14" width="7" height="3" />
        <rect x="62" y="18" width="8" height="3" /><rect x="71" y="18" width="10" height="3" /><rect x="82" y="18" width="8" height="3" />
        <rect x="62" y="22" width="9" height="3" /><rect x="70" y="22" width="12" height="3" /><rect x="81" y="22" width="9" height="3" />
        <rect x="62" y="26" width="6" height="3" /><rect x="71" y="26" width="10" height="3" /><rect x="84" y="26" width="6" height="3" />
        <rect x="62" y="30" width="6" height="3" /><rect x="73" y="30" width="6" height="3" /><rect x="84" y="30" width="6" height="3" />
        <rect x="62" y="34" width="6" height="3" /><rect x="74" y="34" width="4" height="3" /><rect x="84" y="34" width="6" height="3" />
        <rect x="62" y="38" width="6" height="3" /><rect x="84" y="38" width="6" height="3" />
      </g>
      <text x="100" y="29" className="fill-current text-slate-400 group-hover:text-slate-700 font-mono text-[10px] uppercase font-bold tracking-[0.2em] transition-colors duration-300">Global Partner</text>
    </g>
  </svg>
);

export const LibertyMutualLogo: React.FC<LogoProps> = ({ className = "" }) => (
  <svg viewBox="0 0 220 50" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <g className="transition-colors duration-300">
      <rect x="15" y="10" width="14" height="30" rx="2" className="fill-current text-slate-200 group-hover:fill-[#F5C400]/25 transition-colors duration-300" />
      <path d="M18 35 L22 20 L26 35 Z" className="fill-current text-slate-400 group-hover:text-[#0033a0] transition-colors duration-300" />
      <path d="M22 18 L22 10" stroke="currentColor" strokeWidth="2.5" className="text-slate-400 group-hover:text-[#F5C400] transition-colors duration-300" />
      <circle cx="22" cy="9" r="2.5" className="fill-current text-slate-400 group-hover:text-[#F5C400] transition-colors duration-300" />
      <text x="42" y="24" className="fill-current text-slate-500 group-hover:text-[#0033a0] font-sans font-extrabold tracking-tight text-[15px] italic transition-colors duration-300">Liberty</text>
      <text x="42" y="38" className="fill-current text-slate-400 group-hover:text-[#0033a0] font-sans font-medium tracking-wide text-[14px] uppercase transition-colors duration-300">Mutual</text>
    </g>
  </svg>
);

export const HamiltonLogo: React.FC<LogoProps> = ({ className = "" }) => (
  <svg viewBox="0 0 220 50" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <g className="transition-colors duration-300">
      <path d="M12 12 Q20 8, 28 12 Q28 26, 20 38 Q12 26, 12 12 Z" stroke="currentColor" strokeWidth="1.5" className="text-slate-300 group-hover:text-[#1a1a1a] transition-colors duration-300" />
      <polygon points="20,17 22,22 27,22 23,25 25,30 20,27 15,30 17,25 13,22 18,22" className="fill-current text-slate-300 group-hover:text-[#bf9f43] transition-colors duration-300" />
      <text x="42" y="31" className="fill-current text-slate-400 group-hover:text-[#1a1a1a] font-heading font-bold tracking-[0.25em] text-[18px] uppercase transition-colors duration-300">HAMILTON</text>
    </g>
  </svg>
);

export const NabwicLogo: React.FC<LogoProps> = ({ className = "" }) => (
  <svg viewBox="0 0 220 50" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <g className="transition-colors duration-300">
      <circle cx="21" cy="25" r="14" stroke="currentColor" strokeWidth="2" className="text-slate-300 group-hover:text-[#10b981] transition-colors duration-300" />
      <path d="M11 25 L31 25 M21 15 L21 35" stroke="currentColor" strokeWidth="1.5" className="text-slate-300 group-hover:text-[#d4af37] transition-colors duration-300" />
      <rect x="17" y="21" width="8" height="8" stroke="currentColor" strokeWidth="1.5" className="text-slate-400 group-hover:text-[#10b981] transition-colors duration-300" />
      <text x="44" y="24" className="fill-current text-slate-500 group-hover:text-[#1e4620] font-space font-extrabold tracking-wide text-[16px] uppercase transition-colors duration-300">NABWIC</text>
      <text x="44" y="37" className="fill-current text-slate-400 group-hover:text-[#10b981] font-heading font-semibold text-[7px] tracking-[0.1em] uppercase transition-colors duration-300">Assoc. Women in Construction</text>
    </g>
  </svg>
);

export const Code2040Logo: React.FC<LogoProps> = ({ className = "" }) => (
  <svg viewBox="0 0 220 50" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <g className="transition-colors duration-300">
      <path d="M12 15 L5 25 L12 35 M22 15 L29 25 L22 35" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-slate-300 group-hover:text-[#ef4444] transition-colors duration-300" />
      <path d="M19 13 L15 37" stroke="currentColor" strokeWidth="2" className="text-slate-300 group-hover:text-[#ef4444] transition-colors duration-300" />
      <text x="42" y="31" className="fill-current text-slate-400 group-hover:text-[#111111] font-mono font-black tracking-tighter text-[22px] uppercase transition-colors duration-300">CODE<tspan className="text-slate-300 group-hover:text-[#ef4444] font-extrabold transition-colors duration-300">2040</tspan></text>
    </g>
  </svg>
);

interface BrandLogoItemProps {
  id: string;
}

export const BrandLogoItem: React.FC<BrandLogoItemProps> = ({ id }) => {
  const [imgFailed, setImgFailed] = useState(false);

  // Possible file names you can upload to your /public/logos/ path in the future
  const imageSrcs = [
    `/logos/${id}.png`,
    `/logos/${id}.svg`,
    `/logos/${id}.jpg`,
    `/${id}.png`,
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleImageError = () => {
    if (currentImageIndex < imageSrcs.length - 1) {
      setCurrentImageIndex((prev) => prev + 1);
    } else {
      setImgFailed(true);
    }
  };

  // If we haven't failed, try to load the image first (which gives the user direct upload capabilities)
  if (!imgFailed) {
    return (
      <img
        src={imageSrcs[currentImageIndex]}
        alt={`${id} logo`}
        onError={handleImageError}
        className="max-h-12 w-auto max-w-[200px] object-contain transition-all duration-300 grayscale select-none pointer-events-none group-hover:grayscale-0 group-hover:scale-105"
      />
    );
  }

  // Fallback to our gorgeous custom vector SVG illustrations matching the specific brand colors
  switch (id) {
    case 'aot':
      return <AmericaOnTechLogo className="w-full h-12 max-w-[200px] select-none" />;
    case 'miramar':
      return <CityOfMiramarLogo className="w-full h-12 max-w-[200px] select-none" />;
    case 'agentcon':
      return <AgentConLogo className="w-full h-12 max-w-[200px] select-none" />;
    case 'ibm':
      return <IbmLogo className="w-full h-12 max-w-[200px] select-none" />;
    case 'liberty':
      return <LibertyMutualLogo className="w-full h-12 max-w-[200px] select-none" />;
    case 'hamilton':
      return <HamiltonLogo className="w-full h-12 max-w-[200px] select-none" />;
    case 'nabwic':
      return <NabwicLogo className="w-full h-12 max-w-[200px] select-none" />;
    case 'code2040':
      return <Code2040Logo className="w-full h-12 max-w-[200px] select-none" />;
    default:
      return null;
  }
};
