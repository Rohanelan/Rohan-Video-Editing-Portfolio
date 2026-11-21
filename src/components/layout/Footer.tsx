import React from 'react';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export default function Footer({ onNavigate: _onNavigate }: FooterProps) {
  return (
    <footer className="relative bg-[#050505] border-t border-white/[0.06] py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-xs font-mono text-neutral-500">
          © {new Date().getFullYear()} RohanElan. All rights reserved. Video Editor portfolio.
        </p>
      </div>
    </footer>
  );
}
