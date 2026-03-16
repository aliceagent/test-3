"use client";

import ContentPage from "@/components/ContentPage";

export default function LifeCyclePage() {
  return (
    <ContentPage
      namespace="lifeCycle"
      titleKey="title"
      subtitleKey="subtitle"
      sections={[
        { titleKey: "birth", descKey: "birthDesc" },
        { titleKey: "brisMilah", descKey: "brisMilahDesc" },
        { titleKey: "barBatMitzvah", descKey: "barBatMitzvahDesc" },
        { titleKey: "wedding", descKey: "weddingDesc" },
        { titleKey: "chuppah", descKey: "chuppahDesc" },
        { titleKey: "shevaBrachot", descKey: "shevaBrachotDesc" },
        { titleKey: "funeral", descKey: "funeralDesc" },
        { titleKey: "shiva", descKey: "shivaDesc" },
        { titleKey: "mourningPeriods", descKey: "mourningPeriodsDesc" },
        { titleKey: "yahrzeit", descKey: "yahrzeitDesc" },
      ]}
      relatedLinks={[
        { href: "/family-purity", labelKey: "Family Purity", labelNs: "nav" },
        { href: "/matchmaking", labelKey: "Matchmaking", labelNs: "nav" },
      ]}
    />
  );
}
