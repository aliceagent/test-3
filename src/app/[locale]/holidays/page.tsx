"use client";

import ContentPage from "@/components/ContentPage";

export default function HolidaysPage() {
  return (
    <ContentPage
      namespace="holidays"
      titleKey="title"
      subtitleKey="subtitle"
      sections={[
        { titleKey: "roshHashana", descKey: "roshHashanaDesc" },
        { titleKey: "yomKippur", descKey: "yomKippurDesc" },
        { titleKey: "sukkot", descKey: "sukkotDesc" },
        { titleKey: "simchatTorah", descKey: "simchatTorahDesc" },
        { titleKey: "chanukah", descKey: "chanukahDesc" },
        { titleKey: "purim", descKey: "purimDesc" },
        { titleKey: "pesach", descKey: "pesachDesc" },
        { titleKey: "shavuot", descKey: "shavuotDesc" },
        { titleKey: "tishaBav", descKey: "tishaBavDesc" },
        { titleKey: "tuBishvat", descKey: "tuBishvatDesc" },
        { titleKey: "lagBaomer", descKey: "lagBaomerDesc" },
        { titleKey: "fastDays", descKey: "fastDaysDesc" },
      ]}
    />
  );
}
