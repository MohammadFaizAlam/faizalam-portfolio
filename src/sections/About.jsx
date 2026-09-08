import { useRef } from "react";
import AnimatedHeaderSection from "../components/AnimatedHeaderSection";
import { AnimatedTextLines } from "../components/AnimatedTextLines";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const About = () => {
  const text = `I engineer resilient digital systems
    built for post-launch reality—clean architecture, 
    sub-second loads, and measurable growth.`;

  const mobileText = `Resilient digital systems built for reality—
clean architecture & measurable growth.`;

  const aboutItems = [
    {
      text: "One operator across the full loop: high-performance Next.js codebases, paid acquisition funnels, and disciplined downside protection.",
    },
    {
      isHeader: true,
      text: "Core disciplines & stack:",
    },
    {
      icon: "lucide:terminal",
      text: "Full-stack web applications: React, Next.js, Node.js & Python",
    },
    {
      icon: "lucide:trending-up",
      text: "Performance marketing: Founder at AgencyGrow, 2–5x ROI ad funnels",
    },
    {
      icon: "lucide:candlestick-chart",
      text: "Market operations: Volume profiles, liquidity zones & strict risk rules",
    },
    {
      icon: "lucide:shield-check",
      text: "Production standard: Sub-second latency, clean UX & zero maintenance bloat",
    },
  ];

  const imgRef = useRef(null);
  useGSAP(() => {
    gsap.to("#about", {
      scale: 0.95,
      scrollTrigger: {
        trigger: "#about",
        start: "bottom 80%",
        end: "bottom 20%",
        scrub: true,
        markers: false,
      },
      ease: "power1.inOut",
    });

    gsap.set(imgRef.current, {
      clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)",
    });
    gsap.to(imgRef.current, {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      duration: 2,
      ease: "power4.out",
      scrollTrigger: { trigger: imgRef.current },
    });
  });

  return (
    <section id="about" className="min-h-screen bg-black rounded-b-4xl">
      <AnimatedHeaderSection
        subTitle={"Systems That Hold Under Pressure"}
        title={"About"}
        text={text}
        mobileText={mobileText}
        textColor={"text-white"}
        withScrollTrigger={true}
      />
      <div className="flex flex-col items-center justify-between gap-12 lg:gap-16 px-6 md:px-10 pb-16 text-base sm:text-lg md:text-xl lg:text-2xl font-light tracking-wide lg:flex-row text-white/70">
        <img
          ref={imgRef}
          src="images/faiz_image-2.jpeg"
          alt="Mohd. Faiz"
          className="w-full max-w-sm md:max-w-md rounded-3xl object-cover aspect-[4/5] shadow-2xl"
        />
        <AnimatedTextLines items={aboutItems} className={"w-full"} />
      </div>
    </section>
  );
};

export default About;
