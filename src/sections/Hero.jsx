import { useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Planet } from "../components/Planet";
import { Environment, Float, Lightformer } from "@react-three/drei";
import { useMediaQuery } from "react-responsive";
import AnimatedHeaderSection from "../components/AnimatedHeaderSection";
const Hero = () => {
  const isMobile = useMediaQuery({ maxWidth: 853 });
  const sectionRef = useRef(null);
  const [inView, setInView] = useState(true);
  const text = `I help growing brands and startups gain an
unfair advantage through premium
results driven webs/apps`;

  const mobileText = `I help growing brands & startups gain an unfair advantage
through premium results-driven webs/apps`;

  // Only render the 3D scene while the hero is on screen —
  // a full-screen WebGL canvas keeps burning GPU otherwise and
  // makes scrolling through the rest of the page laggy.
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.02 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section
      id="home"
      ref={sectionRef}
      className="flex flex-col justify-end min-h-screen"
    >
      <AnimatedHeaderSection
        subTitle={"404 No Bugs Found"}
        title={"Mohd. Faiz"}
        text={text}
        mobileText={mobileText}
        textColor={"text-black"}
      />
      <figure
        className="absolute inset-0 -z-50"
        style={{ width: "100%", height: "100vh" }}
      >
        <Canvas
          shadows
          frameloop={inView ? "always" : "never"}
          // Cap the render resolution: full DPR on 4K/Retina screens
          // is the single biggest GPU cost on this page.
          dpr={[1, 1.75]}
          camera={{ position: [0, 0, -10], fov: 17.5, near: 1, far: 20 }}
          gl={{ powerPreference: "high-performance", antialias: true }}
        >
          <ambientLight intensity={0.5} />
          <Float speed={0.5}>
            <Planet scale={isMobile ? 0.7 : 1} />
          </Float>
          <Environment resolution={256}>
            <group rotation={[-Math.PI / 3, 4, 1]}>
              <Lightformer
                form={"circle"}
                intensity={2}
                position={[0, 5, -9]}
                scale={10}
              />
              <Lightformer
                form={"circle"}
                intensity={2}
                position={[0, 3, 1]}
                scale={10}
              />
              <Lightformer
                form={"circle"}
                intensity={2}
                position={[-5, -1, -1]}
                scale={10}
              />
              <Lightformer
                form={"circle"}
                intensity={2}
                position={[10, 1, 0]}
                scale={16}
              />
            </group>
          </Environment>
        </Canvas>
      </figure>
    </section>
  );
};

export default Hero;
