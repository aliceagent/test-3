"use client";

import ContentPage from "@/components/ContentPage";

export default function WeeklyParshaPage() {
  return (
    <ContentPage
      namespace="weeklyParsha"
      titleKey="title"
      subtitleKey="subtitle"
      sections={[
        { titleKey: "overview" },
        { titleKey: "thisWeek" },
        { titleKey: "summary" },
        { titleKey: "keyThemes" },
        { titleKey: "shabbatTable" },
        { titleKey: "dvarTorah" },
        { titleKey: "discussionQuestions" },
        { titleKey: "familyActivity" },
        { titleKey: "parshaSchedule" },
      ]}
      relatedLinks={[
        { href: "/torah-study", labelKey: "torahStudy", labelNs: "nav" },
        { href: "/shabbat", labelKey: "shabbat", labelNs: "nav" },
      ]}
    />
  );
}
