import { useEffect, useState, useCallback, useRef, memo } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

const CustomCursor = memo(function CustomCursor() {
  const [cursorText, setCursorText] = useState('');
  const [isHovering, setIsHovering] = useState(false);
  const [cursorVariant, setCursorVariant] = useState('default');
  
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springConfig = useRef({ damping: 25, stiffness: 400 }).current;
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  const handleMouseMove = useCallback((e) => {
    cursorX.set(e.clientX);
    cursorY.set(e.clientY);
  }, [cursorX, cursorY]);

  const handleMouseEnter = useCallback((e) => {
    const target = e.target;
    const text = target.getAttribute('data-cursor');
    const variant = target.getAttribute('data-cursor-variant') || 'default';
    setCursorText(text);
    setCursorVariant(variant);
    setIsHovering(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovering(false);
    setCursorText('');
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    const sections = document.querySelectorAll('[data-cursor]');
    
    sections.forEach((section) => {
      section.addEventListener('mouseenter', handleMouseEnter, { passive: true });
      section.addEventListener('mouseleave', handleMouseLeave, { passive: true });
    });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      sections.forEach((section) => {
        section.removeEventListener('mouseenter', handleMouseEnter);
        section.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, [handleMouseMove, handleMouseEnter, handleMouseLeave]);

  const variants = useRef({
    view: {
      width: 'auto',
      height: 'auto',
      borderRadius: 125.52,
      border: '1.255px solid #FFF',
      background: 'linear-gradient(264deg, rgba(255, 220, 220, 0.40) 10.17%, rgba(255, 151, 151, 0.40) 60.22%, rgba(255, 220, 220, 0.40) 103.12%)',
      boxShadow: '0 46.264px 17.548px 0 rgba(255, 106, 106, 0.02), 0 25.525px 15.953px 0 rgba(255, 106, 106, 0.08), 0 11.167px 11.167px 0 rgba(255, 106, 106, 0.13), 0 3.191px 6.381px 0 rgba(255, 106, 106, 0.15)',
      backdropFilter: 'blur(5.6483941078186035px)',
      padding: '7.5px',
    }
  }).current;

  return (
    <motion.div
      className="fixed top-5 left-22 pointer-events-none z-[9998] flex items-center justify-center whitespace-nowrap will-change-transform"
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
        translateX: '-50%',
        translateY: '-50%',
        transform: 'translateZ(0)',
        backfaceVisibility: 'hidden',
      }}
      animate={isHovering ? cursorVariant : 'default'}
      variants={variants}
      transition={{ type: 'spring', damping: 20, stiffness: 300 }}
    >
      {isHovering && cursorVariant === 'view' && (
        <motion.span
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          className="text-white text-[14px] font-medium drop-shadow-md will-change-transform"
          style={{ transform: 'translateZ(0)' }}
        >
          {cursorText}
        </motion.span>
      )}
    </motion.div>
  );
});

export default CustomCursor;