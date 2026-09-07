import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useRef } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";

gsap.registerPlugin(ScrollTrigger);

export const AnimatedTextLines = ({ text, items, className }) => {
  const containerRef = useRef(null);
  const lineRefs = useRef([]);

  const lines = items
    ? items
    : text
    ? text.split("\n").filter((line) => line.trim() !== "")
    : [];

  useGSAP(() => {
    if (lineRefs.current.length > 0) {
      gsap.from(lineRefs.current, {
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.3,
        ease: "back.out",
        scrollTrigger: {
          trigger: containerRef.current,
        },
      });
    }
  });

  return (
    <div ref={containerRef} className={className}>
      {lines.map((item, index) => {
        const isObj = typeof item === "object" && item !== null;
        const icon = isObj ? item.icon : null;
        const lineText = isObj ? item.text : item;
        const isHeader = isObj && item.isHeader;

        if (isHeader) {
          return (
            <span
              key={index}
              ref={(el) => (lineRefs.current[index] = el)}
              className="block mt-6 mb-3 text-sm md:text-base uppercase tracking-widest text-gold font-medium"
            >
              {lineText}
            </span>
          );
        }

        return (
          <span
            key={index}
            ref={(el) => (lineRefs.current[index] = el)}
            className="block my-2.5 leading-relaxed tracking-wide text-pretty"
          >
            {icon ? (
              <span className="inline-flex items-center gap-3">
                <span className="flex items-center justify-center p-2 rounded-lg bg-white/5 border border-white/10 text-gold shrink-0">
                  <Icon icon={icon} className="size-4 md:size-5" />
                </span>
                <span className="text-white/80">{lineText}</span>
              </span>
            ) : (
              lineText
            )}
          </span>
        );
      })}
    </div>
  );
};
