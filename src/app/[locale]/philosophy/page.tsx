"use client";

import ContentPage from "@/components/ContentPage";

export default function PhilosophyPage() {
  return (
    <ContentPage
      namespace="philosophy"
      titleKey="title"
      subtitleKey="subtitle"
      sections={[
        { titleKey: "godExistence", descKey: "godExistenceDesc" },
        { titleKey: "connectingToGod", descKey: "connectingToGodDesc" },
        { titleKey: "purposeOfLife", descKey: "purposeOfLifeDesc" },
        { titleKey: "whyNotChristianity", descKey: "whyNotChristianityDesc" },
        { titleKey: "whyNotIslam", descKey: "whyNotIslamDesc" },
        { titleKey: "torahTruth", descKey: "torahTruthDesc" },
        { titleKey: "freeWill", descKey: "freeWillDesc" },
      ]}
      relatedLinks={[
        { href: "/thirteen-principles", labelKey: "13 Principles", labelNs: "nav" },
        { href: "/jewish-texts", labelKey: "Jewish Texts", labelNs: "nav" },
      ]}
    />
  );
}
