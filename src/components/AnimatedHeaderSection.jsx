import React from "react";
import { useRef } from "react";
import { AnimatedTextLines } from "../components/AnimatedTextLines";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
const AnimatedHeaderSection = ({
  subTitle,
  title,
  text,
  mobileText,
  textColor,
  withScrollTrigger = false,
  isHero = false,
}) => {
  const contextRef = useRef(null);
  const headerRef = useRef(null);
  const shouldSplitTitle = title.includes(" ");
  const titleParts = shouldSplitTitle ? title.split(" ") : [title];
  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: withScrollTrigger
        ? {
          trigger: contextRef.current,
        }
        : undefined,
    });
    tl.from(contextRef.current, {
      y: "50vh",
      duration: 1,
      ease: "circ.out",
    });
    tl.from(
      headerRef.current,
      {
        opacity: 0,
        y: "200",
        duration: 1,
        ease: "circ.out",
      },
      "<+0.2"
    );
  }, []);
  return (
    <div ref={contextRef}>
      <div style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}>
        <div
          ref={headerRef}
          className={`flex flex-col justify-center ${
            isHero ? "gap-3 pt-4 sm:gap-16 sm:pt-16" : "gap-12 pt-16 sm:gap-16"
          }`}
        >
          <p
            className={`text-sm font-light ${
              isHero ? "tracking-[0.25rem] sm:tracking-[0.5rem]" : "tracking-[0.5rem]"
            } uppercase px-6 md:px-10 ${textColor}`}
          >
            {subTitle}
          </p>
          <div className="px-6 md:px-10">
            <h1
              className={`flex flex-col ${
                isHero
                  ? "gap-1 text-[54px] leading-tight sm:gap-16 sm:text-[118px] md:text-[126px] lg:text-[152px] sm:leading-16 lg:leading-20"
                  : "gap-12 banner-text-responsive sm:gap-16"
              } uppercase md:block ${textColor}`}
            >
              {titleParts.map((part, index) => (
                <span key={index}>{part} </span>
              ))}
            </h1>
          </div>
        </div>
      </div>
      <div className={`relative px-6 md:px-10 ${textColor}`}>
        <div className="absolute inset-x-0 border-t-2" />
        <div className={`${isHero ? "py-4 sm:py-16" : "py-8 sm:py-16"} text-end`}>
          <AnimatedTextLines
            text={text}
            mobileText={mobileText}
            className={`font-light uppercase value-text-responsive ${textColor}`}
          />
        </div>
      </div>
    </div>
  );
};

export default AnimatedHeaderSection;
