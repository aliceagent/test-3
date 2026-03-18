"use client";

import ContentPage from "@/components/ContentPage";

export default function AshkenaziSephardiPage() {
  return (
    <ContentPage
      namespace="ashkenaziSephardi"
      titleKey="title"
      subtitleKey="subtitle"
      sections={[
        { titleKey: "overview" },
        { titleKey: "differences" },
        { titleKey: "similarities" },
        { titleKey: "history" },
      ]}
      relatedLinks={[
        { href: "/jewish-history", labelKey: "Jewish History", labelNs: "nav" },
        { href: "/jews-in-asia", labelKey: "Jews in Asia", labelNs: "nav" },
      ]}
    />
  );
}
