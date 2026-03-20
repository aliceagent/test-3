"use client";

import ContentPage from "@/components/ContentPage";

export default function PracticalHalachaPage() {
  return (
    <ContentPage
      namespace="practicalHalachaForDailyLife"
      titleKey="title"
      subtitleKey="subtitle"
      sections={[
        { titleKey: "morningRoutine" },
        { titleKey: "dietaryLaws" },
        { titleKey: "businessEthics" },
        { titleKey: "interpersonal" },
        { titleKey: "animalWelfare" },
      ]}
      relatedLinks={[
        { href: "/blessings", labelKey: "blessings", labelNs: "nav" },
        { href: "/kosher-food", labelKey: "kosherFood", labelNs: "nav" },
      ]}
    />
  );
}
