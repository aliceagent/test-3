"use client";

import ContentPage from "@/components/ContentPage";

export default function JewishPhilosophyBigQuestionsPage() {
  return (
    <ContentPage
      namespace="jewishPhilosophyBigQuestions"
      titleKey="title"
      subtitleKey="subtitle"
      sections={[
        { titleKey: "existence" },
        { titleKey: "theodicy" },
        { titleKey: "afterlife" },
        { titleKey: "comparativeReligion" },
        { titleKey: "chosenPeople" },
        { titleKey: "faithAndReason" },
      ]}
      relatedLinks={[
        { href: "/philosophy", labelKey: "philosophy", labelNs: "nav" },
        { href: "/mussar", labelKey: "mussar", labelNs: "nav" },
      ]}
    />
  );
}
