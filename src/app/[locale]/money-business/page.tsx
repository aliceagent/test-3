"use client";

import ContentPage from "@/components/ContentPage";

export default function MoneyBusinessPage() {
  return (
    <ContentPage
      namespace="moneyBusiness"
      titleKey="title"
      subtitleKey="subtitle"
      sections={[
        { titleKey: "charity" },
        { titleKey: "interest" },
        { titleKey: "honesty" },
        { titleKey: "fairCompetition" },
        { titleKey: "workers" },
      ]}
      relatedLinks={[
        { href: "/money-laws", labelKey: "moneyLaws", labelNs: "nav" },
        { href: "/jewish-values", labelKey: "jewishValues", labelNs: "nav" },
      ]}
    />
  );
}
