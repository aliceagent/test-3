"use client";

import ContentPage from "@/components/ContentPage";

export default function JewishHomePage() {
  return (
    <ContentPage
      namespace="jewishHome"
      titleKey="title"
      subtitleKey="subtitle"
      sections={[
        { titleKey: "mezuzah" },
        { titleKey: "kitchen" },
        { titleKey: "atmosphere" },
      ]}
      relatedLinks={[
        { href: "/life-cycle", labelKey: "lifeCycle", labelNs: "nav" },
        { href: "/family-purity", labelKey: "familyPurity", labelNs: "nav" },
      ]}
    />
  );
}
