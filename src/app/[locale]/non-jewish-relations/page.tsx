"use client";

import ContentPage from "@/components/ContentPage";

export default function NonJewishRelationsPage() {
  return (
    <ContentPage
      namespace="nonJewishRelations"
      titleKey="title"
      subtitleKey="subtitle"
      sections={[
        { titleKey: "overview", descKey: "overviewDesc" },
        { titleKey: "noahideLaws", descKey: "noahideLawsDesc" },
        { titleKey: "wineRules", descKey: "wineRulesDesc" },
        { titleKey: "milkBreadRules", descKey: "milkBreadRulesDesc" },
        { titleKey: "friendship", descKey: "friendshipDesc" },
        { titleKey: "workplace", descKey: "workplaceDesc" },
      ]}
      relatedLinks={[
        { href: "/kosher-food", labelKey: "Kosher Food", labelNs: "nav" },
        { href: "/philosophy", labelKey: "Philosophy", labelNs: "nav" },
      ]}
    />
  );
}
