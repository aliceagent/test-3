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
        { titleKey: "principle1", descKey: "principle1Desc" },
        { titleKey: "principle2", descKey: "principle2Desc" },
        { titleKey: "principle3", descKey: "principle3Desc" },
        { titleKey: "principle4", descKey: "principle4Desc" },
        { titleKey: "principle5", descKey: "principle5Desc" },
        { titleKey: "principle6", descKey: "principle6Desc" },
        { titleKey: "principle7", descKey: "principle7Desc" },
        { titleKey: "principle8", descKey: "principle8Desc" },
        { titleKey: "principle9", descKey: "principle9Desc" },
        { titleKey: "principle10", descKey: "principle10Desc" },
        { titleKey: "principle11", descKey: "principle11Desc" },
        { titleKey: "principle12", descKey: "principle12Desc" },
        { titleKey: "principle13", descKey: "principle13Desc" },
      ]}
      relatedLinks={[
        { href: "/philosophy", labelKey: "Jewish Philosophy", labelNs: "nav" },
        { href: "/torah-study", labelKey: "Torah Study", labelNs: "nav" },
      ]}
    />
  );
}
