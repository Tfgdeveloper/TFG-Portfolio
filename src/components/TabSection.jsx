// Tabs.jsx
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Main Tabs Container
export const Tabs = ({ 
  children, 
  className = '',
  showSearch = false,
  searchPlaceholder = 'Search...',
  onSearch = () => {}
}) => {
  const [activeTab, setActiveTab] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Filter valid TabSection children
  const tabSections = Array.isArray(children) 
  ? children.filter(child => child?.props?.name) // Check for name prop instead
  : children?.props?.name ? [children] : [];

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    onSearch(value);
  };

  return (
    <div className={`flex flex-col lg:flex-row gap-8 lg:gap-12 ${className}`}>
      {/* Left Side - Search + Tab Buttons */}
      <div className="tabscard lg:w-[340px] h-[475px] lg:flex-shrink-0 bg-white p-[2px]" style={{
        clipPath: "polygon(0% 0%, 85% 0%, 100% 10%, 100% 100%, 35% 100%, 28% 95%, 0% 95%)"
        }}>
            <div className="w-full h-full lg:flex-shrink-0 bg-[#0A0A0A] p-0" style={{
        clipPath: "polygon(0% 0%, 85% 0%, 100% 10%, 100% 100%, 35% 100%, 28% 95%, 0% 95%)"
        }}>
            <div className="tabsinner w-full h-full lg:flex-shrink-0 bg-white/10 px-[30px] pt-[30px] pb-[60px]" style={{
        clipPath: "polygon(0% 0%, 85% 0%, 100% 10%, 100% 100%, 35% 100%, 28% 95%, 0% 95%)"
        }}>
        <div className="lg:sticky lg:top-32 flex flex-col gap-6">
          
          {/* Search Bar */}
          {showSearch && (
            <div className='tabscard rounded-xl p-[2px]'>
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
              <motion.button
                key={index}
                onClick={() => setActiveTab(index)}
                className={`relative py-[15px] px-[10px] text-left transition-all duration-300 ${
                  activeTab === index 
                    ? 'text-white' 
                    : 'text-white/50 hover:text-white/70'
                }`}
                whileHover={{ x: activeTab === index ? 0 : 4 }}
                whileTap={{ scale: 0.98 }}
              >
                {activeTab === index && (
                  <motion.div
                    layoutId="activeTabBg"
                    className="absolute inset-0 border-b border-white"
                    transition={{ type: 'spring', bounce: 0.15, duration: 0.5 }}
                  />
                )}
                <span className="relative z-10 text-[16px] tracking-[-0.64px] font-medium">
                  {section.props.name}
                </span>
              </motion.button>
            ))}
          </div>
        </div>
        </div>
        </div>
      </div>

      {/* Right Side - Content */}
      <div className="flex-1 min-h-[400px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className={tabSections[activeTab]?.props.className || ''}
          >
            {tabSections[activeTab]?.props.children}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

// Individual Tab Section
export const TabSection = ({ name, className = '', children }) => {
  return (
    <div className={className}>
      {children}
    </div>
  );
};