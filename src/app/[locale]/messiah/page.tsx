"use client";

import ContentPage from "@/components/ContentPage";

export default function MessiahPage() {
  return (
    <ContentPage
      namespace="messiah"
      titleKey="title"
      subtitleKey="subtitle"
      sections={[
        { titleKey: "whoIsMashiach", descKey: "whoIsMashiachDesc" },
        { titleKey: "requirements", descKey: "requirementsDesc" },
        { titleKey: "whatWillHappen", descKey: "whatWillHappenDesc" },
        { titleKey: "rebuildingTemple", descKey: "rebuildingTempleDesc" },
        { titleKey: "falseMessiahs", descKey: "falseMessiahsDesc" },
      ]}
      relatedLinks={[
        { href: "/jewish-history", labelKey: "Jewish History", labelNs: "nav" },
        { href: "/thirteen-principles", labelKey: "13 Principles", labelNs: "nav" },
      ]}
    />
  );
}
