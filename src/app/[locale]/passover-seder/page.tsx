"use client";

import ContentPage from "@/components/ContentPage";

export default function PassoverSederPage() {
  return (
    <ContentPage
      namespace="passoverSeder"
      titleKey="title"
      subtitleKey="subtitle"
      sections={[
        { titleKey: "whatIsSeder" },
        { titleKey: "sederPlate" },
        { titleKey: "fourCups" },
        { titleKey: "fifteenSteps" },
        { titleKey: "kadesh" },
        { titleKey: "urchatz" },
        { titleKey: "karpas" },
        { titleKey: "yachatz" },
        { titleKey: "maggid" },
        { titleKey: "fourQuestions" },
        { titleKey: "fourSons" },
        { titleKey: "rachtzah" },
        { titleKey: "motzimatzah" },
        { titleKey: "maror" },
        { titleKey: "korech" },
        { titleKey: "shulchanOrech" },
        { titleKey: "tzafun" },
        { titleKey: "barech" },
        { titleKey: "hallel" },
        { titleKey: "nirtzah" },
        { titleKey: "preparationChecklist" },
        { titleKey: "sederWithChildren" },
      ]}
    />
  );
}
