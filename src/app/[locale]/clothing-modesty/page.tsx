"use client";

import ContentPage from "@/components/ContentPage";

export default function ClothingModestyPage() {
  return (
    <ContentPage
      namespace="clothingModesty"
      titleKey="title"
      subtitleKey="subtitle"
      sections={[
        { titleKey: "overview", descKey: "overviewDesc" },
        { titleKey: "mensClothing", descKey: "mensClothingDesc" },
        { titleKey: "womensClothing", descKey: "womensClothingDesc" },
        { titleKey: "hairCovering", descKey: "hairCoveringDesc" },
        { titleKey: "hairCoveringStyles", descKey: "hairCoveringStylesDesc", imagePlaceholder: true },
        { titleKey: "tichels", descKey: "tichelsDesc", videoPlaceholder: true },
        { titleKey: "wigs", descKey: "wigsDesc", imagePlaceholder: true },
        { titleKey: "interactionRules", descKey: "interactionRulesDesc" },
        { titleKey: "yichud", descKey: "yichudDesc" },
        { titleKey: "negiah", descKey: "neigiahDesc" },
      ]}
    />
  );
}
