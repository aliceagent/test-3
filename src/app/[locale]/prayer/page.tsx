"use client";

import ContentPage from "@/components/ContentPage";

export default function PrayerPage() {
  return (
    <ContentPage
      namespace="prayer"
      titleKey="title"
      subtitleKey="subtitle"
      sections={[
        { titleKey: "overview" },
        { titleKey: "morningPrayer" },
        { titleKey: "afternoonPrayer" },
        { titleKey: "eveningPrayer" },
        { titleKey: "shema" },
        { titleKey: "amidah" },
        { titleKey: "blessings" },
        { titleKey: "graceMeals" },
        { titleKey: "holidayPrayers" },
        { titleKey: "shabbatPrayers" },
        { titleKey: "audioSection", descKey: "audioDesc", audioPlaceholder: true },
      ]}
      relatedLinks={[
        { href: "/shabbat", labelKey: "Shabbat", labelNs: "nav" },
        { href: "/hebrew-learning", labelKey: "Learn Hebrew", labelNs: "nav" },
      ]}
    />
  );
}
