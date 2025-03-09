"use client"

import { Divider, Link } from "@heroui/react"; // Utilisation du composant Link de HeroUI
import { FaDiscord, FaGithub,FaLinkedin   } from "react-icons/fa";
import { siteConfig } from "@/config/site";

export const Footer = ({ className }: { className?: string }) => {
  return (
    <footer className={`text-white py-4 ${className}`}>
      <Divider className="mb-5"/>
      <div className="container mx-auto flex flex-col items-center ">
        {/*
        <div className="flex gap-6 mb-4">
           
          <Link
            isExternal
            aria-label="Discord"
            href={siteConfig.links.discord}
            className="text-lg text-gray-400 hover:text-white"
          >
            <FaDiscord size={24} />
          </Link>
          
          <Link
            isExternal
            aria-label="GitHub"
            href={siteConfig.links.github}
            className="text-lg text-gray-400 hover:text-white"
          >
            <FaGithub  size={24} />
          </Link>

          <Link
            isExternal
            aria-label="LinkedIn"
            href={siteConfig.links.discord}
            className="text-lg text-gray-400 hover:text-white"
          >
            <FaLinkedin  size={24} />
          </Link>
        </div> */}

        {/* Footer Text */}
        <p className="text-center text-sm text-[var(--textNeutral)] opacity-70">
          © 2025 Adrien Rocchetti. Tous droits réservés.
        </p>
      </div>
    </footer>
  );
}
