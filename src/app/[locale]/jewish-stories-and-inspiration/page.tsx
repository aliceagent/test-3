"use client";

import ContentPage from "@/components/ContentPage";

export default function JewishStoriesPage() {
  return (
    <ContentPage
      namespace="jewishStoriesAndInspiration"
      titleKey="title"
      subtitleKey="subtitle"
      sections={[
        { titleKey: "sages" },
        { titleKey: "chassidic" },
        { titleKey: "biblical" },
        { titleKey: "mystical" },
      ]}
      relatedLinks={[
        { href: "/jewish-history", labelKey: "jewishHistory", labelNs: "nav" },
        { href: "/pirkei-avot", labelKey: "pirkeiAvot", labelNs: "nav" },
      ]}
    />
  );
}
