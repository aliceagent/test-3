"use client";

import ContentPage from "@/components/ContentPage";

export default function MitzvahObjectsPage() {
  return (
    <ContentPage
      namespace="mitzvahObjects"
      titleKey="title"
      subtitleKey="subtitle"
      sections={[
        { titleKey: "overview" },
        { titleKey: "mezuzah" },
        { titleKey: "mezuzahPlacement" },
        { titleKey: "tefillin" },
        { titleKey: "tefillinHowTo", videoPlaceholder: true },
        { titleKey: "tzitzit" },
        { titleKey: "tallit" },
        { titleKey: "whereToBuy" },
      ]}
      relatedLinks={[
        { href: "/prayer", labelKey: "prayer", labelNs: "nav" },
        { href: "/clothing-modesty", labelKey: "clothingModesty", labelNs: "nav" },
      ]}
    />
  );
}
