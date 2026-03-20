"use client";

import ContentPage from "@/components/ContentPage";

export default function JewsInAsiaExpandedPage() {
  return (
    <ContentPage
      namespace="jewsInAsiaExpanded"
      titleKey="title"
      subtitleKey="subtitle"
      sections={[
        { titleKey: "landmarks" },
        { titleKey: "rescuers" },
        { titleKey: "communities" },
        { titleKey: "perception" },
      ]}
      relatedLinks={[
        { href: "/jews-in-asia", labelKey: "jewsInAsia", labelNs: "nav" },
        { href: "/jewish-history", labelKey: "jewishHistory", labelNs: "nav" },
      ]}
    />
  );
}
