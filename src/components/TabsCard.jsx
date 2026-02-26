export default function TabsCard ({ children, className = "" }) {
  return (
    <div
    className={`relative servicescard p-[2px] h-[313px] transition-all duration-500 ${className}`}
    style={{
    clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)"
    }}
    onMouseEnter={(e) =>
        (e.currentTarget.style.clipPath = `
         polygon(
         0% 0%, 
            95% 0%, 
            100% 5%, 
            100% 100%, 
            70% 100%, 
            65% 87%, 
            0% 87%
      )
        `)
        }
  onMouseLeave={(e) =>
    (e.currentTarget.style.clipPath =
      "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)")
  }
>
        <div
  className={`relative bg-[#0A0A0A] p-0 w-full h-full transition-all duration-500 ${className}`}
  style={{
    clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)"
  }}
  onMouseEnter={(e) =>
    (e.currentTarget.style.clipPath = `
       polygon(
         0% 0%, 
            95% 0%, 
            100% 5%, 
            100% 100%, 
            70% 100%, 
            65% 87%, 
            0% 87%
      )
    `)
  }
  onMouseLeave={(e) =>
    (e.currentTarget.style.clipPath =
      "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)")
  }
>
    
    <div
  className={`servicesinner relative px-[24px] py-[24px] w-full h-full transition-all duration-500 ${className}`}
  style={{
    clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)"
  }}
  onMouseEnter={(e) =>
    (e.currentTarget.style.clipPath = `
      polygon(
         0% 0%, 
            95% 0%, 
            100% 5%, 
            100% 100%, 
            70% 100%, 
            65% 87%, 
            0% 87%
      )
    `)
  }
  onMouseLeave={(e) =>
    (e.currentTarget.style.clipPath =
      "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)")
  }
>
                        
        {children}
        </div>
    </div>
      
    </div>
  );
};