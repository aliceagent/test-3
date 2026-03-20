"use client";

import ContentPage from "@/components/ContentPage";

export default function JewishValuesPage() {
  return (
    <ContentPage
      namespace="jewishValues"
      titleKey="title"
      subtitleKey="subtitle"
      sections={[
        { titleKey: "tzedakah" },
        { titleKey: "honorParents" },
        { titleKey: "speech" },
        { titleKey: "hospitality" },
        { titleKey: "goodManners" },
      ]}
      relatedLinks={[
        { href: "/mussar", labelKey: "mussar", labelNs: "nav" },
        { href: "/pirkei-avot", labelKey: "pirkeiAvot", labelNs: "nav" },
      ]}
    />
  );
}
