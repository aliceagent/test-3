"use client";

import ContentPage from "@/components/ContentPage";

export default function ShabbatPage() {
  return (
    <ContentPage
      namespace="shabbat"
      titleKey="title"
      subtitleKey="subtitle"
      sections={[
        { titleKey: "overview" },
        { titleKey: "thirtyNineMelachot" },
        { titleKey: "howToObserve" },
        { titleKey: "shabbatCandles" },
        { titleKey: "kiddush" },
        { titleKey: "challah" },
        { titleKey: "challahBraiding", videoPlaceholder: true },
        { titleKey: "shabbatMeals" },
        { titleKey: "zmiros", audioPlaceholder: true },
        { titleKey: "boardGames" },
        { titleKey: "emergencies" },
        { titleKey: "childbirth" },
        { titleKey: "havdalah" },
      ]}
    />
  );
}
