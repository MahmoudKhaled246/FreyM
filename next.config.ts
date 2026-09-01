import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "freymcompanygroup.com" }],
        destination: "https://www.freymcompanygroup.com/:path*",
        permanent: true,
      },
      { source: "/Home/about", destination: "/about", permanent: true },
      { source: "/About/Values", destination: "/about#values", permanent: true },
      {
        source: "/About/GM_WORD",
        destination: "/about#leadership-message",
        permanent: true,
      },
      {
        source: "/About/Why_Us",
        destination: "/about#why-us",
        permanent: true,
      },
      {
        source: "/Contact/ContactUs",
        destination: "/contact",
        permanent: true,
      },
      {
        source: "/Home/Services",
        destination: "/services",
        permanent: true,
      },
      {
        source: "/Home/constructionProject",
        destination: "/services",
        permanent: true,
      },
      {
        source: "/Home/Decoration",
        destination: "/services",
        permanent: true,
      },
      {
        source: "/Home/Generalsupplies",
        destination: "/services",
        permanent: true,
      },
      {
        source: "/Home/Soildrying",
        destination: "/services#soil-dewatering",
        permanent: true,
      },
      {
        source: "/Home/Portofilo",
        destination: "/projects",
        permanent: true,
      },
      {
        source: "/Profile/LatestWork",
        destination: "/profile#previous",
        permanent: true,
      },
      {
        source: "/Profile/CurrenttWork",
        destination: "/profile#current",
        permanent: true,
      },
      {
        source: "/Project/:path*",
        destination: "/projects",
        permanent: true,
      },
      {
        source: "/News/OurNews",
        destination: "/news",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
