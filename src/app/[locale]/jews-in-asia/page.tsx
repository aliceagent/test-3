"use client";

import ContentPage from "@/components/ContentPage";

export default function JewsInAsiaPage() {
  return (
    <ContentPage
      namespace="jewsInAsia"
      titleKey="title"
      subtitleKey="subtitle"
      sections={[
        { titleKey: "kaifeng", descKey: "kaifengDesc" },
        { titleKey: "shanghai", descKey: "shanghaiDesc" },
        { titleKey: "japan", descKey: "japanDesc" },
        { titleKey: "india", descKey: "indiaDesc" },
        { titleKey: "modernAsia", descKey: "modernAsiaDesc" },
      ]}
      relatedLinks={[
        { href: "/ashkenazi-sephardi", labelKey: "Ashkenazi & Sephardi", labelNs: "nav" },
        { href: "/jewish-history", labelKey: "Jewish History", labelNs: "nav" },
      ]}
    />
  );
}
