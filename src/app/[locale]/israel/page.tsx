"use client";

import ContentPage from "@/components/ContentPage";

export default function IsraelPage() {
  return (
    <ContentPage
      namespace="israel"
      titleKey="title"
      subtitleKey="subtitle"
      sections={[
        { titleKey: "overview" },
        { titleKey: "biblicalPromise" },
        { titleKey: "holySites" },
        { titleKey: "westernWall" },
        { titleKey: "jerusalem" },
        { titleKey: "modernState" },
        { titleKey: "prayerConnection" },
        { titleKey: "visiting" },
      ]}
      relatedLinks={[
        { href: "/jewish-history", labelKey: "jewishHistory", labelNs: "nav" },
        { href: "/messiah", labelKey: "messiah", labelNs: "nav" },
      ]}
    />
  );
}
