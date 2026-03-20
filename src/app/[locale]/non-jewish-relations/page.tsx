"use client";

import ContentPage from "@/components/ContentPage";

export default function NonJewishRelationsPage() {
  return (
    <ContentPage
      namespace="nonJewishRelations"
      titleKey="title"
      subtitleKey="subtitle"
      sections={[
        { titleKey: "overview" },
        { titleKey: "noahideLaws" },
        { titleKey: "wineRules" },
        { titleKey: "milkBreadRules" },
        { titleKey: "friendship" },
        { titleKey: "workplace" },
      ]}
      relatedLinks={[
        { href: "/kosher-food", labelKey: "Kosher Food", labelNs: "nav" },
        { href: "/philosophy", labelKey: "Philosophy", labelNs: "nav" },
      ]}
    />
  );
}
