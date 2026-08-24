"use client";

import { useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { usePathname } from "next/navigation";

export default function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    const ctx = gsap.context(() => {
      // Find all elements that need reveal
      const revealUp = gsap.utils.toArray('.reveal-up');
      revealUp.forEach((el: any) => {
        gsap.fromTo(el, 
          { opacity: 0, y: 30 },
          {
            opacity: 1, 
            y: 0, 
            duration: 0.8, 
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              once: true
            }
          }
        );
      });

      const revealScale = gsap.utils.toArray('.reveal-scale');
      revealScale.forEach((el: any) => {
        gsap.fromTo(el,
          { opacity: 0, scale: 0.9 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.8,
            ease: "back.out(1.5)",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              once: true
            }
          }
        );
      });
      
      const revealLeft = gsap.utils.toArray('.reveal-left');
      revealLeft.forEach((el: any) => {
        gsap.fromTo(el,
          { opacity: 0, x: -30 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              once: true
            }
          }
        );
      });
    });

    return () => ctx.revert();
  }, [pathname]); // Re-run when route changes

  return null;
}
