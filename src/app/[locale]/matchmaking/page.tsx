"use client";

import ContentPage from "@/components/ContentPage";

export default function MatchmakingPage() {
  return (
    <ContentPage
      namespace="matchmaking"
      titleKey="title"
      subtitleKey="subtitle"
      sections={[
        { titleKey: "whatIsShidduch", descKey: "whatIsShidduchDesc" },
        { titleKey: "process", descKey: "processDesc" },
        { titleKey: "dating", descKey: "datingDesc" },
        { titleKey: "contactMatchmaker", descKey: "contactDesc" },
      ]}
      relatedLinks={[
        { href: "/life-cycle", labelKey: "Life Cycle", labelNs: "nav" },
        { href: "/community", labelKey: "Community", labelNs: "nav" },
      ]}
    />
  );
}
