"use client";

import ContentPage from "@/components/ContentPage";

export default function JewsInAsiaPage() {
  return (
    <ContentPage
      namespace="jewsInAsia"
      titleKey="title"
      subtitleKey="subtitle"
      sections={[
        { titleKey: "kaifeng" },
        { titleKey: "shanghai" },
        { titleKey: "japan" },
        { titleKey: "india" },
        { titleKey: "modernAsia" },
      ]}
      relatedLinks={[
        { href: "/ashkenazi-sephardi", labelKey: "Ashkenazi & Sephardi", labelNs: "nav" },
        { href: "/jewish-history", labelKey: "Jewish History", labelNs: "nav" },
      ]}
    />
  );
}
