"use client";

import ContentPage from "@/components/ContentPage";

export default function KosherFoodPage() {
  return (
    <ContentPage
      namespace="kosherFood"
      titleKey="title"
      subtitleKey="subtitle"
      sections={[
        { titleKey: "whatIsKosher", descKey: "whatIsKosherDesc" },
        { titleKey: "identifyingKosher", descKey: "identifyingKosherDesc" },
        { titleKey: "kosherSymbols", descKey: "kosherSymbolsDesc", imagePlaceholder: true },
        { titleKey: "meatAndMilk", descKey: "meatAndMilkDesc" },
        { titleKey: "kosherKitchen", descKey: "kosherKitchenDesc" },
        { titleKey: "bugChecking", descKey: "bugCheckingDesc" },
        { titleKey: "passoverCooking", descKey: "passoverCookingDesc" },
        { titleKey: "wineRules", descKey: "wineRulesDesc" },
        { titleKey: "milkRules", descKey: "milkRulesDesc" },
        { titleKey: "breadRules", descKey: "breadRulesDesc" },
        { titleKey: "eatingOut", descKey: "eatingOutDesc" },
      ]}
    />
  );
}
