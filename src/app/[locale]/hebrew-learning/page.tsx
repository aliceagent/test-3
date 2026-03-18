"use client";

import ContentPage from "@/components/ContentPage";

export default function HebrewLearningPage() {
  return (
    <ContentPage
      namespace="hebrewLearning"
      titleKey="title"
      subtitleKey="subtitle"
      sections={[
        { titleKey: "alphabet" },
        { titleKey: "basicWords" },
        { titleKey: "prayerHebrew" },
        { titleKey: "torahReading" },
        { titleKey: "audioLessons", audioPlaceholder: true },
        { titleKey: "resources" },
      ]}
      relatedLinks={[
        { href: "/prayer", labelKey: "Prayer", labelNs: "nav" },
        { href: "/torah-study", labelKey: "Torah Study", labelNs: "nav" },
      ]}
    />
  );
}
