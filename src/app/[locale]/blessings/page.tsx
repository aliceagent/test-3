"use client";

import ContentPage from "@/components/ContentPage";

export default function BlessingsPage() {
  return (
    <ContentPage
      namespace="blessings"
      titleKey="title"
      subtitleKey="subtitle"
      sections={[
        { titleKey: "overview" },
        { titleKey: "morningBlessings" },
        { titleKey: "foodBlessings" },
        { titleKey: "mezonot" },
        { titleKey: "hagafen" },
        { titleKey: "haetz" },
        { titleKey: "haadama" },
        { titleKey: "shehakol" },
        { titleKey: "afterBlessings" },
        { titleKey: "specialBlessings" },
        { titleKey: "bathroom" },
        { titleKey: "thunder" },
      ]}
      relatedLinks={[
        { href: "/prayer", labelKey: "prayer", labelNs: "nav" },
        { href: "/kosher-food", labelKey: "kosherFood", labelNs: "nav" },
      ]}
    />
  );
}
