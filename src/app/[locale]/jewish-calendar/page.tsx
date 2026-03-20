"use client";

import ContentPage from "@/components/ContentPage";

export default function JewishCalendarPage() {
  return (
    <ContentPage
      namespace="jewishCalendar"
      titleKey="title"
      subtitleKey="subtitle"
      sections={[
        { titleKey: "overview" },
        { titleKey: "howItWorks" },
        { titleKey: "months" },
        { titleKey: "roshChodesh" },
        { titleKey: "shabbat" },
        { titleKey: "holidays" },
        { titleKey: "countingOmer" },
        { titleKey: "shmitah" },
        { titleKey: "practicalTools" },
      ]}
      relatedLinks={[
        { href: "/holidays", labelKey: "holidays", labelNs: "nav" },
        { href: "/shabbat", labelKey: "shabbat", labelNs: "nav" },
      ]}
    />
  );
}
