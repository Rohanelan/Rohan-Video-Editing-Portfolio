import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaPlay, FaClock, FaFilm, FaSlidersH, FaLayerGroup, FaCheckCircle } from 'react-icons/fa';
import { LuSparkles } from 'react-icons/lu';
import { Project } from '../../types';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isPlaying, setIsPlaying] = useState(false);

  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/90 backdrop-blur-xl"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-5xl bg-[#0B0B10] border border-red-500/30 rounded-3xl overflow-hidden shadow-2xl z-10 my-8"
        >
          {/* Top Bar */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-black/40">
            <div className="flex items-center gap-3">
              <span className="font-display px-3 py-1 rounded-full text-[10px] sm:text-xs tracking-wider uppercase bg-[#FF1744]/20 border border-[#FF1744]/40 text-[#FF1744]">
                {project.category}
              </span>
              <span className="text-xs font-mono text-neutral-400">
                {project.clientPlaceholder}
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full text-neutral-400 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
              aria-label="Close modal"
            >
              <FaTimes className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6 md:p-8 space-y-8 max-h-[80vh] overflow-y-auto">
            {/* Main Video / Preview Player */}
            <div className="relative rounded-2xl overflow-hidden bg-black border border-white/10 shadow-2xl aspect-video group">
              {project.videoPreviewUrl && isPlaying ? (
                <video
                  src={project.videoPreviewUrl}
                  controls
                  autoPlay
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="relative w-full h-full">
                  <img
                    src={project.thumbnail}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-center justify-center">
                    <button
                      onClick={() => setIsPlaying(true)}
                      className="group/btn relative w-20 h-20 rounded-full bg-[#FF1744] hover:bg-[#FF2A40] text-white flex items-center justify-center shadow-glow-red hover:scale-110 transition-all duration-300"
                    >
                      <FaPlay className="w-6 h-6 fill-white ml-1" />
                      <span className="absolute -inset-2 rounded-full border border-red-500/50 animate-ping opacity-60" />
                    </button>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs font-mono text-white/80 bg-black/60 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10">
                    <span className="flex items-center gap-1.5">
                      <FaClock className="w-3.5 h-3.5 text-[#FF1744]" /> Duration: {project.duration}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <FaFilm className="w-3.5 h-3.5 text-[#FF1744]" /> {project.resolution} • {project.frameRate}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Title in Michroma & Full Description in Manrope */}
            <div className="space-y-3">
              <h2 className="font-display text-2xl sm:text-3xl font-normal tracking-wide text-white">
                {project.title}
              </h2>
              <p className="font-sans text-neutral-300 text-sm sm:text-base leading-relaxed">
                {project.fullDesc}
              </p>
            </div>

            {/* Before / After Color Grading Slider (Interactive Feature) */}
            {project.beforeAfterGrade && (
              <div className="space-y-3 p-5 rounded-2xl bg-surface-card border border-white/10">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FaSlidersH className="w-4 h-4 text-[#FF1744]" />
                    <h3 className="font-display text-xs sm:text-sm tracking-wider uppercase text-white">
                      COLOR SCIENCE: RAW LOG VS REC.709 GRADED
                    </h3>
                  </div>
                  <span className="text-[11px] font-mono text-neutral-400 hidden sm:inline">
                    Drag slider to inspect color grade
                  </span>
                </div>

                <div className="relative w-full h-64 sm:h-80 rounded-xl overflow-hidden select-none border border-white/15">
                  {/* Graded Image (Background) */}
                  <img
                    src={project.beforeAfterGrade.gradedUrl}
                    alt="Graded"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute top-3 right-3 px-2.5 py-1 rounded-md bg-black/70 backdrop-blur-md text-[10px] font-display text-[#FF1744] border border-[#FF1744]/40">
                    FINAL REC.709 GRADE
                  </div>

                  {/* LOG Image (Foreground clipped by slider) */}
                  <div
                    className="absolute inset-0 overflow-hidden"
                    style={{ width: `${sliderPosition}%` }}
                  >
                    <img
                      src={project.beforeAfterGrade.logUrl}
                      alt="Raw Log"
                      className="absolute inset-0 w-full h-full object-cover max-w-none"
                      style={{ width: '100%', minWidth: '100%' }}
                    />
                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-black/70 backdrop-blur-md text-[10px] font-display text-neutral-300 border border-white/20">
                      RAW S-LOG3 / FLAT
                    </div>
                  </div>

                  {/* Slider Divider Bar */}
                  <div
                    className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize shadow-glow-red"
                    style={{ left: `${sliderPosition}%` }}
                  >
                    <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[#FF1744] border-2 border-white flex items-center justify-center text-white shadow-lg">
                      <FaSlidersH className="w-3.5 h-3.5" />
                    </div>
                  </div>

                  {/* Interactive Invisible Input Slider */}
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={sliderPosition}
                    onChange={(e) => setSliderPosition(Number(e.target.value))}
                    className="absolute inset-0 opacity-0 cursor-ew-resize w-full h-full z-20"
                    aria-label="Color grade comparison slider"
                  />
                </div>
              </div>
            )}

            {/* Technical Specifications Grid in Michroma labels */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              {/* Tools Used */}
              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.08] space-y-2">
                <div className="flex items-center gap-2 font-display text-[10px] text-[#FF1744] uppercase tracking-wider">
                  <FaLayerGroup className="w-3.5 h-3.5" /> Software Pipeline
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {project.tools.map((t, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded-md bg-neutral-800 text-[11px] font-sans font-medium text-neutral-200"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Roles Performed */}
              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.08] space-y-2">
                <div className="flex items-center gap-2 font-display text-[10px] text-[#FF1744] uppercase tracking-wider">
                  <LuSparkles className="w-3.5 h-3.5" /> Editorial Roles
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {project.role.map((r, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-red-950/40 border border-red-500/20 text-[11px] font-sans font-medium text-red-200"
                    >
                      <FaCheckCircle className="w-3 h-3 text-[#FF1744]" /> {r}
                    </span>
                  ))}
                </div>
              </div>

              {/* Delivery Specs */}
              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.08] space-y-2">
                <div className="flex items-center gap-2 font-display text-[10px] text-[#FF1744] uppercase tracking-wider">
                  <FaFilm className="w-3.5 h-3.5" /> Delivery Specs
                </div>
                <div className="text-xs text-neutral-300 font-mono space-y-1">
                  <div>Master: {project.resolution}</div>
                  <div>Aspect: {project.aspectRatio} @ {project.frameRate}</div>
                </div>
              </div>
            </div>

            {/* Placeholder replacement note */}
            <div className="p-4 rounded-xl bg-red-950/20 border border-red-500/30 text-xs font-sans text-neutral-400">
              <strong className="text-white font-semibold">Customization Note:</strong> Easily replace this project with your own footage, links, or client files in <code className="text-[#FF1744] font-mono">src/data/portfolioData.ts</code>.
            </div>

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
