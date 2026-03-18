"use client";

import ContentPage from "@/components/ContentPage";

export default function MussarPage() {
  return (
    <ContentPage
      namespace="mussar"
      titleKey="title"
      subtitleKey="subtitle"
      sections={[
        { titleKey: "overview" },
        { titleKey: "middot" },
        { titleKey: "mesillatYesharim" },
        { titleKey: "orchotTzaddikim" },
        { titleKey: "chovotHalevavot" },
        { titleKey: "dailyPractice" },
        { titleKey: "cheshbonHanefesh" },
        { titleKey: "chineseParallels" },
      ]}
      relatedLinks={[
        { href: "/philosophy", labelKey: "philosophy", labelNs: "nav" },
        { href: "/jewish-texts", labelKey: "jewishTexts", labelNs: "nav" },
      ]}
    />
  );
}
