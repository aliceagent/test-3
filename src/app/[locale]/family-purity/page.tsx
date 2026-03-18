"use client";

import ContentPage from "@/components/ContentPage";

export default function FamilyPurityPage() {
  return (
    <ContentPage
      namespace="familyPurity"
      titleKey="title"
      subtitleKey="subtitle"
      sections={[
        { titleKey: "overview" },
        { titleKey: "whatIsMikvah" },
        { titleKey: "womenMikvah" },
        { titleKey: "dishesMikvah" },
        { titleKey: "buildingMikvah" },
        { titleKey: "findMikvah" },
      ]}
      relatedLinks={[
        { href: "/life-cycle", labelKey: "Life Cycle", labelNs: "nav" },
        { href: "/clothing-modesty", labelKey: "Clothing & Modesty", labelNs: "nav" },
      ]}
    />
  );
}
