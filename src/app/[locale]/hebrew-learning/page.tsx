"use client";

import ContentPage from "@/components/ContentPage";

export default function HebrewLearningPage() {
  return (
    <ContentPage
      namespace="hebrewLearning"
      titleKey="title"
      subtitleKey="subtitle"
      sections={[
        { titleKey: "alphabet", descKey: "alphabetDesc" },
        { titleKey: "basicWords", descKey: "basicWordsDesc" },
        { titleKey: "prayerHebrew", descKey: "prayerHebrewDesc" },
        { titleKey: "torahReading", descKey: "torahReadingDesc" },
        { titleKey: "audioLessons", descKey: "audioLessonsDesc", audioPlaceholder: true },
        { titleKey: "resources", descKey: "resourcesDesc" },
      ]}
      relatedLinks={[
        { href: "/prayer", labelKey: "Prayer", labelNs: "nav" },
        { href: "/torah-study", labelKey: "Torah Study", labelNs: "nav" },
      ]}
    />
  );
}
