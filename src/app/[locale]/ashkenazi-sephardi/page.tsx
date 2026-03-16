"use client";

import ContentPage from "@/components/ContentPage";

export default function AshkenaziSephardiPage() {
  return (
    <ContentPage
      namespace="ashkenaziSephardi"
      titleKey="title"
      subtitleKey="subtitle"
      sections={[
        { titleKey: "overview", descKey: "overviewDesc" },
        { titleKey: "differences", descKey: "differencesDesc" },
        { titleKey: "similarities", descKey: "similaritiesDesc" },
        { titleKey: "history", descKey: "historyDesc" },
      ]}
      relatedLinks={[
        { href: "/jewish-history", labelKey: "Jewish History", labelNs: "nav" },
        { href: "/jews-in-asia", labelKey: "Jews in Asia", labelNs: "nav" },
      ]}
    />
  );
}
