// PortfolioTabs.jsx
import { useMemo, useCallback, memo } from 'react';
import { Tabs, TabSection } from './TabSection';
import TabsCard from './TabsCard';

const portfolioData = {
  "Brand Design": [
    { name: "Subshare", category: "Digital Store", img: "brand1.png", height: "h-[300px]" },
    { name: "Sync Designs", category: "Design Agency", img: "brand2.png", height: "h-[300px]" },
    { name: "Umin", category: "Tech Ecommerce", img: "brand3.png", height: "h-[300px]" },
    { name: "Net 4 Test", category: "Tech Ecommerce", img: "brand4.png", height: "h-[300px]" },
  ],
  "UI/UX & Product Design": [
    { name: "Black Horse Tyre", category: "Ecommerce", img: "uiux1.png", height: "h-[350px]" },
    { name: "Digital on Sales", category: "Digital Store", img: "uiux2.png", height: "h-[350px]" },
    { name: "Anonyeti", category: "Ecommerce", img: "uiux3.png", height: "h-[350px]" },
    { name: "Subshare", category: "Digital Store", img: "uiux4.png", height: "h-[350px]" },
  ],
  "SAAS Application": [
    { name: "Invader", category: "Ecommerce", img: "saas1.png", height: "h-[300px]" },
    { name: "Synergy", category: "SAAS", img: "saas2.png", height: "h-[300px]" },
  ],
  "Web & Landing Page Design": [
    { name: "Black Horse Tyre", category: "Ecommerce", img: "uiux1.png", height: "h-[350px]" },
    { name: "Digital on Sales", category: "Digital Store", img: "uiux2.png", height: "h-[350px]" },
    { name: "Anonyeti", category: "Ecommerce", img: "uiux3.png", height: "h-[350px]" },
    { name: "Subshare", category: "Digital Store", img: "uiux4.png", height: "h-[350px]" },
  ],
  "Web & Mobile App Design": [
    { name: "Trair", category: "Travel Agency", img: "app1.png", height: "h-[300px]" },
    { name: "Taxer", category: "Finance", img: "app2.png", height: "h-[330px]" },
  ],
  "Front & Back-end Development": [
    { name: "Metamorph", category: "Design Agency", img: "frontend1.png", height: "h-[350px]" },
    { name: "Koala Bridge", category: "Finance", img: "frontend2.png", height: "h-[350px]" },
  ],
};

const PortfolioCard = memo(function PortfolioCard({ name, category, img, height }) {
  return (
    <div className="relative group">
      <span className="absolute left-[18px] bottom-[10px] text-white text-[18px] tracking-[-0.72px] text-center cursor-pointer z-50">
        {name}
      </span>
      
      <span className="absolute right-[10px] bottom-[10px] text-white/50 text-[14px] tracking-[-0.56px] text-center cursor-pointer transition-colors duration-200 group-hover:text-[#FF8A33] z-50">
        {category}
      </span>
      
      <TabsCard className="group flex justify-center items-center">
        <img 
          src="images/Vector29.svg" 
          className="absolute top-0 left-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" 
          alt=""
          loading="lazy"
        />
        <img 
          src="images/Vector30.svg" 
          className="absolute top-0 left-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" 
          alt=""
          loading="lazy"
        />
        <img 
          src={`images/portfolio/${img}`} 
          className={`w-auto ${height} z-50 mt-[-25px]`}
          alt={name}
          loading="lazy"
        />
      </TabsCard>
    </div>
  );
});

const PortfolioTabs = memo(function PortfolioTabs({ handleSearch }) {
  const getGridClass = useCallback((sectionName) => 
    sectionName === "Brand Design" 
      ? "grid grid-cols-1 md:grid-cols-2 gap-0" 
      : "grid grid-cols-1 md:grid-cols-2 gap-6"
  , []);

  const portfolioEntries = useMemo(() => Object.entries(portfolioData), []);

  return (
    <Tabs showSearch={true} searchPlaceholder="" onSearch={handleSearch}>
      {portfolioEntries.map(([sectionName, items]) => (
        <TabSection 
          key={sectionName} 
          name={sectionName} 
          className={getGridClass(sectionName)}
        >
          {items.map((item, idx) => (
            <PortfolioCard key={`${item.name}-${idx}`} {...item} />
          ))}
        </TabSection>
      ))}
    </Tabs>
  );
});

export default PortfolioTabs;