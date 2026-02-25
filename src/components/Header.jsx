import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import DualStateButton2 from './DualStateButton2';


const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const menuLinks = [
    { name: 'Home', href: '/#about' },
    { name: 'Services', href: '/#services' },
    { name: 'Work', href: '/#work' },
    { name: 'FAQs', href: '/#faqs' },
  ];

  return (
    <motion.div 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ 
        type: 'spring',
        damping: 25,
        stiffness: 200,
        duration: 0.8 
      }}
      className='relative w-full flex bg-transparent py-[20px] md:px-[40px] px-[20px] border-b-[2px] border-[#535353] z-50 '
    >
      <div className='w-full max-w-[1440px] mx-auto flex justify-between items-center'>
      

        {/* Desktop Menu */}
        <div className="order-1 hidden md:flex items-center">
          <div className="flex text-[16px] tracking-[-0.64px]">
            {menuLinks.map((link, index) => (
              <motion.a 
                key={link.name}
                href={link.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  delay: 0.4 + (index * 0.1),
                  duration: 0.5,
                  type: 'spring',
                  stiffness: 50
                }}
                whileHover={{ 
                  scale: 1.05,
                  transition: { duration: 0.2 }
                }}
                className="relative px-[24px] py-[12px] text-white/50 group"
              >
                <span className="relative z-10 hover:bg-gradient-to-r hover:from-[#FF4A4A] hover:to-[#FF8A33] hover:bg-clip-text hover:text-transparent transition-all duration-300">{link.name}</span>
                
                <span className="absolute bottom-2 left-6 right-6 h-[2px] bg-gradient-to-r from-[#FF4A4A] to-[#FF8A33] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              </motion.a>
            ))}
          </div>
        </div>

        {/* Desktop Button */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className=" order-2"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <DualStateButton2
              title="Request a demo!"
              href=""  
            />
          </motion.div>
        </motion.div>

        {/* Mobile Menu Button */}
        <div className="order-1 md:hidden z-50">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white focus:outline-none text-[28px] relative w-8 h-8"
          >
            <motion.span
              animate={{ rotate: isOpen ? 90 : 0, opacity: isOpen ? 0 : 1 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              ☰
            </motion.span>
            <motion.span
              animate={{ rotate: isOpen ? 0 : -90, opacity: isOpen ? 1 : 0 }}
              transition={{ duration: 0.2 }}
              className="absolute left-55 inset-0 flex items-center justify-center"
            >
              ✕
            </motion.span>
          </button>
        </div>

        {/* Mobile Menu - Slides from Left */}
        <AnimatePresence>
          {isOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                onClick={() => setIsOpen(false)}
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
              />
              
              {/* Sidebar */}
              <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: 0 }}
                exit={{ x: '-100%' }}
                transition={{ 
                  type: 'spring',
                  damping: 30,
                  stiffness: 300
                }}
                className="fixed top-0 left-0 h-full w-[280px] bg-[#0A0A0A] z-50 md:hidden shadow-2xl"
              >
                <div className="flex justify-end p-6">
                  
                </div>

                <motion.div className="flex flex-col px-8 py-4 space-y-2">
                  {menuLinks.map((link, index) => (
                    <motion.a
                      key={link.name}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ 
                        delay: 0.1 + (index * 0.05),
                        duration: 0.3
                      }}
                      className="text-white text-[20px] font-medium py-3 border-b border-white/10 hover:text-[#FF8A33] transition-colors"
                    >
                      {link.name}
                    </motion.a>
                  ))}
                  
                  
                </motion.div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default Navbar;