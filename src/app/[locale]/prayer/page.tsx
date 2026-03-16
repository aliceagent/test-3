"use client";

import ContentPage from "@/components/ContentPage";

export default function PrayerPage() {
  return (
    <ContentPage
      namespace="prayer"
      titleKey="title"
      subtitleKey="subtitle"
      sections={[
        { titleKey: "overview", descKey: "overviewDesc" },
        { titleKey: "morningPrayer", descKey: "morningPrayerDesc" },
        { titleKey: "afternoonPrayer", descKey: "afternoonPrayerDesc" },
        { titleKey: "eveningPrayer", descKey: "eveningPrayerDesc" },
        { titleKey: "shema", descKey: "shemaDesc" },
        { titleKey: "amidah", descKey: "amidahDesc" },
        { titleKey: "blessings", descKey: "blessingsDesc" },
        { titleKey: "graceMeals", descKey: "graceMealsDesc" },
        { titleKey: "holidayPrayers", descKey: "holidayPrayersDesc" },
        { titleKey: "shabbatPrayers", descKey: "shabbatPrayersDesc" },
        { titleKey: "audioSection", descKey: "audioDesc", audioPlaceholder: true },
      ]}
      relatedLinks={[
        { href: "/shabbat", labelKey: "Shabbat", labelNs: "nav" },
        { href: "/hebrew-learning", labelKey: "Learn Hebrew", labelNs: "nav" },
      ]}
    />
  );
}
