"use client";

import ContentPage from "@/components/ContentPage";

export default function HolidaysPage() {
  return (
    <ContentPage
      namespace="holidays"
      titleKey="title"
      subtitleKey="subtitle"
      sections={[
        { titleKey: "roshHashana" },
        { titleKey: "yomKippur" },
        { titleKey: "sukkot" },
        { titleKey: "simchatTorah" },
        { titleKey: "chanukah" },
        { titleKey: "purim" },
        { titleKey: "pesach" },
        { titleKey: "shavuot" },
        { titleKey: "tishaBav" },
        { titleKey: "tuBishvat" },
        { titleKey: "lagBaomer" },
        { titleKey: "fastDays" },
      ]}
    />
  );
}
