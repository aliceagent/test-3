"use client";

import ContentPage from "@/components/ContentPage";

export default function KosherFoodPage() {
  return (
    <ContentPage
      namespace="kosherFood"
      titleKey="title"
      subtitleKey="subtitle"
      sections={[
        { titleKey: "whatIsKosher" },
        { titleKey: "identifyingKosher" },
        { titleKey: "kosherSymbols", imagePlaceholder: true },
        { titleKey: "meatAndMilk" },
        { titleKey: "kosherKitchen" },
        { titleKey: "bugChecking" },
        { titleKey: "passoverCooking" },
        { titleKey: "wineRules" },
        { titleKey: "milkRules" },
        { titleKey: "breadRules" },
        { titleKey: "eatingOut" },
      ]}
    />
  );
}
