/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "export", // Active l'export statique
    images: {
      unoptimized: true, // Évite les optimisations d'image côté serveur
    },
    eslint: {
      ignoreDuringBuilds: true, // Ignore les erreurs ESLint en build
    },
  };
  
  export default nextConfig;
  