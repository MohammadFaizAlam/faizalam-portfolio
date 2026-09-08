import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useRef } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useMediaQuery } from "react-responsive";

gsap.registerPlugin(ScrollTrigger);

export const AnimatedTextLines = ({ text, mobileText, items, className }) => {
  const containerRef = useRef(null);
  const lineRefs = useRef([]);
  const isMobile = useMediaQuery({ maxWidth: 767 });

  const activeText = isMobile && mobileText ? mobileText : text;

  const lines = items
    ? items
    : activeText
      ? isMobile && !mobileText
        ? [activeText.split("\n").map((line) => line.trim()).filter(Boolean).join(" ")]
        : activeText
          .split("\n")
          .map((line) => line.trim())
          .filter((line) => line !== "")
      : [];

  useGSAP(() => {
    lineRefs.current = lineRefs.current.slice(0, lines.length);
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
  }, [lines.length, isMobile]);

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
