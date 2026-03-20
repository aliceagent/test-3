"use client";

import ContentPage from "@/components/ContentPage";

export default function ClothingModestyPage() {
  return (
    <ContentPage
      namespace="clothingModesty"
      titleKey="title"
      subtitleKey="subtitle"
      sections={[
        { titleKey: "overview" },
        { titleKey: "mensClothing" },
        { titleKey: "womensClothing" },
        { titleKey: "hairCovering" },
        { titleKey: "hairCoveringStyles", imagePlaceholder: true },
        { titleKey: "tichels", videoPlaceholder: true },
        { titleKey: "wigs", imagePlaceholder: true },
        { titleKey: "interactionRules" },
        { titleKey: "yichud" },
        { titleKey: "negiah" },
      ]}
    />
  );
}
