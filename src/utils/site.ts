const site_url =
  process.env.NEXT_PUBLIC_APP_URL || "https://faizalam-portfolio.netlify.app";

export const siteConfig = {
  name: "Faiz | Web Developer",
  description:
    "Personal portfolio website showcasing my projects and skills as a full stack developer",
  url: site_url,
  ogImage: `${site_url}/_static/og-image.png`,
  links: {
    twitter: "https://x.com/Mohammed_Faiz_9",
    github: "https://github.com/MohammadFaizAlam",
  },
  mailSupport: "faizalam1101@gmail.com",
};
