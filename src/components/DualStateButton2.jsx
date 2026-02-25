export default function DualStateButton2({
  title,
  href = "#",
  target = "_self",
}) {
 return (
    <a href={href}
      target={target} className="group relative flex flex-row gap-0 items-start justify-start  transition duration-500 ">
      
      <div
    className="
      w-[180px]
      h-[47px]
      glow
      p-[2px]
      [clip-path:polygon(0_0,85%_0,100%_60%,100%_100%,0_100%)]
      transition- duration-300 
      "
  >

    {/* Inner Glass Layer */}
    <div
    className="
      w-full
      h-full
      bg-[#0A0A0A]
      [clip-path:polygon(0_0,85%_0,100%_60%,100%_100%,0_100%)]
      "
  >
    <div
      className="flex items-center justify-center
        w-full
        h-full
        bg-white/5
        backdrop-blur-[7.5px]
        shadow-[ -20px_68px_20px_0_rgba(0,0,0,0.00),
                  -13px_43px_18px_0_rgba(0,0,0,0.01),
                  -7px_24px_15px_0_rgba(0,0,0,0.04),
                  -3px_11px_11px_0_rgba(0,0,0,0.07),
                  -1px_3px_6px_0_rgba(0,0,0,0.08) ]

        [clip-path:polygon(0_0,85%_0,100%_60%,100%_100%,0_100%)]
      "
      
    >
      <span className="text-white text-[16px] tracking-[-0.64px]">{title}</span>
    </div>
  </div>

      </div>
      <div className="
  w-[25px]
  h-[25px]
  absolute
  right-[0px]
  glow2
  [clip-path:polygon(0_0,100%_0,100%_100%)]
  z-20
  transition-all
  duration-300
  ease-in-out
  group-hover:w-[21px]
  group-hover:h-[21px]
">
  
      </div>
      <div className="
        w-[10px]
        h-[10px]
        absolute left-[165px] top-1
        inset-0 
        opacity-0
        bg-gradient-to-br from-[#FFC580] to-[#FFF599] 
        blur-[10px] 
        transition-opacity duration-300 
        group-hover:opacity-100
        
       
        z-10
        
        
        " />
      
      
    
      
    </a>
    
  );
}