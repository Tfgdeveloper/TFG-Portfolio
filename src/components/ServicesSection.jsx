// ServicesSection.jsx
import { memo, useMemo } from 'react';
import AngledCard from './AngledCard';

const services = [
  { id: 1, title: "Brand Design", desc: "We specialize in creating impactful branding and logo designs..." },
  { id: 2, title: "UI/UX & Product Design", desc: "We design future-ready UI/UX and digital products..." },
  { id: 3, title: "SAAS Application", desc: "We specialize in creating impactful branding..." },
  { id: 4, title: "Web & Landing Page Design", desc: "We specialize in creating impactful branding..." },
  { id: 5, title: "Web & Mobile App Design", desc: "We specialize in creating impactful branding..." },
  { id: 6, title: "Front & Back-end Development", desc: "We specialize in creating impactful branding..." },
];

const ServiceCard = memo(function ServiceCard({ num, title, desc }) {
  const formattedNum = useMemo(() => String(num).padStart(2, '0'), [num]);

  return (
    <AngledCard className="w-1/3 group mr-[-2px]">
      <img 
        src='images/Component 1.svg' 
        className='absolute top-[20px] left-[2px] flex group-hover:hidden transition-opacity duration-300' 
        alt=""
        loading="lazy"
      />
      <img 
        src='images/Component 1 (1).svg' 
        className='absolute top-0 left-0 hidden group-hover:flex transition-opacity duration-300' 
        alt=""
        loading="lazy"
      />
      <img 
        src='images/Vector 28.svg' 
        className='absolute top-0 left-0 hidden group-hover:flex transition-opacity duration-300' 
        alt=""
        loading="lazy"
      />
      
      <div className='w-full mt-22 flex flex-col gap-0'>
        <h3 className="text-white text-lg">{title}</h3>
        <p className="text-white/50 text-[14px] tracking-[-0.56px]">{desc}</p>
      </div>
      
      <span className="absolute right-[32px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white/50 text-[14px] tracking-[-0.56px] text-center cursor-pointer hover:text-[#FF8A33]">
        {formattedNum} / 06
      </span>
    </AngledCard>
  );
});

const CornerFrame = memo(function CornerFrame({ position }) {
  return <img src="images/Frame.png" className={`absolute ${position} z-20`} alt="" loading="eager" />;
});

const ServicesSection = memo(function ServicesSection() {
  return (
    <div className='relative flex flex-col'>
      <div className='flex'>
        {services.slice(0, 3).map((s, i) => (
          <ServiceCard key={s.id} num={i + 1} {...s} />
        ))}
      </div>
      <div className='flex'>
        {services.slice(3, 6).map((s, i) => (
          <ServiceCard key={s.id} num={i + 4} {...s} />
        ))}
      </div>
      <CornerFrame position="-top-[10.75px] -left-[10.75px]" />
      <CornerFrame position="-top-[10.75px] -right-[6.75px]" />
      <CornerFrame position="-bottom-[10.75px] -left-[10.75px]" />
      <CornerFrame position="-bottom-[10.75px] -right-[6.75px]" />
    </div>
  );
});

export default ServicesSection;