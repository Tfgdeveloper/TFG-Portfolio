export default function AngledCard ({ children, className = "" }) {
  return (
    <div
    className={`relative servicescard p-[2px] h-[360px] transition-all duration-500 ${className}`}
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
            25% 100%, 
            20% 92%, 
            0% 92%
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
        25% 100%, 
        20% 92%, 
        0% 92%
      )
    `)
  }
  onMouseLeave={(e) =>
    (e.currentTarget.style.clipPath =
      "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)")
  }
>
    
    <div
  className={`servicesinner relative px-[24px] py-[32px] w-full h-full transition-all duration-500 ${className}`}
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
        25% 100%, 
        20% 92%, 
        0% 92%
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