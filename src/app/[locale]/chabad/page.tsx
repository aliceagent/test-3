"use client";

import ContentPage from "@/components/ContentPage";

export default function ChabadPage() {
  return (
    <ContentPage
      namespace="chabad"
      titleKey="title"
      subtitleKey="subtitle"
      sections={[
        { titleKey: "whatIsChabad", descKey: "whatIsChabadDesc" },
        { titleKey: "history", descKey: "historyDesc" },
        { titleKey: "rebbes", descKey: "rebbесDesc" },
        { titleKey: "philosophy_section", descKey: "philosophy_sectionDesc" },
        { titleKey: "globalInfluence", descKey: "globalInfluenceDesc" },
        { titleKey: "findCenter", descKey: "findCenterDesc" },
      ]}
      relatedLinks={[
        { href: "/jewish-texts", labelKey: "Jewish Texts", labelNs: "nav" },
        { href: "/mentorship", labelKey: "Mentorship", labelNs: "nav" },
      ]}
    />
  );
}
