import React, { useState, useEffect } from 'react';
import Navbar from './components/layout/Navbar';
import HeroSection from './components/hero/HeroSection';
import WorkSection from './components/work/WorkSection';
import AboutSection from './components/about/AboutSection';
import ContactSection from './components/contact/ContactSection';
import Footer from './components/layout/Footer';
import FilmGrain from './components/common/FilmGrain';

export default function App() {
  const [activeSection, setActiveSection] = useState('home');

  // Scrollspy to automatically update active nav pill (Home, Work, About, Contact)
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'work', 'about', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    const target = document.getElementById(sectionId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-[#050505] text-white selection:bg-[#FF1744] selection:text-white overflow-x-hidden font-sans">
      {/* Atmospheric Film Grain & Red Rim Streaks */}
      <FilmGrain />

      {/* Top Floating Glass Navigation Bar in Michroma */}
      <Navbar
        activeSection={activeSection}
        onNavigate={handleNavigate}
      />

      {/* Hero Section with 3D Clapperboard & Michroma Headline */}
      <HeroSection />

      {/* Work Portfolio Section: MY WORK */}
      <WorkSection />

      {/* About Me & Software Arsenal Section */}
      <AboutSection />

      {/* Contact Section: Direct Communication & Social Links */}
      <ContactSection />

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
