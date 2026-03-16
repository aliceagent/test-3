"use client";

import ContentPage from "@/components/ContentPage";

export default function FiveMegillotPage() {
  return (
    <ContentPage
      namespace="fiveMegillot"
      titleKey="title"
      subtitleKey="subtitle"
      sections={[
        { titleKey: "songOfSongs" },
        { titleKey: "ruth" },
        { titleKey: "lamentations" },
        { titleKey: "ecclesiastes" },
        { titleKey: "esther" },
      ]}
      relatedLinks={[
        { href: "/torah-study", labelKey: "Torah Study", labelNs: "nav" },
        { href: "/holidays", labelKey: "Holidays", labelNs: "nav" },
      ]}
    />
  );
}
