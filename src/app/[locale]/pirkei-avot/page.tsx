"use client";

import ContentPage from "@/components/ContentPage";

export default function PirkeiAvotPage() {
  return (
    <ContentPage
      namespace="pirkeiAvot"
      titleKey="title"
      subtitleKey="subtitle"
      sections={[
        { titleKey: "overview" },
        { titleKey: "chapter1" },
        { titleKey: "chapter2" },
        { titleKey: "chapter3" },
        { titleKey: "chapter4" },
        { titleKey: "chapter5" },
        { titleKey: "chapter6" },
        { titleKey: "studySchedule" },
      ]}
      relatedLinks={[
        { href: "/jewish-texts", labelKey: "jewishTexts", labelNs: "nav" },
        { href: "/philosophy", labelKey: "philosophy", labelNs: "nav" },
      ]}
    />
  );
}
