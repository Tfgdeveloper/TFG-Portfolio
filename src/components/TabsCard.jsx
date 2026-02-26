import { memo, useCallback, useRef } from 'react';

const clipPaths = {
  default: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
  hover: "polygon(0% 0%, 95% 0%, 100% 5%, 100% 100%, 50% 100%, 45% 89%, 0% 89%)"
};

const TabsCard = memo(function TabsCard({ children, className = "" }) {
  const outerRef = useRef(null);
  const middleRef = useRef(null);
  const innerRef = useRef(null);

  const handleMouseEnter = useCallback(() => {
    if (outerRef.current) outerRef.current.style.clipPath = clipPaths.hover;
    if (middleRef.current) middleRef.current.style.clipPath = clipPaths.hover;
    if (innerRef.current) innerRef.current.style.clipPath = clipPaths.hover;
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (outerRef.current) outerRef.current.style.clipPath = clipPaths.default;
    if (middleRef.current) middleRef.current.style.clipPath = clipPaths.default;
    if (innerRef.current) innerRef.current.style.clipPath = clipPaths.default;
  }, []);

  return (
    <div
      ref={outerRef}
      className={`relative servicescard p-[2px] h-[400px] transition-all duration-500 will-change-transform ${className}`}
      style={{
        clipPath: clipPaths.default,
        transform: 'translateZ(0)',
        backfaceVisibility: 'hidden'
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        ref={middleRef}
        className={`relative bg-[#0A0A0A] p-0 w-full h-full transition-all duration-500 ${className}`}
        style={{
          clipPath: clipPaths.default,
          transform: 'translateZ(0)',
          backfaceVisibility: 'hidden'
        }}
      >
        <div
          ref={innerRef}
          className={`servicesinner relative px-[24px] py-[24px] w-full h-full transition-all duration-500 ${className}`}
          style={{
            clipPath: clipPaths.default,
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

export default TabsCard;