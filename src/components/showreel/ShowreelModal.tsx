import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaTimes,
  FaPlay,
  FaPause,
  FaVolumeUp,
  FaVolumeMute,
  FaExpand,
} from 'react-icons/fa';

interface ShowreelModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ShowreelModal({ isOpen, onClose }: ShowreelModalProps) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  const showreelVideoUrl = 'https://assets.mixkit.co/videos/preview/mixkit-car-traveling-at-night-through-a-futuristic-tunnel-40224-large.mp4';

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const current = videoRef.current.currentTime;
    const total = videoRef.current.duration || 1;
    setProgress((current / total) * 100);
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!videoRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    videoRef.current.currentTime = pos * (videoRef.current.duration || 1);
  };

  const handleFullscreen = () => {
    if (!videoRef.current) return;
    if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen();
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-hidden">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/95 backdrop-blur-2xl"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 30 }}
          transition={{ type: 'spring', damping: 26, stiffness: 320 }}
          className="relative w-full max-w-5xl bg-[#09090D] border border-red-500/40 rounded-3xl overflow-hidden shadow-2xl z-10"
        >
          {/* Top Bar in Michroma */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-black/60">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-[#FF1744] shadow-glow-red animate-pulse" />
              <span className="font-display text-xs sm:text-sm tracking-wider text-white">
                ROHAN // VIDEO EDITING REEL
              </span>
              <span className="hidden sm:inline-block px-2.5 py-0.5 rounded text-[10px] font-mono bg-red-950/60 text-red-300 border border-red-500/30">
                4K 60FPS • MASTER CUT
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full text-neutral-400 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
              aria-label="Close showreel"
            >
              <FaTimes className="w-4 h-4" />
            </button>
          </div>

          {/* Video Player */}
          <div className="relative aspect-video bg-black group overflow-hidden">
            <video
              ref={videoRef}
              src={showreelVideoUrl}
              autoPlay
              loop
              playsInline
              onTimeUpdate={handleTimeUpdate}
              onClick={togglePlay}
              className="w-full h-full object-cover cursor-pointer"
            />

            {/* Custom Cinema Controls Bar */}
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/95 via-black/50 to-transparent flex flex-col gap-2 transition-opacity duration-300">

              {/* Seekable Progress Bar */}
              <div
                onClick={handleSeek}
                className="w-full h-2 rounded-full bg-white/20 hover:h-3 transition-all cursor-pointer relative overflow-hidden"
              >
                <div
                  className="h-full bg-gradient-to-r from-[#B00020] via-[#FF1744] to-[#FF2A40] shadow-glow-red"
                  style={{ width: `${progress}%` }}
                />
              </div>

              {/* Bottom Control Buttons */}
              <div className="flex items-center justify-between pt-1">
                <div className="flex items-center gap-4">
                  <button
                    onClick={togglePlay}
                    className="p-2 rounded-full bg-[#FF1744] text-white hover:bg-[#FF2A40] transition-colors shadow-glow-red-sm"
                  >
                    {isPlaying ? <FaPause className="w-3.5 h-3.5 fill-white" /> : <FaPlay className="w-3.5 h-3.5 fill-white ml-0.5" />}
                  </button>

                  <button
                    onClick={toggleMute}
                    className="p-2 text-neutral-300 hover:text-white transition-colors"
                  >
                    {isMuted ? <FaVolumeMute className="w-4 h-4 text-red-400" /> : <FaVolumeUp className="w-4 h-4" />}
                  </button>

                  {/* Audio EQ reactive simulation */}
                  <div className="hidden sm:flex items-center gap-1 h-4">
                    {[12, 20, 8, 24, 16, 28, 10, 18].map((h, i) => (
                      <span
                        key={i}
                        className="w-1 bg-[#FF1744]/70 rounded-full animate-pulse"
                        style={{
                          height: isPlaying ? `${h}px` : '4px',
                          animationDuration: `${0.4 + i * 0.1}s`,
                        }}
                      />
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono text-neutral-400">
                    MASTER: REC.709 DCI
                  </span>
                  <button
                    onClick={handleFullscreen}
                    className="p-2 text-neutral-300 hover:text-white transition-colors"
                    aria-label="Fullscreen"
                  >
                    <FaExpand className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Showreel Breakdown & Credits */}
          <div className="p-6 bg-[#0B0B10] border-t border-white/10 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs font-display">
              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 space-y-1">
                <div className="text-neutral-500 text-[10px]">STYLE / GENRE</div>
                <div className="text-white text-xs">Narrative &amp; Commercial</div>
              </div>
              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 space-y-1">
                <div className="text-neutral-500 text-[10px]">SOFTWARE PIPELINE</div>
                <div className="text-white text-xs">Premiere + DaVinci</div>
              </div>
              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 space-y-1">
                <div className="text-neutral-500 text-[10px]">SOUND SPECS</div>
                <div className="text-white text-xs">5.1 Spatial Audio Foley</div>
              </div>
              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 space-y-1">
                <div className="text-neutral-500 text-[10px]">ASPECT RATIO</div>
                <div className="text-[#FF1744] text-xs">2.39:1 Anamorphic</div>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-red-950/20 border border-red-500/20 font-sans text-xs text-neutral-400">
              💡 Update showreel URL in <code className="text-red-400 font-mono">ShowreelModal.tsx</code> to feature your own video.
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
