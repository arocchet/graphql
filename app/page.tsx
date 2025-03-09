"use client";
import { HeroSection } from "@/components/landing/hero-section";
import TextReveal from "@/components/ui/text-reveal";

export default function Home() {
  return (
    <div className="mt-16">
      <TextReveal>
        <HeroSection />
      </TextReveal>
    </div>
  );
}
