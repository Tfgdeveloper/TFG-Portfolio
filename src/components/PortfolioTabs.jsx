import { motion } from 'framer-motion';
import { Tabs, TabSection } from './TabSection';
import TabsCard from './TabsCard';

export const portfolioData = {
  "Brand Design": [
    { name: "Subshare", category: "Digital Store", img: "brand1.png", height: "h-[225px]" },
    { name: "Sync Designs", category: "Design Agency", img: "brand2.png", height: "h-[225px]" },
    { name: "Umin", category: "Tech Ecommerce", img: "brand3.png", height: "h-[225px]" },
    { name: "Net 4 Test", category: "Tech Ecommerce", img: "brand4.png", height: "h-[225px]" },
  ],
  "UI/UX & Product Design": [
    { name: "Black Horse Tyre", category: "Ecommerce", img: "uiux1.png", height: "h-[300px]" },
    { name: "Digital on Sales", category: "Digital Store", img: "uiux2.png", height: "h-[300px]" },
    { name: "Anonyeti", category: "Ecommerce", img: "uiux3.png", height: "h-[300px]" },
    { name: "Subshare", category: "Digital Store", img: "uiux4.png", height: "h-[300px]" },
  ],
  "SAAS Application": [
    { name: "Invader", category: "Ecommerce", img: "saas1.png", height: "h-[300px]" },
    { name: "Synergy", category: "SAAS", img: "saas2.png", height: "h-[300px]" },
  ],
  "Web & Landing Page Design": [
    { name: "Black Horse Tyre", category: "Ecommerce", img: "uiux1.png", height: "h-[300px]" },
    { name: "Digital on Sales", category: "Digital Store", img: "uiux2.png", height: "h-[300px]" },
    { name: "Anonyeti", category: "Ecommerce", img: "uiux3.png", height: "h-[300px]" },
    { name: "Subshare", category: "Digital Store", img: "uiux4.png", height: "h-[300px]" },
  ],
  "Web & Mobile App Design": [
    { name: "Trair", category: "Travel Agency", img: "app1.png", height: "h-[225px]" },
    { name: "Taxer", category: "Finance", img: "app2.png", height: "h-[280px]" },
  ],
  "Front & Back-end Development": [
    { name: "Metamorph", category: "Design Agency", img: "frontend1.png", height: "h-[300px]" },
    { name: "Koala Bridge", category: "Finance", img: "frontend2.png", height: "h-[300px]" },
  ],
};

const PortfolioCard = ({ name, category, img, height }) => (
  <div className="relative">
    <motion.span
      initial={{ scale: 0.8 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", stiffness: 200 }}
      className="absolute left-[18px] bottom-[10px] transition-opacity duration-300 text-white text-[18px] tracking-[-0.72px] text-center cursor-pointer z-50"
    >
      {name}
    </motion.span>
    <motion.span
      initial={{ scale: 0.8 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", stiffness: 200 }}
      whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
      className="absolute right-[10px] bottom-[10px] transition-opacity duration-300 text-white/50 text-[14px] tracking-[-0.56px] text-center cursor-pointer hover:text-[#FF8A33] z-50"
    >
      {category}
    </motion.span>
    <TabsCard className="group mr-[-2px] flex justify-center items-center">
      <img src="images/Vector29.svg" className="absolute top-0 left-0 hidden group-hover:flex transition-all duration-500" />
      <img src="images/Vector30.svg" className="absolute top-0 left-0 hidden group-hover:flex transition-all duration-500" />
      <img src={`images/portfolio/${img}`} className={`w-auto ${height} z-50 mt-[-25px]`} />
    </TabsCard>
  </div>
);

const PortfolioTabs = ({ handleSearch }) => {
  const getGridClass = (sectionName) => 
    sectionName === "Brand Design" 
      ? "grid grid-cols-1 md:grid-cols-2 gap-0" 
      : "grid grid-cols-1 md:grid-cols-2 gap-6";

  return (
    <Tabs showSearch={true} searchPlaceholder="" onSearch={handleSearch}>
      {Object.entries(portfolioData).map(([sectionName, items]) => (
        <TabSection 
          key={sectionName} 
          name={sectionName} 
          className={getGridClass(sectionName)}
        >
          {items.map((item, idx) => (
            <PortfolioCard key={idx} {...item} />
          ))}
        </TabSection>
      ))}
    </Tabs>
  );
};

export default PortfolioTabs;