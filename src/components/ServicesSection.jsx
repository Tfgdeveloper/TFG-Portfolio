// components/ServicesSection.jsx
import { motion } from 'framer-motion';
import AngledCard from './AngledCard';

const services = [
  { id: 1, title: "Brand Design", desc: "We specialize in creating impactful branding and logo designs that capture the essence of your identity. From concept to execution, we craft visuals that leave a lasting impression and help your brand stand out with clarity and confidence." },
  { id: 2, title: "UI/UX & Product Design", desc: "We design future-ready UI/UX and digital products where aesthetics meet intelligence. Through research-driven strategy, immersive interfaces, and precision-crafted interactions, we transform ideas into seamless experiences that feel ahead of their time—bold, intuitive, and built to scale with the products of tomorrow." },
  { id: 3, title: "SAAS Application", desc: "We specialize in creating impactful branding and logo designs that capture the essence of your identity. From concept to execution, we craft visuals that leave a lasting impression and help your brand stand out with clarity and confidence." },
  { id: 4, title: "Web & Landing Page Design", desc: "We specialize in creating impactful branding and logo designs that capture the essence of your identity. From concept to execution, we craft visuals that leave a lasting impression and help your brand stand out with clarity and confidence." },
  { id: 5, title: "Web & Mobile App Design", desc: "We specialize in creating impactful branding and logo designs that capture the essence of your identity. From concept to execution, we craft visuals that leave a lasting impression and help your brand stand out with clarity and confidence." },
  { id: 6, title: "Front & Back-end Development", desc: "We specialize in creating impactful branding and logo designs that capture the essence of your identity. From concept to execution, we craft visuals that leave a lasting impression and help your brand stand out with clarity and confidence." },
];

const ServiceCard = ({ num, title, desc }) => (
  <AngledCard className="w-1/3 group mr-[-2px]">
    <img src='images/Component 1.svg' className='absolute top-[20px] left-[2px] flex group-hover:hidden transition-all duration-500' />
    <img src='images/Component 1 (1).svg' className='absolute top-0 left-0 hidden group-hover:flex transition-all duration-500' />
    <img src='images/Vector 28.svg' className='absolute top-0 left-0 hidden group-hover:flex transition-all duration-500' />
    <div className='w-full mt-22 flex flex-col gap-0'>
      <h3 className="text-white text-lg">{title}</h3>
      <p className="text-white/50 text-[14px] tracking-[-0.56px]">{desc}</p>
    </div>
    <motion.span
      initial={{ scale: 0.8 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", stiffness: 200 }}
      whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
      className="absolute right-[32px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white/50 text-[14px] tracking-[-0.56px] text-center cursor-pointer hover:text-[#FF8A33]"
    >
      {String(num).padStart(2, '0')} / 06
    </motion.span>
  </AngledCard>
);

const CornerFrame = ({ position }) => (
  <img src="images/Frame.png" className={`absolute ${position} z-20`} />
);

const ServicesSection = () => (
  <div className='relative flex flex-col'>
    <div className='flex'>
      {services.slice(0, 3).map((s, i) => <ServiceCard key={s.id} num={i + 1} {...s} />)}
    </div>
    <div className='flex'>
      {services.slice(3, 6).map((s, i) => <ServiceCard key={s.id} num={i + 4} {...s} />)}
    </div>
    <CornerFrame position="-top-[10.75px] -left-[10.75px]" />
    <CornerFrame position="-top-[10.75px] -right-[6.75px]" />
    <CornerFrame position="-bottom-[10.75px] -left-[10.75px]" />
    <CornerFrame position="-bottom-[10.75px] -right-[6.75px]" />
  </div>
);

export default ServicesSection;