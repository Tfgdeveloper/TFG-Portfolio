import { motion } from 'framer-motion';
import { useEffect, useRef, useState, useMemo } from 'react';

// BlurText Component (unchanged core logic)
const buildKeyframes = (from, steps) => {
  const keys = new Set([...Object.keys(from), ...steps.flatMap(s => Object.keys(s))]);
  const keyframes = {};
  keys.forEach(k => {
    keyframes[k] = [from[k], ...steps.map(s => s[k])];
  });
  return keyframes;
};

const BlurText = ({
  text = '',
  delay = 200,
  className = '',
  animateBy = 'words',
  direction = 'top',
  threshold = 0.1,
  rootMargin = '0px',
  animationFrom,
  animationTo,
  easing = t => t,
  onAnimationComplete,
  stepDuration = 0.35,
  as: Component = 'span'
}) => {
  const elements = animateBy === 'words' ? text.split(' ') : text.split('');
  const [inView, setInView] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(ref.current);
        }
      },
      { threshold, rootMargin }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  const defaultFrom = useMemo(
    () => direction === 'top' 
      ? { filter: 'blur(10px)', opacity: 0, y: -50 } 
      : { filter: 'blur(10px)', opacity: 0, y: 50 },
    [direction]
  );

  const defaultTo = useMemo(
    () => [
      { filter: 'blur(5px)', opacity: 0.5, y: direction === 'top' ? 5 : -5 },
      { filter: 'blur(0px)', opacity: 1, y: 0 }
    ],
    [direction]
  );

  const fromSnapshot = animationFrom ?? defaultFrom;
  const toSnapshots = animationTo ?? defaultTo;
  const stepCount = toSnapshots.length + 1;
  const totalDuration = stepDuration * (stepCount - 1);
  const times = Array.from({ length: stepCount }, (_, i) => 
    stepCount === 1 ? 0 : i / (stepCount - 1)
  );

  return (
    <Component ref={ref} className={`blur-text ${className} flex flex-wrap`}>
      {elements.map((segment, index) => {
        const animateKeyframes = buildKeyframes(fromSnapshot, toSnapshots);
        const spanTransition = {
          duration: totalDuration,
          times,
          delay: (index * delay) / 1000,
          ease: easing
        };

        return (
          <motion.span
            className="inline-block will-change-[transform,filter,opacity]"
            key={index}
            initial={fromSnapshot}
            animate={inView ? animateKeyframes : fromSnapshot}
            transition={spanTransition}
            onAnimationComplete={index === elements.length - 1 ? onAnimationComplete : undefined}
          >
            {segment === ' ' ? '\u00A0' : segment}
            {animateBy === 'words' && index < elements.length - 1 && '\u00A0'}
          </motion.span>
        );
      })}
    </Component>
  );
};

// Main Dynamic Heading Component
const AnimatedHeading = ({
  segments = [],
  baseClassName = '',
  highlightClassName = "highlightedtext px-[20px]  md:px-[30px] rounded-[10px]",
  defaultDelay = 150,
  defaultAnimateBy = 'words',
  defaultDirection = 'top',
  defaultStepDuration = 0.35,
  lineBreakClassName = 'w-full'
}) => {
  let globalIndex = 0;

  const getDelay = (customDelay) => {
    const delay = customDelay ?? defaultDelay;
    const currentDelay = globalIndex * delay;
    globalIndex++;
    return currentDelay;
  };

  return (
    <h1 className={baseClassName}>
      {segments.map((segment, idx) => {
        // Handle line breaks
        if (segment.type === 'break') {
          return <br key={`break-${idx}`} className={lineBreakClassName} />;
        }

        const {
          text,
          highlight = false,
          delay,
          animateBy,
          direction,
          stepDuration,
          animationFrom,
          animationTo,
          className = '',
          as = 'span'
        } = segment;

        const computedDelay = getDelay(delay);

        const blurTextProps = {
          text,
          delay: delay ?? defaultDelay,
          animateBy: animateBy ?? defaultAnimateBy,
          direction: direction ?? defaultDirection,
          stepDuration: stepDuration ?? defaultStepDuration,
          animationFrom,
          animationTo,
          className: `inline-flex ${className}`,
          as
        };

        if (highlight) {
          return (
            <motion.span
              key={`seg-${idx}`}
              initial={{ opacity: 0, filter: 'blur(20px)', scale: 0.8 }}
              animate={{ opacity: 1, filter: 'blur(0px)', scale: 1 }}
              transition={{
                delay: computedDelay / 1000,
                duration: 0.6,
                type: 'spring',
                stiffness: 100
              }}
              className={`inline-block ${highlightClassName} mx-2`}
            >
              <BlurText {...blurTextProps} className="inline-flex justify-center text-white" />
            </motion.span>
          );
        }

        return (
          <BlurText 
            key={`seg-${idx}`} 
            {...blurTextProps} 
          />
        );
      })}
    </h1>
  );
};

export { BlurText, AnimatedHeading };
export default AnimatedHeading;