"use client";

import ContentPage from "@/components/ContentPage";

export default function MoneyLawsPage() {
  return (
    <ContentPage
      namespace="moneyLaws"
      titleKey="title"
      subtitleKey="subtitle"
      sections={[
        { titleKey: "overview", descKey: "overviewDesc" },
        { titleKey: "honesty", descKey: "honestyDesc" },
        { titleKey: "charity", descKey: "charityDesc" },
        { titleKey: "lending", descKey: "lendingDesc" },
        { titleKey: "employees", descKey: "employeesDesc" },
        { titleKey: "maaser", descKey: "maaserDesc" },
      ]}
      relatedLinks={[
        { href: "/ten-commandments", labelKey: "Ten Commandments", labelNs: "nav" },
        { href: "/philosophy", labelKey: "Philosophy", labelNs: "nav" },
      ]}
    />
  );
}
