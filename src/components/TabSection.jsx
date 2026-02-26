import { useState, useCallback, useMemo, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Memoized tab button
const TabButton = memo(function TabButton({
  section,
  index,
  isActive,
  onClick
}) {
  const handleClick = useCallback(() => {
    onClick(index);
  }, [index, onClick]);

  return (
    <motion.button
      onClick={handleClick}
      className={`relative py-[15px] px-[10px] text-left transition-all duration-300 will-change-transform ${
        isActive 
          ? 'text-white' 
          : 'text-white/50 hover:text-white/70'
      }`}
      whileHover={{ x: isActive ? 0 : 4 }}
      whileTap={{ scale: 0.98 }}
      style={{ transform: 'translateZ(0)' }}
    >
      {isActive && (
        <motion.div
          layoutId="activeTabBg"
          className="absolute inset-0 border-b border-white will-change-transform"
          transition={{ type: 'spring', bounce: 0.15, duration: 0.5 }}
          style={{ transform: 'translateZ(0)' }}
        />
      )}
      <span className="relative z-10 text-[16px] tracking-[-0.64px] font-medium">
        {section.props.name}
      </span>
    </motion.button>
  );
});

// Memoized content panel
const TabContent = memo(function TabContent({ 
  activeTab, 
  className, 
  children 
}) {
  return (
    <motion.div
      key={activeTab}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className={`${className} will-change-transform`}
      style={{ transform: 'translateZ(0)' }}
    >
      {children}
    </motion.div>
  );
});

// Main Tabs Container
export const Tabs = memo(function Tabs({ 
  children, 
  className = '',
  showSearch = false,
  searchPlaceholder = 'Search...',
  onSearch = () => {}
}) {
  const [activeTab, setActiveTab] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Filter valid TabSection children
  const tabSections = useMemo(() => {
    if (Array.isArray(children)) {
      return children.filter(child => child?.props?.name);
    }
    return children?.props?.name ? [children] : [];
  }, [children]);

  const handleSearch = useCallback((e) => {
    const value = e.target.value;
    setSearchQuery(value);
    onSearch(value);
  }, [onSearch]);

  const handleTabClick = useCallback((index) => {
    setActiveTab(index);
  }, []);

  const activeSection = tabSections[activeTab];

  return (
    <div 
      className={`flex flex-col lg:flex-row gap-8 lg:gap-12 ${className}`}
      style={{ transform: 'translateZ(0)' }}
    >
      {/* Left Side - Search + Tab Buttons */}
      <div 
        className="tabscard lg:w-[340px] h-[475px] lg:flex-shrink-0 bg-white p-[2px] will-change-transform" 
        style={{
          clipPath: "polygon(0% 0%, 85% 0%, 100% 10%, 100% 100%, 35% 100%, 28% 95%, 0% 95%)",
          transform: 'translateZ(0)',
          backfaceVisibility: 'hidden'
        }}
      >
        <div 
          className="w-full h-full lg:flex-shrink-0 bg-[#0A0A0A] p-0 will-change-transform" 
          style={{
            clipPath: "polygon(0% 0%, 85% 0%, 100% 10%, 100% 100%, 35% 100%, 28% 95%, 0% 95%)",
            transform: 'translateZ(0)',
            backfaceVisibility: 'hidden'
          }}
        >
          <div 
            className="tabsinner w-full h-full lg:flex-shrink-0 bg-white/10 px-[30px] pt-[30px] pb-[60px] will-change-transform" 
            style={{
              clipPath: "polygon(0% 0%, 85% 0%, 100% 10%, 100% 100%, 35% 100%, 28% 95%, 0% 95%)",
              transform: 'translateZ(0)',
              backfaceVisibility: 'hidden'
            }}
          >
            <div className="lg:sticky lg:top-32 flex flex-col gap-6">
              
              {/* Search Bar */}
              {showSearch && (
                <div className='tabscard rounded-xl p-[2px] will-change-transform' style={{ transform: 'translateZ(0)' }}>
                  <div className='bg-[#0A0A0A] rounded-xl'>
                    <div className="relative tabsinner rounded-xl">
                      <svg 
                        className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={2} 
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
                        />
                      </svg>
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={handleSearch}
                        placeholder={searchPlaceholder}
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder-white/40 focus:outline-none focus:border-[#FF4A4A]/50 focus:bg-white/10 transition-all duration-300"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Tab Buttons */}
              <div className="flex flex-col gap-0">
                {tabSections.map((section, index) => (
                  <TabButton
                    key={section.props.name || index}
                    section={section}
                    index={index}
                    isActive={activeTab === index}
                    onClick={handleTabClick}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Content */}
      <div className="flex-1 min-h-[400px]">
        <AnimatePresence mode="wait">
          {activeSection && (
            <TabContent
              activeTab={activeTab}
              className={activeSection.props.className || ''}
            >
              {activeSection.props.children}
            </TabContent>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
});

// Individual Tab Section
export const TabSection = memo(function TabSection({ name, className = '', children }) {
  return (
    <div className={className}>
      {children}
    </div>
  );
});