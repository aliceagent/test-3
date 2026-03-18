"use client";

import ContentPage from "@/components/ContentPage";

export default function TorahStudyPage() {
  return (
    <ContentPage
      namespace="torahStudy"
      titleKey="title"
      subtitleKey="subtitle"
      sections={[
        { titleKey: "genesis", descKey: "genesisDesc" },
        { titleKey: "exodus", descKey: "exodusDesc" },
        { titleKey: "leviticus", descKey: "leviticusDesc" },
        { titleKey: "numbers", descKey: "numbersDesc" },
        { titleKey: "deuteronomy", descKey: "deuteronomyDesc" },
      ]}
      relatedLinks={[
        { href: "/thirteen-principles", labelKey: "13 Principles", labelNs: "nav" },
        { href: "/jewish-history", labelKey: "Jewish History", labelNs: "nav" },
      ]}
    />
  );
}
