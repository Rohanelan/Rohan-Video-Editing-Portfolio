import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { LuPlay, LuArrowUpRight } from 'react-icons/lu';
import { PROJECTS_DATA } from '../../data/portfolioData';
import { Project } from '../../types';
import ProjectModal from './ProjectModal';

interface VideoCardProps {
  project: Project;
  onClick: () => void;
  index: number;
}

function VideoCard({ project, index }: VideoCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => window.open(project.externalUrl, "_blank", "noopener noreferrer")}
      className="group relative cursor-pointer rounded-xl overflow-hidden bg-[#0A0A0E] border border-white/[0.08] hover:border-white/20 transition-colors duration-300 flex flex-col justify-between"
    >
      {/* Thumbnail Container */}
      <div className="relative overflow-hidden aspect-[16/10] bg-black select-none">
        <img
          src={project.thumbnail}
          alt={project.title}
          loading="lazy"
          className="w-full h-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-[1.03]"
        />

        {/* Minimal Dark Tint on Hover */}
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300 pointer-events-none" />

        {/* Minimal Play Icon Overlay */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
          <div
            className={`w-11 h-11 rounded-full bg-[#FF1744] text-white flex items-center justify-center shadow-lg transition-transform duration-300 ${
              isHovered ? 'scale-105 opacity-100' : 'scale-90 opacity-80'
            }`}
          >
            <LuPlay className="w-4 h-4 fill-white ml-0.5" />
          </div>
        </div>
      </div>

      {/* Card Content & Details */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {project.clientPlaceholder && (
            <div className="text-[10px] font-mono text-neutral-500 uppercase tracking-wider mb-1">
              {project.clientPlaceholder}
            </div>
          )}
          <h3 className="font-display text-sm sm:text-base font-normal tracking-wide text-white group-hover:text-[#FF1744] transition-colors flex items-center justify-between">
            <span className="truncate">{project.title}</span>
            <LuArrowUpRight className="w-3.5 h-3.5 shrink-0 opacity-0 group-hover:opacity-100 text-[#FF1744] transition-all" />
          </h3>
          {project.shortDesc && (
            <p className="mt-1.5 font-sans text-xs text-neutral-400 line-clamp-2 leading-relaxed">
              {project.shortDesc}
            </p>
          )}
        </div>

        {/* Card Footer: Simple View Link */}
        <div className="pt-3 mt-3 border-t border-white/[0.06] flex items-center justify-between text-xs text-neutral-400">
          <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-wider">
            {project.category}
          </span>
          <span className="font-display text-[10px] tracking-wider text-neutral-400 group-hover:text-[#FF1744] transition-colors">
            OPEN REEL →
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export default function WorkSection() {
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  return (
    <section id="work" className="relative py-16 sm:py-20 md:py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-white">
            MY <span className="text-[#FF1744]">WORK</span>
          </h2>
        </div>

        {/* Clean, Balanced Grid of Video Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROJECTS_DATA.map((project, index) => (
            <VideoCard
              key={project.id}
              project={project}
              index={index}
              onClick={() => window.open(project.externalUrl, "_blank", "noopener noreferrer")}
            />
          ))}
        </div>

      </div>

      <ProjectModal
        project={activeProject}
        onClose={() => setActiveProject(null)}
      />
    </section>
  );
}
