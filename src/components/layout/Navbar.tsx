import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LuMenu, LuX, LuArrowUpRight } from 'react-icons/lu';

interface NavbarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export default function Navbar({ activeSection, onNavigate }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);

  // Exactly the 4 requested sections: Home, Work, About, Contact
  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'work', label: 'Work' },
    { id: 'about', label: 'About' },
    { id: 'contact', label: 'Contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'py-3.5 bg-[#050505]/92 backdrop-blur-2xl border-b border-white/[0.06] shadow-2xl'
          : 'py-5 sm:py-6 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Brand Logo: Rohan */}
          <button
            onClick={() => handleNavClick('home')}
            className="group flex items-center focus:outline-none select-none"
            aria-label="Rohan home"
          >
            <span className="font-display text-lg sm:text-xl font-normal tracking-wide text-white transition-colors">
              Rohan
            </span>
          </button>

          {/* Desktop Navigation Links with Smooth Crimson Underline */}
          <nav
            onMouseLeave={() => setHoveredNav(null)}
            className="hidden md:flex items-center px-4 py-1.5 rounded-full bg-[#0C0C12]/80 backdrop-blur-2xl border border-white/[0.08] shadow-glass relative"
          >
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              const isHovered = hoveredNav === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  onMouseEnter={() => setHoveredNav(item.id)}
                  className={`relative px-4 py-2 font-display text-[11px] sm:text-xs tracking-wider transition-colors duration-200 select-none focus:outline-none ${
                    isActive
                      ? 'text-white'
                      : isHovered
                      ? 'text-white'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  <span className="relative z-10">{item.label}</span>

                  {/* Active Indicator: Subtle Crimson Underline Pill */}
                  {isActive && (
                    <motion.div
                      layoutId="active-nav-indicator"
                      className="absolute bottom-1 left-3 right-3 h-[2px] bg-[#FF1744] rounded-full"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}

                  {/* Hover Highlight */}
                  {isHovered && !isActive && (
                    <motion.div
                      layoutId="hover-nav-highlight"
                      className="absolute inset-0 rounded-full bg-white/[0.05]"
                      transition={{ type: 'spring', stiffness: 400, damping: 28 }}
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action: Let's Collaborate Button */}
          <div className="hidden md:block">
            <button
              onClick={() => handleNavClick('contact')}
              className="group inline-flex items-center gap-2 px-4 py-2 font-display text-[11px] tracking-wider rounded-full border border-white/20 bg-white/[0.03] text-white hover:border-[#FF1744] hover:bg-[#FF1744]/10 transition-colors duration-200"
            >
              <span>LET'S COLLABORATE</span>
              <LuArrowUpRight className="w-3.5 h-3.5 text-[#FF1744]" />
            </button>
          </div>

          {/* Mobile Hamburger Toggle */}
          <div className="flex md:hidden items-center gap-3">
            <button
              onClick={() => handleNavClick('contact')}
              className="font-display px-3 py-1.5 text-[10px] tracking-wider rounded-full border border-red-500/30 bg-red-500/10 text-white"
            >
              CONTACT
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-neutral-400 hover:text-white bg-white/[0.05] border border-white/10 focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <LuX className="w-5 h-5" /> : <LuMenu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#0A0A0E]/98 backdrop-blur-2xl border-b border-red-500/20 px-6 py-6"
          >
            <div className="flex flex-col gap-2.5">
              {navItems.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`flex items-center justify-between px-4 py-3 rounded-lg text-left font-display text-xs tracking-wider transition-colors ${
                      isActive
                        ? 'bg-white/[0.06] text-white border-l-2 border-[#FF1744]'
                        : 'text-neutral-400 hover:text-white hover:bg-white/[0.02]'
                    }`}
                  >
                    <span>{item.label}</span>
                    {isActive && <div className="w-1.5 h-1.5 rounded-full bg-[#FF1744]" />}
                  </button>
                );
              })}
              <div className="pt-4 border-t border-white/[0.08]">
                <button
                  onClick={() => handleNavClick('contact')}
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-full bg-[#FF1744] text-white font-display text-xs tracking-wider hover:bg-red-600 transition-colors"
                >
                  <span>LET'S COLLABORATE</span>
                  <LuArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
