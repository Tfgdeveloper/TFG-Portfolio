import { motion } from 'framer-motion';
import { useState, useEffect, useMemo, useCallback, memo } from 'react';

const LogoItem = memo(function LogoItem({ logo, logoWidth, index }) {
  return (
    <div
      className="flex-shrink-0 flex items-center justify-center transition-opacity duration-300 hover:opacity-100 opacity-50 will-change-transform"
      style={{
        width: logoWidth,
        height: logoWidth * 0.5,
        transform: 'translateZ(0)',
      }}
    >
      <img 
        src={logo.src} 
        alt={logo.name}
        className="max-w-full max-h-full object-contain"
        draggable="false"
        loading="lazy"
      />
    </div>
  );
});

const LogoLoop = memo(function LogoLoop({ logos = [], speed = 30, className = '' }) {
  const [isPaused, setIsPaused] = useState(false);
  const [windowWidth, setWindowWidth] = useState(1200);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    
    window.addEventListener('resize', handleResize, { passive: true });
    handleResize();
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Memoized responsive values
  const { gap, logoWidth, duplicatedLogos, totalWidth } = useMemo(() => {
    const getGap = () => {
      if (windowWidth < 640) return 20;
      if (windowWidth < 1024) return 50;
      return 75;
    };

    const gap = getGap();
    const logoWidth = windowWidth < 640 ? 100 : windowWidth < 1024 ? 130 : 160;
    const duplicatedLogos = [...logos, ...logos, ...logos];
    const totalWidth = logos.length * (logoWidth + gap);

    return { gap, logoWidth, duplicatedLogos, totalWidth };
  }, [windowWidth, logos]);

  const handleMouseEnter = useCallback(() => setIsPaused(true), []);
  const handleMouseLeave = useCallback(() => setIsPaused(false), []);

  // Memoized animation props
  const animateProps = useMemo(() => ({
    x: isPaused ? undefined : [0, -totalWidth]
  }), [isPaused, totalWidth]);

  const transitionProps = useMemo(() => ({
    x: {
      repeat: Infinity,
      repeatType: "loop",
      duration: speed,
      ease: "linear",
    },
  }), [speed]);

  return (
    <div 
      className={`relative w-full overflow-hidden ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        className="flex items-center will-change-transform"
        style={{ 
          gap: `${gap}px`,
          transform: 'translateZ(0)',
          backfaceVisibility: 'hidden',
        }}
        animate={animateProps}
        transition={transitionProps}
      >
        {duplicatedLogos.map((logo, index) => (
          <LogoItem 
            key={`${logo.id}-${index}`}
            logo={logo}
            logoWidth={logoWidth}
            index={index}
          />
        ))}
      </motion.div>
    </div>
  );
});

export default LogoLoop;