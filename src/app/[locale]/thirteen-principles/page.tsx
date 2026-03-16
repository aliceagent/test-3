"use client";

import ContentPage from "@/components/ContentPage";

export default function ThirteenPrinciplesPage() {
  return (
    <ContentPage
      namespace="thirteenPrinciples"
      titleKey="title"
      subtitleKey="subtitle"
      sections={[
        { titleKey: "intro" },
        { titleKey: "principle1" },
        { titleKey: "principle2" },
        { titleKey: "principle3" },
        { titleKey: "principle4" },
        { titleKey: "principle5" },
        { titleKey: "principle6" },
        { titleKey: "principle7" },
        { titleKey: "principle8" },
        { titleKey: "principle9" },
        { titleKey: "principle10" },
        { titleKey: "principle11" },
        { titleKey: "principle12" },
        { titleKey: "principle13" },
      ]}
      relatedLinks={[
        { href: "/philosophy", labelKey: "Jewish Philosophy", labelNs: "nav" },
        { href: "/torah-study", labelKey: "Torah Study", labelNs: "nav" },
      ]}
    />
  );
}
