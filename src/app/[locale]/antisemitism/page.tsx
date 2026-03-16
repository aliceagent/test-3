"use client";

import ContentPage from "@/components/ContentPage";

export default function AntisemitismPage() {
  return (
    <ContentPage
      namespace="antisemitism"
      titleKey="title"
      subtitleKey="subtitle"
      sections={[
        { titleKey: "history", descKey: "historyDesc" },
        { titleKey: "tropes", descKey: "tropesDesc" },
        { titleKey: "genocide", descKey: "genocideDesc" },
        { titleKey: "modern", descKey: "modernDesc" },
        { titleKey: "howToRespond", descKey: "howToRespondDesc" },
      ]}
      relatedLinks={[
        { href: "/jewish-history", labelKey: "Jewish History", labelNs: "nav" },
        { href: "/jews-in-asia", labelKey: "Jews in Asia", labelNs: "nav" },
      ]}
    />
  );
}
