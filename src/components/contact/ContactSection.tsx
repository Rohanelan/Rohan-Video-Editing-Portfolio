import React, { useState } from 'react';
import {
  SiGmail,
  SiInstagram,
  SiYoutube
} from 'react-icons/si';
import {
  FaLinkedin,
  FaCopy,
  FaCheck,
  FaEnvelope,
  FaExternalLinkAlt
} from 'react-icons/fa';
import { CONTACT_INFO, CUSTOM_ASSETS } from '../../data/portfolioData';

export default function ContactSection() {
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(CONTACT_INFO.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const socialLogos: Record<string, React.ReactNode> = {
    instagram: <SiInstagram className="w-4 h-4 text-[#E4405F]" />,
    youtube: <SiYoutube className="w-4 h-4 text-[#FF0000]" />,
    linkedin: <FaLinkedin className="w-4 h-4 text-[#0A66C2]" />,
  };

  const gmailComposeUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(CONTACT_INFO.email)}`;

  return (
    <section id="contact" className="relative py-16 sm:py-20 md:py-24 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto space-y-2 mb-10 sm:mb-12">
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-white">
            LET'S <span className="text-[#FF1744]">CONNECT</span>
          </h2>
          <p className="font-sans text-neutral-400 text-sm sm:text-base leading-relaxed">
            Ready to bring your footage to life? Reach out directly to discuss timelines, briefs, or editing workflows.
          </p>
        </div>

        {/* 2-Column Minimal Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">

          {/* Left Column: Direct Communication */}
          <div className="p-6 sm:p-7 rounded-xl bg-[#0A0A0E] border border-white/[0.08] flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <h3 className="font-display text-lg sm:text-xl font-normal text-white tracking-wide">
                DIRECT INBOX
              </h3>
              <p className="font-sans text-xs sm:text-sm text-neutral-400 leading-relaxed">
                Whether you have raw footage ready for an assembly cut, a creative brief, or a project timeline, feel free to reach out.
              </p>
            </div>

            <div className="space-y-3">
              {/* Email Address Display */}
              <div className="p-4 rounded-lg bg-white/[0.03] border border-white/[0.06] flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-neutral-300 shrink-0">
                  {CUSTOM_ASSETS.contactEmailIcon && CUSTOM_ASSETS.contactEmailIcon.trim() !== '' ? (
                    <img
                      src={CUSTOM_ASSETS.contactEmailIcon}
                      alt="Email"
                      className="w-full h-full object-cover rounded-lg"
                    />
                  ) : (
                    <FaEnvelope className="w-3.5 h-3.5" />
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="font-mono text-[10px] text-neutral-500 uppercase tracking-wider">
                    EMAIL
                  </div>
                  <div className="font-sans text-sm font-medium text-white truncate select-all">
                    {CONTACT_INFO.email}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2.5">
                <button
                  onClick={handleCopyEmail}
                  className="flex-1 flex items-center justify-center gap-2 py-2 px-3.5 rounded-lg text-xs font-sans font-medium bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-neutral-300 hover:text-white transition-colors"
                >
                  {copiedEmail ? (
                    <>
                      <FaCheck className="w-3.5 h-3.5 text-green-400" />
                      <span className="text-green-400">Copied</span>
                    </>
                  ) : (
                    <>
                      <FaCopy className="w-3.5 h-3.5 text-neutral-400" />
                      <span>Copy Email</span>
                    </>
                  )}
                </button>

                <a
                  href={gmailComposeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-2 px-4 rounded-lg text-xs font-sans font-medium bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-neutral-300 hover:text-white transition-colors"
                >
                  <SiGmail className="w-3.5 h-3.5 text-[#EA4335]" />
                  <span>Open Gmail</span>
                </a>
              </div>
            </div>

            <div className="text-xs font-mono text-neutral-500 pt-2 border-t border-white/[0.06]">
              {CONTACT_INFO.timelineText}
            </div>
          </div>

          {/* Right Column: Social Media Links */}
          <div className="p-6 sm:p-7 rounded-xl bg-[#0A0A0E] border border-white/[0.08] flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <h3 className="font-display text-lg sm:text-xl font-normal text-white tracking-wide">
                SOCIAL CHANNELS
              </h3>
              <p className="font-sans text-xs sm:text-sm text-neutral-400 leading-relaxed">
                View ongoing edits, releases, and connect directly across official platforms.
              </p>
            </div>

            <div className="space-y-2.5">
              {CONTACT_INFO.socials.map((soc) => {
                const customSocialImage = CUSTOM_ASSETS.socialImages?.[soc.platform];
                return (
                  <a
                    key={soc.platform}
                    href={soc.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3.5 rounded-lg bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.06] hover:border-white/20 transition-colors duration-200 flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center shrink-0">
                        {customSocialImage && customSocialImage.trim() !== '' ? (
                          <img
                            src={customSocialImage}
                            alt={soc.name}
                            className="w-full h-full object-cover rounded-lg"
                          />
                        ) : (
                          socialLogos[soc.platform]
                        )}
                      </div>
                      <div className="min-w-0">
                        <div className="font-display text-xs font-normal text-white group-hover:text-[#FF1744] transition-colors truncate">
                          {soc.name}
                        </div>
                        <div className="font-sans text-[11px] text-neutral-500 truncate">
                          {soc.handle}
                        </div>
                      </div>
                    </div>

                    <FaExternalLinkAlt className="w-3 h-3 text-neutral-500 group-hover:text-neutral-300 transition-colors ml-2" />
                  </a>
                );
              })}
            </div>

            <div className="text-xs font-mono text-neutral-500 pt-2 border-t border-white/[0.06]">
              Direct DMs open on Instagram &amp; LinkedIn
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
