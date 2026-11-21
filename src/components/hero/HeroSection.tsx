import React from 'react';
import { motion } from 'framer-motion';
import HeroScene from '../3d/HeroScene';
import { HERO_DATA } from '../../data/portfolioData';

export default function HeroSection() {
  return (
    <section 
      id="home" 
      className="relative min-h-[75vh] lg:min-h-[80vh] flex items-center pt-24 sm:pt-28 pb-12 sm:pb-16 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Hero Content: Headline & Positioning */}
          <div className="lg:col-span-6 z-10 space-y-6 sm:space-y-8 max-w-xl">
            
            {/* Upper Role Tag */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs font-display tracking-widest uppercase text-neutral-400"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF1744]" />
              <span>{HERO_DATA.roleBadge}</span>
            </motion.div>

            {/* Main Headline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="space-y-1"
            >
              <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal tracking-tight leading-[1.05] select-none">
                <span className="block text-white">EDIT.</span>
                <span className="block text-white">DIRECT.</span>
                <span className="block text-[#FF1744]">
                  CREATE.
                </span>
              </h1>
            </motion.div>

            {/* Supporting Text */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="font-sans text-base sm:text-lg text-neutral-400 font-normal leading-relaxed max-w-lg"
            >
              {HERO_DATA.supportingText}
            </motion.p>

          </div>

          {/* Right Hero: 3D Visual Centerpiece */}
          <div className="lg:col-span-6 relative flex items-center justify-center">
            <HeroScene />
          </div>

        </div>
      </div>
    </section>
  );
}
