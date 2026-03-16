"use client";

import ContentPage from "@/components/ContentPage";

export default function JewishHistoryPage() {
  return (
    <ContentPage
      namespace="jewishHistory"
      titleKey="title"
      subtitleKey="subtitle"
      sections={[
        { titleKey: "abraham" },
        { titleKey: "patriarchs" },
        { titleKey: "egypt" },
        { titleKey: "exodus_event" },
        { titleKey: "sinai" },
        { titleKey: "wilderness" },
        { titleKey: "enteringIsrael" },
        { titleKey: "amalek" },
        { titleKey: "judges" },
        { titleKey: "kingDavid" },
        { titleKey: "solomonTemple" },
        { titleKey: "firstTempleDestruction" },
        { titleKey: "babylonianExile" },
        { titleKey: "persianEmpire" },
        { titleKey: "estherDaniel" },
        { titleKey: "secondTemple" },
        { titleKey: "hellenistic" },
        { titleKey: "chanukahHistory" },
        { titleKey: "secondTempleDestruction" },
        { titleKey: "tishaBavMourning" },
      ]}
      relatedLinks={[
        { href: "/tabernacle", labelKey: "The Tabernacle", labelNs: "nav" },
        { href: "/messiah", labelKey: "The Messiah", labelNs: "nav" },
      ]}
    />
  );
}
