"use client";

import ContentPage from "@/components/ContentPage";

export default function AntisemitismPage() {
  return (
    <ContentPage
      namespace="antisemitism"
      titleKey="title"
      subtitleKey="subtitle"
      sections={[
        { titleKey: "history" },
        { titleKey: "tropes" },
        { titleKey: "genocide" },
        { titleKey: "modern" },
        { titleKey: "howToRespond" },
      ]}
      relatedLinks={[
        { href: "/jewish-history", labelKey: "Jewish History", labelNs: "nav" },
        { href: "/jews-in-asia", labelKey: "Jews in Asia", labelNs: "nav" },
      ]}
    />
  );
}
