"use client";

import ContentPage from "@/components/ContentPage";

export default function TabernaclePage() {
  return (
    <ContentPage
      namespace="tabernacle"
      titleKey="title"
      subtitleKey="subtitle"
      sections={[
        { titleKey: "overview", descKey: "overviewDesc" },
        { titleKey: "structure", descKey: "structureDesc", imagePlaceholder: true },
        { titleKey: "holyItems", descKey: "holyItemsDesc" },
        { titleKey: "ark", descKey: "arkDesc" },
        { titleKey: "menorah", descKey: "menorahDesc" },
        { titleKey: "altars", descKey: "altarsDesc" },
        { titleKey: "priestGarments", descKey: "priestGarmentsDesc", imagePlaceholder: true },
        { titleKey: "service", descKey: "serviceDesc" },
        { titleKey: "spiritualMeaning", descKey: "spiritualMeaningDesc" },
      ]}
      relatedLinks={[
        { href: "/jewish-history", labelKey: "Jewish History", labelNs: "nav" },
        { href: "/prayer", labelKey: "Prayer", labelNs: "nav" },
      ]}
    />
  );
}
