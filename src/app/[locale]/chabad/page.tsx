"use client";

import ContentPage from "@/components/ContentPage";

export default function ChabadPage() {
  return (
    <ContentPage
      namespace="chabad"
      titleKey="title"
      subtitleKey="subtitle"
      sections={[
        { titleKey: "whatIsChabad" },
        { titleKey: "history" },
        { titleKey: "rebbes" },
        { titleKey: "philosophy_section" },
        { titleKey: "globalInfluence" },
        { titleKey: "findCenter" },
      ]}
      relatedLinks={[
        { href: "/jewish-texts", labelKey: "Jewish Texts", labelNs: "nav" },
        { href: "/mentorship", labelKey: "Mentorship", labelNs: "nav" },
      ]}
    />
  );
}
