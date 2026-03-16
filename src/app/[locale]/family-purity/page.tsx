"use client";

import ContentPage from "@/components/ContentPage";

export default function FamilyPurityPage() {
  return (
    <ContentPage
      namespace="familyPurity"
      titleKey="title"
      subtitleKey="subtitle"
      sections={[
        { titleKey: "overview", descKey: "overviewDesc" },
        { titleKey: "whatIsMikvah", descKey: "whatIsMikvahDesc" },
        { titleKey: "womenMikvah", descKey: "womenMikvahDesc" },
        { titleKey: "dishesMikvah", descKey: "dishesMikvahDesc" },
        { titleKey: "buildingMikvah", descKey: "buildingMikvahDesc" },
        { titleKey: "findMikvah", descKey: "findMikvahDesc" },
      ]}
      relatedLinks={[
        { href: "/life-cycle", labelKey: "Life Cycle", labelNs: "nav" },
        { href: "/clothing-modesty", labelKey: "Clothing & Modesty", labelNs: "nav" },
      ]}
    />
  );
}
