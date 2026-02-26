import React from 'react'

import DualStateButton2 from '../components/DualStateButton2'
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedHeading from '../components/AnimatedHeading';
import CustomCursor from '../components/CustomCursor';
import LogoLoop from '../components/LogoLoop';
import { Tabs, TabSection } from '../components/TabSection';
import TabsCard from '../components/TabsCard';
import ServicesSection from '../components/ServicesSection';
import PortfolioTabs from '../components/PortfolioTabs';

const logos = [
  { id: 1, name: 'Logo1', src: 'images/logo.svg' },
  { id: 2, name: 'Logo2', src: 'images/logo2.svg' },
  { id: 3, name: 'Logo3', src: 'images/logo3.svg' },
  { id: 4, name: 'Logo4', src: 'images/logo4.svg' },
  { id: 5, name: 'Logo5', src: 'images/logo5.svg' },
];
const Home = () => {
    const handleSearch = (query) => {
    console.log('Searching:', query);
    // Add your search logic here
  };
  return (
    <div>
     <CustomCursor />
      
       <motion.div
        data-cursor="TFG Solution" 
        data-cursor-variant="view"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5 ,  }}
        className="relative"
        >
        <div className='relative w-screen h-[850px] md:px-[40px] px-[20px]  flex flex-col justify-between items-center '>
             <img src='images/shadow.png'className='w-full h-auto absolute md:-bottom-45 -bottom-5'/>
             <img src='images/squars.png'className='hidden md:flex w-auto md:h-full absolute -top-23'/>
             <img src='images/mobilesquars.png'className='md:hidden flex w-auto h-full absolute -top-23'/>
            <div className=" relative h-full w-full max-w-[1440px] mx-auto border-x-[2px] border-[#535353]">
                <img 
                    src="images/Frame.png" 
                    className="absolute -top-[12.75px] -left-[12.75px] z-20"
                />
                <img 
                    src="images/Frame.png" 
                    className="absolute -top-[12.75px] -right-[12.75px] z-20"
                />
                <img 
                    src="images/Frame.png" 
                    className="absolute -bottom-[12.75px] -left-[12.75px] z-20"
                />
                <img 
                    src="images/Frame.png" 
                    className="absolute -bottom-[12.75px] -right-[12.75px] z-20"
                />
                <div className='relative w-auto h-full flex flex-col gap-[40px] md:gap-[70px] justify-center items-center'>
                 <AnimatedHeading
                    segments={[
                        { text: "A New Era" },
                        { text: "Begins", highlight: true, animateBy: 'characters', delay: 100 },
                        { type: 'break' },
                        { text: "Now!", delay: 200 }
                    ]}
                    baseClassName="text-[64px] md:text-[82px] text-white text-center leading-[110px]"
                    />
                    
                    <motion.img 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.75 ,  }}
                    src="images/Frame 1618872631.svg" 
                    className="hidden md:flex float-animation absolute left-25 top-2/5"
                />
                <motion.img 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.75 ,  }}
                    
                    src="images/ourteam.png" 
                    className="hidden md:flex  float-animation absolute right-25 top-2/5"
                />
                
                    
                    
                    <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
                    className='flex md:flex-row flex-col  gap-[20px]'
                    >
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <DualStateButton2
                        title="Request a demo!"
                        href=""  
                        />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.35, duration: 0.5 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <DualStateButton2
                        title="View Work"
                        href=""  
                        />
                    </motion.div>
                    </motion.div>
                    <motion.p 
                    initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
                    whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)'  }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.5, delay: 0, ease: 'easeOut' }}
                    className='md:w-[650px] text-white/50 text-[16px] tracking-[-0.64px] text-center p-1'
                    >
                    We're — a product design + engineering team that turns ideas into polished, scalable web apps. From UX to backend to visuals, everything in one place.
                    </motion.p>
                    
                </div>
                <motion.div 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.6, delay: 0, ease: 'easeOut' }}
                className='absolute bottom-[40px] left-10 md:bottom-[21px] md:left-[21px] flex flex-row gap-[10px]'
                >
                {['Pioneers', '/', 'Opportunities', '/', 'Vision'].map((item, index) => (
                    <motion.span
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0, duration: 0.4 }}
                    whileHover={item !== '/' ? { 
                        color: '#ffffff', 
                        scale: 1.05,
                        transition: { duration: 0.2 }
                    } : {}}
                    className={`text-white/50 text-[14px] tracking-[-0.56px] text-center cursor-pointer ${item !== '/' ? 'hover:text-white transition-colors' : ''}`}
                    >
                    {item}
                    </motion.span>
                ))}
                </motion.div>
                <motion.div 
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.6, delay: 0, ease: 'easeOut' }}
                className='absolute bottom-[10px] right-30 md:bottom-[21px] md:right-[21px] flex flex-row gap-[10px]'
                >
                <motion.span 
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0, type: 'spring', stiffness: 200 }}
                    whileHover={{ 
                    color: '#fff',
                    scale: 1.05,
                    transition: { duration: 0.2 }
                    }}
                    className='text-white/50 text-[14px] tracking-[-0.56px] text-center cursor-pointer hover:text-[#FF8A33] transition-colors'
                >
                    Future is Now!
                </motion.span>
                </motion.div>
            </div>
       

        </div>

       </motion.div>


       <motion.div
        data-cursor="TFG Solution" 
        data-cursor-variant="view"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, delay: 0.5 ,  }}
        className="relative w-full border-y-[2px] border-[#535353] px-[40px]"
        >
            <div className="relative max-w-[1440px] mx-auto py-[30px] ">
            <LogoLoop logos={logos} speed={30} />
            <img 
                    src="images/Frame.png" 
                    className="absolute -bottom-[12.75px] -left-[12.75px] z-20"
                />
                <img 
                    src="images/Frame.png" 
                    className="absolute -bottom-[12.75px] -right-[12.75px] z-20"
                />
            </div>
       </motion.div>


       <motion.div
        data-cursor="Our services" 
        data-cursor-variant="view"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.8, delay: 0.5 ,  }}
        className="relative w-full py-[60px]  px-[20px] md:px-[40px]"
        >
            <div className="relative max-w-[1440px] mx-auto flex flex-col gap-[70px] ">
             <AnimatedHeading
                    segments={[
                        { text: "One System Smarter" },
                        { text: "Growth.", highlight: true, animateBy: 'characters', delay: 100 },
                        
                    ]}
                    baseClassName="text-[48px] md:text-[56px] text-white text-center leading-[110px]"
                    />      
             <ServicesSection/>
            
            </div>
       </motion.div>

       <motion.div
        data-cursor="Featured work" 
        data-cursor-variant="view"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.8, delay: 0.5 ,  }}
        className="relative w-full py-[60px]  px-[20px] md:px-[40px]"
        >
            <div className="relative max-w-[1440px] mx-auto flex flex-col gap-[70px] ">
             <AnimatedHeading
                    segments={[
                        { text: "Our Featured" },
                        { text: "Work", highlight: true, animateBy: 'characters', delay: 100 },
                        
                    ]}
                    baseClassName="text-[48px] md:text-[56px] text-white text-center leading-[110px]"
                    />      
             <div className='relative flex flex-col'>
             <PortfolioTabs/>
      </div>

      {/* Example 2: Different Content Types */}
      
             
            
            </div>
       </motion.div>
      
    </div>
  )
}

export default Home
