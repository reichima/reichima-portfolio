"use client";

import Footer from "@/app/(portfolio)/footer";
import AboutSection from "@/components/sections/about-section";
import ContactSection from "@/components/sections/contact-section";
import HomeSection from "@/components/sections/home-section";
import SpecialSection from "@/components/sections/special-section";
import WorksSection from "@/components/sections/works-section";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

export default function Page() {
  const mainRef = useRef<HTMLElement>(null);
  const specialRef = useRef<HTMLElement>(null);
  const aboutRef = useRef<HTMLElement>(null);
  const profileImageRef = useRef<HTMLImageElement>(null);
  const aboutTitleRef = useRef<HTMLHeadingElement>(null);
  const aboutTextRef = useRef<HTMLDivElement>(null);
  const worksRef = useRef<HTMLElement>(null);
  const worksTitleRef = useRef<HTMLHeadingElement>(null);
  const worksContentRef = useRef<HTMLDivElement>(null);
  const homeRef = useRef<HTMLElement>(null);
  const homeTitleRef = useRef<HTMLHeadingElement>(null);
  const homeSubtitleRef = useRef<HTMLParagraphElement>(null);
  const contactRef = useRef<HTMLElement>(null);
  const contactTitleRef = useRef<HTMLHeadingElement>(null);
  const contactContentRef = useRef<HTMLDivElement>(null);
  const specialTitleRef = useRef<HTMLHeadingElement>(null);
  const specialContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Home section animations
    if (homeRef.current && homeTitleRef.current && homeSubtitleRef.current) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: homeRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      });

      tl.fromTo(
        homeTitleRef.current,
        {
          opacity: 0,
          y: 100,
          scale: 0.5,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.5,
          ease: "power2.out",
        },
      );

      tl.fromTo(
        homeSubtitleRef.current,
        {
          opacity: 0,
          y: 50,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
        },
        "-=0.8",
      );
    }

    // About section animations
    if (
      aboutRef.current &&
      profileImageRef.current &&
      aboutTitleRef.current &&
      aboutTextRef.current
    ) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: aboutRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      });

      // Title animation
      tl.fromTo(
        aboutTitleRef.current,
        {
          opacity: 0,
          x: -100,
          rotationY: -90,
        },
        {
          opacity: 1,
          x: 0,
          rotationY: 0,
          duration: 1,
          ease: "power2.out",
        },
      );

      // Profile image animation
      tl.fromTo(
        profileImageRef.current,
        {
          opacity: 0,
          scale: 0.5,
          rotation: -180,
        },
        {
          opacity: 1,
          scale: 1,
          rotation: 0,
          duration: 1.2,
          ease: "back.out(1.7)",
        },
        "-=0.5",
      );

      // Text content animation
      const textElements = aboutTextRef.current.children;
      tl.fromTo(
        textElements,
        {
          opacity: 0,
          y: 50,
          scale: 0.8,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: "power2.out",
        },
        "-=0.8",
      );
    }

    // Works section animations
    if (worksRef.current && worksTitleRef.current && worksContentRef.current) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: worksRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      });

      // Title animation
      tl.fromTo(
        worksTitleRef.current,
        {
          opacity: 0,
          y: -50,
          scale: 0.8,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: "power2.out",
        },
      );

      // Works cards animation
      const workCards = worksContentRef.current.children;
      tl.fromTo(
        workCards,
        {
          opacity: 0,
          y: 100,
          rotationX: 45,
        },
        {
          opacity: 1,
          y: 0,
          rotationX: 0,
          duration: 1,
          stagger: 0.3,
          ease: "power2.out",
        },
        "-=0.5",
      );
    }

    // Contact section animations
    if (
      contactRef.current &&
      contactTitleRef.current &&
      contactContentRef.current
    ) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: contactRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      });

      tl.fromTo(
        contactTitleRef.current,
        {
          opacity: 0,
          x: 100,
          rotationY: 90,
        },
        {
          opacity: 1,
          x: 0,
          rotationY: 0,
          duration: 1,
          ease: "power2.out",
        },
      );

      const contactElements = contactContentRef.current.children;
      tl.fromTo(
        contactElements,
        {
          opacity: 0,
          y: 80,
          scale: 0.9,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          stagger: 0.3,
          ease: "power2.out",
        },
        "-=0.5",
      );
    }

    // Special section animations
    if (
      specialRef.current &&
      specialTitleRef.current &&
      specialContentRef.current
    ) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: specialRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      });

      tl.fromTo(
        specialTitleRef.current,
        {
          opacity: 0,
          scale: 0.5,
          rotation: -45,
        },
        {
          opacity: 1,
          scale: 1,
          rotation: 0,
          duration: 1.2,
          ease: "back.out(1.7)",
        },
      );

      const specialElements = specialContentRef.current.children;
      tl.fromTo(
        specialElements,
        {
          opacity: 0,
          y: 100,
          scale: 0.8,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          stagger: 0.2,
          ease: "power2.out",
        },
        "-=0.8",
      );
    }

    return () => {};
  }, []);

  return (
    <main ref={mainRef} className="w-full">
      <HomeSection
        homeRef={homeRef as React.RefObject<HTMLElement>}
        homeTitleRef={homeTitleRef as React.RefObject<HTMLHeadingElement>}
        homeSubtitleRef={
          homeSubtitleRef as React.RefObject<HTMLParagraphElement>
        }
      />
      <AboutSection
        aboutRef={aboutRef as React.RefObject<HTMLElement>}
        profileImageRef={profileImageRef as React.RefObject<HTMLImageElement>}
        aboutTitleRef={aboutTitleRef as React.RefObject<HTMLHeadingElement>}
        aboutTextRef={aboutTextRef as React.RefObject<HTMLDivElement>}
      />
      <WorksSection
        worksRef={worksRef as React.RefObject<HTMLElement>}
        worksTitleRef={worksTitleRef as React.RefObject<HTMLHeadingElement>}
        worksContentRef={worksContentRef as React.RefObject<HTMLDivElement>}
      />
      <ContactSection
        contactRef={contactRef as React.RefObject<HTMLElement>}
        contactTitleRef={contactTitleRef as React.RefObject<HTMLHeadingElement>}
        contactContentRef={contactContentRef as React.RefObject<HTMLDivElement>}
      />
      <SpecialSection
        specialRef={specialRef as React.RefObject<HTMLElement>}
        specialTitleRef={specialTitleRef as React.RefObject<HTMLHeadingElement>}
        specialContentRef={specialContentRef as React.RefObject<HTMLDivElement>}
      />
      <Footer />
    </main>
  );
}
