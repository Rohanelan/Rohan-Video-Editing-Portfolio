import React, { useState } from 'react';
import { ABOUT_DATA } from '../../data/portfolioData';
import { SOFTWARE_LOGOS } from '../../data/softwareLogos';

// --------------------------------------------------------------------------
// Authentic Official Vector SVG Logos for the 6 Video Editing Applications
// --------------------------------------------------------------------------

function PremiereProLogo() {
  return (
    <svg viewBox="0 0 100 100" className="w-10 h-10 drop-shadow-sm" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="100" height="100" rx="20" fill="#00005B" />
      <rect x="2" y="2" width="96" height="96" rx="18" stroke="#9999FF" strokeWidth="4" />
      <text
        x="50"
        y="68"
        fontFamily="system-ui, -apple-system, sans-serif"
        fontSize="52"
        fontWeight="800"
        fill="#9999FF"
        textAnchor="middle"
        letterSpacing="-1.5"
      >
        Pr
      </text>
    </svg>
  );
}

function DaVinciResolveLogo() {
  return (
    <svg viewBox="0 0 100 100" className="w-10 h-10 drop-shadow-sm" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="100" height="100" rx="20" fill="#0E0E14" />
      <rect x="2" y="2" width="96" height="96" rx="18" stroke="rgba(255,255,255,0.12)" strokeWidth="2" />
      <g transform="translate(50, 50)">
        <path d="M 0,-4 C 8,-28 32,-28 38,-14 C 42,-2 32,16 12,18 Z" fill="#FF334B" />
        <path d="M 3,4 C 24,14 26,38 12,42 C 0,44 -16,32 -16,14 Z" fill="#00E676" />
        <path d="M -4,0 C -26,8 -38,-10 -32,-24 C -28,-36 -8,-32 4,-12 Z" fill="#00B0FF" />
        <circle r="7" fill="#0E0E14" />
      </g>
    </svg>
  );
}

function AfterEffectsLogo() {
  return (
    <svg viewBox="0 0 100 100" className="w-10 h-10 drop-shadow-sm" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="100" height="100" rx="20" fill="#00005B" />
      <rect x="2" y="2" width="96" height="96" rx="18" stroke="#D291FF" strokeWidth="4" />
      <text
        x="50"
        y="68"
        fontFamily="system-ui, -apple-system, sans-serif"
        fontSize="52"
        fontWeight="800"
        fill="#D291FF"
        textAnchor="middle"
        letterSpacing="-1.5"
      >
        Ae
      </text>
    </svg>
  );
}

function CapCutLogo() {
  return (
    <svg viewBox="0 0 100 100" className="w-10 h-10 drop-shadow-sm" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="100" height="100" rx="20" fill="#0A0A0E" />
      <rect x="2" y="2" width="96" height="96" rx="18" stroke="rgba(255,255,255,0.12)" strokeWidth="2" />
      <g transform="translate(18, 18)">
        <path d="M 6,10 L 58,10 L 40,28 L 6,28 Z" fill="#FFFFFF" />
        <path d="M 6,36 L 40,36 L 58,54 L 6,54 Z" fill="#FFFFFF" />
        <path d="M 40,28 L 58,10 L 58,22 L 46,32 Z" fill="#E0E0E0" opacity="0.9" />
        <path d="M 40,36 L 58,54 L 58,42 L 46,32 Z" fill="#BDBDBD" opacity="0.9" />
      </g>
    </svg>
  );
}

function WondershareFilmoraLogo() {
  return (
    <svg viewBox="0 0 100 100" className="w-10 h-10 drop-shadow-sm" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="100" height="100" rx="20" fill="#0B0B10" />
      <rect x="2" y="2" width="96" height="96" rx="18" stroke="rgba(255,255,255,0.12)" strokeWidth="2" />
      <g transform="translate(24, 22)">
        <path d="M 4,6 L 40,26 L 4,46 Z" fill="#00C9FF" />
        <path d="M 4,6 L 48,16 L 40,26 Z" fill="#E100FF" />
        <path d="M 40,26 L 48,16 L 50,42 L 22,50 Z" fill="#FF007F" opacity="0.95" />
      </g>
    </svg>
  );
}

function VNVideoEditorLogo() {
  return (
    <svg viewBox="0 0 100 100" className="w-10 h-10 drop-shadow-sm" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="100" height="100" rx="20" fill="#0A0A0F" />
      <rect x="2" y="2" width="96" height="96" rx="18" stroke="rgba(255,255,255,0.12)" strokeWidth="2" />
      <g transform="translate(16, 26)">
        <path d="M 4,4 L 16,4 L 24,34 L 32,4 L 44,4 L 28,48 L 20,48 Z" fill="#FFFFFF" />
        <path d="M 44,4 L 56,4 L 56,22 L 68,4 L 68,48 L 56,48 L 56,30 L 44,48 Z" fill="#FFFFFF" />
        <polygon points="28,26 38,32 28,38" fill="#FFD600" />
      </g>
    </svg>
  );
}

// --------------------------------------------------------------------------
// Clean & Minimal Software Item Card
// --------------------------------------------------------------------------
interface SoftwareCardProps {
  name: string;
  category: string;
  description: string;
  tags: string[];
  logo: React.ReactNode;
  customImage?: string;
}

function SoftwareCardClean({ name, category, description, tags, logo, customImage }: SoftwareCardProps) {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="rounded-xl p-5 sm:p-6 bg-[#0A0A0E] border border-white/[0.08] hover:border-white/20 transition-colors duration-200 flex flex-col justify-between">
      <div className="space-y-3.5">
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-white/[0.04] border border-white/[0.08] shrink-0 flex items-center justify-center p-1.5 overflow-hidden">
            {customImage && customImage.trim() !== '' && !imgError ? (
              <img
                src={customImage}
                alt={name}
                onError={() => setImgError(true)}
                className="w-full h-full object-contain"
              />
            ) : (
              logo
            )}
          </div>

          <div className="min-w-0">
            <span className="font-mono text-[10px] tracking-wider uppercase text-neutral-500 block">
              {category}
            </span>
            <h4 className="font-display text-sm sm:text-base font-normal tracking-wide text-white truncate">
              {name}
            </h4>
          </div>
        </div>

        <p className="font-sans text-xs sm:text-sm text-neutral-400 font-normal leading-relaxed">
          {description}
        </p>
      </div>

      <div className="pt-4 mt-4 border-t border-white/[0.06] flex flex-wrap gap-1.5">
        {tags.map((tag, idx) => (
          <span
            key={idx}
            className="px-2 py-0.5 rounded-md bg-white/[0.03] border border-white/[0.06] font-sans text-[11px] text-neutral-400"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

// --------------------------------------------------------------------------
// Main About & Software Arsenal Component
// --------------------------------------------------------------------------
export default function AboutSection() {
  const softwareLogos: Record<string, React.ReactNode> = {
    premiere: <PremiereProLogo />,
    davinci: <DaVinciResolveLogo />,
    aftereffects: <AfterEffectsLogo />,
    capcut: <CapCutLogo />,
    filmora: <WondershareFilmoraLogo />,
    vn: <VNVideoEditorLogo />,
  };

  const softwareCustomImages: Record<string, string | undefined> = {
    premiere: SOFTWARE_LOGOS.premierePro,
    davinci: SOFTWARE_LOGOS.davinciResolve,
    aftereffects: SOFTWARE_LOGOS.afterEffects,
    capcut: SOFTWARE_LOGOS.capcut,
    filmora: SOFTWARE_LOGOS.filmora,
    vn: SOFTWARE_LOGOS.vnEditor,
  };

  return (
    <section id="about" className="relative py-16 sm:py-20 md:py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="mb-10 sm:mb-12">
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-white">
            BEHIND THE <span className="text-[#FF1744]">FRAMES</span>
          </h2>
        </div>

        {/* Profile & Biography Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Clean Portrait */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-sm rounded-2xl overflow-hidden border border-white/10 bg-[#0A0A0E]">
              <div className="aspect-[4/5] bg-black">
                <img
                  src={ABOUT_DATA.profilePhoto}
                  alt="Rohan Sharma - Video Editor"
                  className="w-full h-full object-cover object-top"
                />
              </div>

              {/* Clean Bottom Label */}
              <div className="p-4 bg-[#0A0A0E] border-t border-white/[0.08]">
                <div className="font-mono text-[10px] text-[#FF1744] tracking-widest uppercase">
                  VIDEO EDITOR
                </div>
                <div className="font-display text-base sm:text-lg font-normal text-white mt-0.5">
                  {ABOUT_DATA.name}
                </div>
                <div className="text-xs text-neutral-400 font-sans mt-0.5">
                  Remote & Worldwide
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Personal Story */}
          <div className="lg:col-span-7 space-y-5">
            <div className="space-y-4">
              <h3 className="font-display text-xl sm:text-2xl font-normal text-white tracking-wide">
                ABOUT ME
              </h3>
              <div className="space-y-3.5 text-neutral-300 font-sans text-sm sm:text-base leading-relaxed">
                {ABOUT_DATA.bio.map((paragraph, idx) => (
                  <p key={idx}>
                    {paragraph}
                  </p>
                ))}
              </div>
              <p className="font-display text-sm sm:text-base font-normal text-[#FF1744] tracking-wide pt-3 border-t border-white/[0.08]">
                {ABOUT_DATA.punchline}
              </p>
            </div>
          </div>

        </div>

        {/* Software Arsenal */}
        <div className="mt-16 sm:mt-20 pt-10 sm:pt-12 border-t border-white/[0.08]">
          <div className="mb-8">
            <h3 className="font-display text-2xl sm:text-3xl font-normal tracking-wide text-white">
              SOFTWARE <span className="text-[#FF1744]">ARSENAL</span>
            </h3>
          </div>

          {/* 6 Software Cards in 3-Column Clean Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {ABOUT_DATA.softwareArsenal.map((sw) => (
              <SoftwareCardClean
                key={sw.id}
                name={sw.name}
                category={sw.category}
                description={sw.description}
                tags={sw.tags}
                logo={softwareLogos[sw.id]}
                customImage={softwareCustomImages[sw.id] || sw.customImage}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
