// LogoLoop.jsx
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const LogoLoop = ({ logos = [], speed = 30, className = '' }) => {
  const [isPaused, setIsPaused] = useState(false);
  const [windowWidth, setWindowWidth] = useState(1200);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Responsive gap
  const getGap = () => {
    if (windowWidth < 640) return 20;      // Mobile
    if (windowWidth < 1024) return 50;     // Tablet
    return 75;                              // Desktop
  };

  const gap = getGap();
  const logoWidth = windowWidth < 640 ? 100 : windowWidth < 1024 ? 130 : 160;
  const duplicatedLogos = [...logos, ...logos, ...logos];

  return (
    <div 
      className={`relative w-full overflow-hidden  ${className}`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Edge gradients */}
      
      
      <motion.div
        className="flex items-center"
        style={{ gap: `${gap}px` }}
        animate={{
          x: isPaused ? undefined : [0, -((logos.length * (logoWidth + gap)))]
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: speed,
            ease: "linear",
          },
        }}
      >
        {duplicatedLogos.map((logo, index) => (
          <div
            key={`${logo.id}-${index}`}
            className="flex-shrink-0 flex items-center justify-center transition-opacity duration-300 hover:opacity-100 opacity-50"
            style={{
              width: logoWidth,
              height: logoWidth * 0.5,
            }}
          >
            <img 
              src={logo.src} 
              alt={logo.name}
              className="max-w-full max-h-full object-contain"
              draggable="false"
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default LogoLoop;