"use client";

import ContentPage from "@/components/ContentPage";

export default function LifeCyclePage() {
  return (
    <ContentPage
      namespace="lifeCycle"
      titleKey="title"
      subtitleKey="subtitle"
      sections={[
        { titleKey: "birth" },
        { titleKey: "brisMilah" },
        { titleKey: "barBatMitzvah" },
        { titleKey: "wedding" },
        { titleKey: "chuppah" },
        { titleKey: "shevaBrachot" },
        { titleKey: "funeral" },
        { titleKey: "shiva" },
        { titleKey: "mourningPeriods" },
        { titleKey: "yahrzeit" },
      ]}
      relatedLinks={[
        { href: "/family-purity", labelKey: "Family Purity", labelNs: "nav" },
        { href: "/matchmaking", labelKey: "Matchmaking", labelNs: "nav" },
      ]}
    />
  );
}
