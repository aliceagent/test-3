"use client";

import ContentPage from "@/components/ContentPage";

export default function TabernaclePage() {
  return (
    <ContentPage
      namespace="tabernacle"
      titleKey="title"
      subtitleKey="subtitle"
      sections={[
        { titleKey: "overview" },
        { titleKey: "structure", imagePlaceholder: true },
        { titleKey: "holyItems" },
        { titleKey: "ark" },
        { titleKey: "menorah" },
        { titleKey: "altars" },
        { titleKey: "priestGarments", imagePlaceholder: true },
        { titleKey: "service" },
        { titleKey: "spiritualMeaning" },
      ]}
      relatedLinks={[
        { href: "/jewish-history", labelKey: "Jewish History", labelNs: "nav" },
        { href: "/prayer", labelKey: "Prayer", labelNs: "nav" },
      ]}
    />
  );
}
