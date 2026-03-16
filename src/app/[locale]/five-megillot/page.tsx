"use client";

import ContentPage from "@/components/ContentPage";

export default function FiveMegillotPage() {
  return (
    <ContentPage
      namespace="fiveMegillot"
      titleKey="title"
      subtitleKey="subtitle"
      sections={[
        { titleKey: "songOfSongs", descKey: "songOfSongsDesc" },
        { titleKey: "ruth", descKey: "ruthDesc" },
        { titleKey: "lamentations", descKey: "lamentationsDesc" },
        { titleKey: "ecclesiastes", descKey: "ecclesiastesDesc" },
        { titleKey: "esther", descKey: "estherDesc" },
      ]}
      relatedLinks={[
        { href: "/torah-study", labelKey: "Torah Study", labelNs: "nav" },
        { href: "/holidays", labelKey: "Holidays", labelNs: "nav" },
      ]}
    />
  );
}
