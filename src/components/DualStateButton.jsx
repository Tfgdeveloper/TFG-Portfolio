export default function DualStateButton() {
 return (
    <div className="group relative flex flex-row gap-0 items-start justify-start  transition duration-500 ">
      
      <div
    className="
      w-[180px]
      h-[55px]
      glow
      p-[2px]
      [clip-path:polygon(0_0,85%_0,100%_51%,100%_100%,0_100%)]
      "
  >

    {/* Inner Glass Layer */}
    <div
    className="
      w-full
      h-full
      bg-[#0A0A0A]
      [clip-path:polygon(0_0,85%_0,100%_51%,100%_100%,0_100%)]
      "
  >
    <div
      className="
        w-full
        h-full
        bg-white/5
        backdrop-blur-[7.5px]
        shadow-[ -20px_68px_20px_0_rgba(0,0,0,0.00),
                  -13px_43px_18px_0_rgba(0,0,0,0.01),
                  -7px_24px_15px_0_rgba(0,0,0,0.04),
                  -3px_11px_11px_0_rgba(0,0,0,0.07),
                  -1px_3px_6px_0_rgba(0,0,0,0.08) ]

        [clip-path:polygon(0_0,85%_0,100%_51%,100%_100%,0_100%)]
      "
    />
  </div>

      </div>
      <div className="
        w-[21px]
        h-[21px]
        absolute 
        right-[0px]
        glow2
        [clip-path:polygon(0_0,100%_0,100%_100%)]
        z-20
        " />
      <div className="
        w-[20px]
        h-[20px]
        absolute left-[155px] top-1
        inset-0 
        opacity-0
        bg-gradient-to-br from-[#FFC580] to-[#FFF599] 
        blur-[10px] 
        transition-opacity duration-300 
        group-hover:opacity-100
        
       
        z-10
        
        
        " />
      
    
      
    </div>
    
  );
}