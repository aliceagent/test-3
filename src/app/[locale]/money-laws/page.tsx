"use client";

import ContentPage from "@/components/ContentPage";

export default function MoneyLawsPage() {
  return (
    <ContentPage
      namespace="moneyLaws"
      titleKey="title"
      subtitleKey="subtitle"
      sections={[
        { titleKey: "overview" },
        { titleKey: "honesty" },
        { titleKey: "charity" },
        { titleKey: "lending" },
        { titleKey: "employees" },
        { titleKey: "maaser" },
      ]}
      relatedLinks={[
        { href: "/ten-commandments", labelKey: "Ten Commandments", labelNs: "nav" },
        { href: "/philosophy", labelKey: "Philosophy", labelNs: "nav" },
      ]}
    />
  );
}
