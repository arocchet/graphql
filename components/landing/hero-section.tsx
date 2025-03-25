"use client";

import { Button } from "@heroui/react";
import { TextReveal } from "@/components/ui/text-reveal";
import { useEffect, useState } from "react";
import HeroCard from "./hero-card";
import BannerComponent from "../ui/banner";
import ActionCard from "../action-card";
import Spacer from "../ui/spacer";
import { ProfileGrid } from "../ui/profile-grid-demo";

export const HeroSection = () => {
  const gradient = "bg-clip-text text-transparent bg-gradient-to-b";
  const colors = {
    violet: "from-[#FF1CF7] to-[#b249f8]",
    yellow: "from-[#FF705B] to-[#FFB457]",
    blue: "from-[#0072F5] to-[#5EA2EF]",
    cyan: "from-[#00b7fa] to-[#01cfea]",
    green: "from-[#6FEE8D] to-[#17c964]",
    pink: "from-[#FF72E1] to-[#F54C7A]",
    foreground: "dark:from-[#777] dark:to-[#222 ] from-[#000] to-[#777]",
  };

  return (
    <section className="flex flex-col gap-4 py-[8vmax] xs:py-[6.5vmax] sm:py-[6.7vmax] md:py-[6.9vmax] lg:py-[7vmax] xl:py-[7.2vmax] px-5 xs:px-[2vmax] sm:px-[3vmax] md:px-[5vmax] lg:px-[6vmax] xl:px-[7vmax] text-[var(--greyHighlighted)] items-center justify-center">
      <div className="whitespace-nowrap">
        <div className="text-center text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl">
          <div className="">
            <span className={``}>Votre parcours&nbsp;</span>
            <span className={` ${gradient} ${colors.foreground}`}>Zone</span>
            <span className={` ${gradient} ${colors.blue}`}>01</span>
          </div>

          <span>visualisé intelligemment</span>
          <br />
          <span className="whitespace-nowrap">
            grâce à{" "}
            <span className={`${gradient} ${colors.pink}`}>GraphQL</span>
          </span>
        </div>
      </div>
      <Spacer level={1} />
      <div className="text-center max-w-[60ch] break-words mt-4 text-md sm:text-lg md:text-xl lg:text-2xl xl:text-2xl">
        Explorez votre{" "}
        <span className={`${gradient} ${colors.yellow}`}>progression</span> en
        un coup d'œil ! Grâce à mon interface intuitive et connectée à GraphQL,
        accédez en temps réel à vos statistiques{" "}
        <span className={`${gradient} ${colors.foreground}`}>académiques</span>
        &nbsp; et suivez votre{" "}
        <span className={`${gradient} ${colors.green}`}>évolution</span> au sein
        de l'école.
      </div>

      <Spacer level={5} />
      <ProfileGrid />
      <div className="text-center max-w-[60ch] break-words mt-8 text-md sm:text-lg md:text-xl lg:text-xl xl:text-xl">
        Prêt à découvrir vos{" "}
        <span className="">performances</span> et
        <span className=""> compétences</span> ?
        Connectez-vous maintenant pour accéder à votre tableau de bord
        personnalisé et visualiser votre parcours avec des
        <span className="">
          {" "}
          graphiques interactifs
        </span>
        .
      </div>
      <div className="flex gap-3 mt-8">
        <Button
          radius="full"
          size="lg"
          className="bg-[var(--blue65)] text-white"
          
        >
          <a href="/login">Connectez-vous</a>
        </Button>
      </div>
    </section>
  );
};
