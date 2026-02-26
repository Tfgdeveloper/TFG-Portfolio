import { memo, useCallback } from 'react';

const AngledCard = memo(function AngledCard({ children, className = "" }) {
  const handleMouseEnter = useCallback((e) => {
    const clipPath = `polygon(0% 0%, 95% 0%, 100% 5%, 100% 100%, 25% 100%, 20% 92%, 0% 92%)`;
    e.currentTarget.style.clipPath = clipPath;
    const inner = e.currentTarget.firstElementChild;
    const innerMost = inner?.firstElementChild;
    if (inner) inner.style.clipPath = clipPath;
    if (innerMost) innerMost.style.clipPath = clipPath;
  }, []);

  const handleMouseLeave = useCallback((e) => {
    const clipPath = "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)";
    e.currentTarget.style.clipPath = clipPath;
    const inner = e.currentTarget.firstElementChild;
    const innerMost = inner?.firstElementChild;
    if (inner) inner.style.clipPath = clipPath;
    if (innerMost) innerMost.style.clipPath = clipPath;
  }, []);

  const baseClipPath = "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)";

  return (
    <div
      className={`relative servicescard p-[2px] h-[360px] transition-all duration-500 will-change-transform ${className}`}
      style={{
        clipPath: baseClipPath,
        transform: 'translateZ(0)',
        backfaceVisibility: 'hidden'
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className={`relative bg-[#0A0A0A] p-0 w-full h-full transition-all duration-500 ${className}`}
        style={{
          clipPath: baseClipPath,
          transform: 'translateZ(0)',
          backfaceVisibility: 'hidden'
        }}
      >
        <div
          className={`servicesinner relative px-[24px] py-[32px] w-full h-full transition-all duration-500 ${className}`}
          style={{
            clipPath: baseClipPath,
            transform: 'translateZ(0)',
            backfaceVisibility: 'hidden'
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
});

export default AngledCard;