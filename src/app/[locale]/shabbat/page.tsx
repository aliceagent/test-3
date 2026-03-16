"use client";

import ContentPage from "@/components/ContentPage";

export default function ShabbatPage() {
  return (
    <ContentPage
      namespace="shabbat"
      titleKey="title"
      subtitleKey="subtitle"
      sections={[
        { titleKey: "overview", descKey: "overviewDesc" },
        { titleKey: "thirtyNineMelachot", descKey: "thirtyNineMelachotDesc" },
        { titleKey: "howToObserve", descKey: "howToObserveDesc" },
        { titleKey: "shabbatCandles", descKey: "shabbatCandlesDesc" },
        { titleKey: "kiddush", descKey: "kiddushDesc" },
        { titleKey: "challah", descKey: "challahDesc" },
        { titleKey: "challahBraiding", descKey: "challahBraidingDesc", videoPlaceholder: true },
        { titleKey: "shabbatMeals", descKey: "shabbatMealsDesc" },
        { titleKey: "zmiros", descKey: "zmirosDesc", audioPlaceholder: true },
        { titleKey: "boardGames", descKey: "boardGamesDesc" },
        { titleKey: "emergencies", descKey: "emergenciesDesc" },
        { titleKey: "childbirth", descKey: "childbirthDesc" },
        { titleKey: "havdalah", descKey: "havdalahDesc" },
      ]}
    />
  );
}
