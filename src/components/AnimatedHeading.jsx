import { motion } from 'framer-motion';
import { useEffect, useRef, useState, useMemo, memo, useCallback } from 'react';

// Memoized keyframes builder
const buildKeyframes = (from, steps) => {
  const keys = new Set([...Object.keys(from), ...steps.flatMap(s => Object.keys(s))]);
  const keyframes = {};
  keys.forEach(k => {
    keyframes[k] = [from[k], ...steps.map(s => s[k])];
  });
  return keyframes;
};

// Memoized individual blur span
const BlurSpan = memo(function BlurSpan({
  segment,
  index,
  fromSnapshot,
  toSnapshots,
  delay,
  stepDuration,
  easing,
  totalDuration,
  times,
  inView,
  onAnimationComplete,
  animateBy,
  elementsLength
}) {
  const animateKeyframes = useMemo(
    () => buildKeyframes(fromSnapshot, toSnapshots),
    [fromSnapshot, toSnapshots]
  );

  const transition = useMemo(
    () => ({
      duration: totalDuration,
      times,
      delay: (index * delay) / 1000,
      ease: easing
    }),
    [totalDuration, times, index, delay, easing]
  );

  const handleAnimationComplete = useCallback(() => {
    if (index === elementsLength - 1) {
      onAnimationComplete?.();
    }
  }, [index, elementsLength, onAnimationComplete]);

  return (
    <motion.span
      className="inline-block will-change-transform"
      style={{
        willChange: 'transform, opacity',
        transform: 'translateZ(0)',
        backfaceVisibility: 'hidden'
      }}
      initial={fromSnapshot}
      animate={inView ? animateKeyframes : fromSnapshot}
      transition={transition}
      onAnimationComplete={handleAnimationComplete}
    >
      {segment === ' ' ? '\u00A0' : segment}
      {animateBy === 'words' && index < elementsLength - 1 && '\u00A0'}
    </motion.span>
  );
});

const BlurText = memo(function BlurText({
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
}) {
  const elements = useMemo(
    () => (animateBy === 'words' ? text.split(' ') : text.split('')),
    [text, animateBy]
  );
  
  const [inView, setInView] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;
    const element = ref.current;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(element);
        }
      },
      { threshold, rootMargin }
    );
    
    observer.observe(element);
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
  const times = useMemo(
    () => Array.from({ length: stepCount }, (_, i) => 
      stepCount === 1 ? 0 : i / (stepCount - 1)
    ),
    [stepCount]
  );

  return (
    <Component 
      ref={ref} 
      className={`blur-text ${className} flex flex-wrap`} 
      style={{ transform: 'translateZ(0)' }}
    >
      {elements.map((segment, index) => (
        <BlurSpan
          key={index}
          segment={segment}
          index={index}
          fromSnapshot={fromSnapshot}
          toSnapshots={toSnapshots}
          delay={delay}
          stepDuration={stepDuration}
          easing={easing}
          totalDuration={totalDuration}
          times={times}
          inView={inView}
          onAnimationComplete={onAnimationComplete}
          animateBy={animateBy}
          elementsLength={elements.length}
        />
      ))}
    </Component>
  );
});

// Memoized segment renderer
const SegmentRenderer = memo(function SegmentRenderer({
  segment,
  idx,
  computedDelay,
  defaultDelay,
  defaultAnimateBy,
  defaultDirection,
  defaultStepDuration,
  highlightClassName
}) {
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
        style={{ 
          willChange: 'transform, opacity',
          transform: 'translateZ(0)',
          backfaceVisibility: 'hidden'
        }}
      >
        <BlurText {...blurTextProps} className="inline-flex justify-center text-white" />
      </motion.span>
    );
  }

  return <BlurText key={`seg-${idx}`} {...blurTextProps} />;
});

// Main Dynamic Heading Component
const AnimatedHeading = memo(function AnimatedHeading({
  segments = [],
  baseClassName = '',
  highlightClassName = "highlightedtext px-[20px] md:px-[30px] rounded-[10px]",
  defaultDelay = 150,
  defaultAnimateBy = 'words',
  defaultDirection = 'top',
  defaultStepDuration = 0.35,
  lineBreakClassName = 'w-full'
}) {
  const computedSegments = useMemo(() => {
    let globalIndex = 0;
    return segments.map((segment) => {
      if (segment.type === 'break') return { ...segment, computedDelay: 0 };
      const delay = segment.delay ?? defaultDelay;
      const computedDelay = globalIndex * delay;
      globalIndex++;
      return { ...segment, computedDelay };
    });
  }, [segments, defaultDelay]);

  return (
    <h1 className={baseClassName} style={{ transform: 'translateZ(0)' }}>
      {computedSegments.map((segment, idx) => {
        if (segment.type === 'break') {
          return <br key={`break-${idx}`} className={lineBreakClassName} />;
        }

        return (
          <SegmentRenderer
            key={`seg-${idx}`}
            segment={segment}
            idx={idx}
            computedDelay={segment.computedDelay}
            defaultDelay={defaultDelay}
            defaultAnimateBy={defaultAnimateBy}
            defaultDirection={defaultDirection}
            defaultStepDuration={defaultStepDuration}
            highlightClassName={highlightClassName}
          />
        );
      })}
    </h1>
  );
});

export { BlurText, AnimatedHeading };
export default AnimatedHeading;