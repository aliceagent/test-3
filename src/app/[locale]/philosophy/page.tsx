"use client";

import ContentPage from "@/components/ContentPage";

export default function PhilosophyPage() {
  return (
    <ContentPage
      namespace="philosophy"
      titleKey="title"
      subtitleKey="subtitle"
      sections={[
        { titleKey: "godExistence" },
        { titleKey: "connectingToGod" },
        { titleKey: "purposeOfLife" },
        { titleKey: "whyNotChristianity" },
        { titleKey: "whyNotIslam" },
        { titleKey: "torahTruth" },
        { titleKey: "freeWill" },
      ]}
      relatedLinks={[
        { href: "/thirteen-principles", labelKey: "13 Principles", labelNs: "nav" },
        { href: "/jewish-texts", labelKey: "Jewish Texts", labelNs: "nav" },
      ]}
    />
  );
}
