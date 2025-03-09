export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "IntraQL",
  description: "Make beautiful websites regardless of your design experience.",
  navItems: [
    {
      label: "Accueil",
      href: "/",
    },
    {
      label: "Connexion",
      href: "/login",
    },
  ],
  
  links: {
    github: "https://github.com/heroui-inc/heroui",
    twitter: "https://twitter.com/hero_ui",
    discord: "https://discord.gg/9b6yyZKmH4",
    sponsor: "https://patreon.com/jrgarciadev",
  },
};
