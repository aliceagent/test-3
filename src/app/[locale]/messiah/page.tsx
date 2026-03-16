"use client";

import ContentPage from "@/components/ContentPage";

export default function MessiahPage() {
  return (
    <ContentPage
      namespace="messiah"
      titleKey="title"
      subtitleKey="subtitle"
      sections={[
        { titleKey: "whoIsMashiach" },
        { titleKey: "requirements" },
        { titleKey: "whatWillHappen" },
        { titleKey: "rebuildingTemple" },
        { titleKey: "falseMessiahs" },
      ]}
      relatedLinks={[
        { href: "/jewish-history", labelKey: "Jewish History", labelNs: "nav" },
        { href: "/thirteen-principles", labelKey: "13 Principles", labelNs: "nav" },
      ]}
    />
  );
}
