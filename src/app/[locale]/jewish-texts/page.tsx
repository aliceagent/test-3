"use client";

import ContentPage from "@/components/ContentPage";

export default function JewishTextsPage() {
  return (
    <ContentPage
      namespace="jewishTexts"
      titleKey="title"
      subtitleKey="subtitle"
      sections={[
        { titleKey: "tanya", descKey: "tanyaDesc" },
        { titleKey: "kuzari", descKey: "kuzariDesc" },
        { titleKey: "aryehKaplan", descKey: "aryehKaplanDesc" },
        { titleKey: "permissionBelieve", descKey: "permissionBelieveDesc" },
        { titleKey: "permissionReceive", descKey: "permissionReceiveDesc" },
      ]}
    />
  );
}
