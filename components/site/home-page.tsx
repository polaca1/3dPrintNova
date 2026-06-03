"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { CatalogSection } from "@/components/site/catalog-section";
import { ContactFooter } from "@/components/site/contact-footer";
import { CustomBuilder } from "@/components/site/custom-builder";
import { HeroSection } from "@/components/site/hero-section";
import { ProcessSection } from "@/components/site/process-section";
import { ScrollProgressRail } from "@/components/site/scroll-progress-rail";
import { ShowcaseSection } from "@/components/site/showcase-section";
import { SiteNav } from "@/components/site/site-nav";
import { SocialProofSection } from "@/components/site/social-proof-section";
import { TrustSection } from "@/components/site/trust-section";

export function HomePage() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-gsap='reveal']").forEach((el) => {
        gsap.fromTo(
          el,
          { autoAlpha: 0, y: 54, filter: "blur(18px)" },
          {
            autoAlpha: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 1.05,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 86%",
              once: true,
            },
          },
        );
      });

      gsap.utils
        .toArray<HTMLElement>("[data-gsap='parallax']")
        .forEach((el) => {
          gsap.to(el, {
            yPercent: -12,
            ease: "none",
            scrollTrigger: {
              trigger: el.parentElement ?? el,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.8,
            },
          });
        });
    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      <SiteNav />
      <ScrollProgressRail />
      <main>
        <HeroSection />
        <TrustSection />
        <CatalogSection />
        <CustomBuilder />
        <ProcessSection />
        <ShowcaseSection />
        <SocialProofSection />
        <ContactFooter />
      </main>
    </>
  );
}
