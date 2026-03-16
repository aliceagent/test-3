"use client";

import ContentPage from "@/components/ContentPage";

export default function JewishHistoryPage() {
  return (
    <ContentPage
      namespace="jewishHistory"
      titleKey="title"
      subtitleKey="subtitle"
      sections={[
        { titleKey: "abraham", descKey: "abrahamDesc" },
        { titleKey: "patriarchs", descKey: "patriarchsDesc" },
        { titleKey: "egypt", descKey: "egyptDesc" },
        { titleKey: "exodus_event", descKey: "exodus_eventDesc" },
        { titleKey: "sinai", descKey: "sinaiDesc" },
        { titleKey: "wilderness", descKey: "wildernessDesc" },
        { titleKey: "enteringIsrael", descKey: "enteringIsraelDesc" },
        { titleKey: "amalek", descKey: "amalekDesc" },
        { titleKey: "judges", descKey: "judgesDesc" },
        { titleKey: "kingDavid", descKey: "kingDavidDesc" },
        { titleKey: "solomonTemple", descKey: "solomonTempleDesc" },
        { titleKey: "firstTempleDestruction", descKey: "firstTempleDestructionDesc" },
        { titleKey: "babylonianExile", descKey: "babylonianExileDesc" },
        { titleKey: "persianEmpire", descKey: "persianEmpireDesc" },
        { titleKey: "estherDaniel", descKey: "estherDanielDesc" },
        { titleKey: "secondTemple", descKey: "secondTempleDesc" },
        { titleKey: "hellenistic", descKey: "hellenisticDesc" },
        { titleKey: "chanukahHistory", descKey: "chanukahHistoryDesc" },
        { titleKey: "secondTempleDestruction", descKey: "secondTempleDestructionDesc" },
        { titleKey: "tishaBavMourning", descKey: "tishaBavMourningDesc" },
      ]}
      relatedLinks={[
        { href: "/tabernacle", labelKey: "The Tabernacle", labelNs: "nav" },
        { href: "/messiah", labelKey: "The Messiah", labelNs: "nav" },
      ]}
    />
  );
}
