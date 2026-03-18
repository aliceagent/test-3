"use client";

import ContentPage from "@/components/ContentPage";

export default function TenCommandmentsPage() {
  return (
    <ContentPage
      namespace="tenCommandments"
      titleKey="title"
      subtitleKey="subtitle"
      sections={[
        { titleKey: "honorParents", descKey: "honorParentsDesc" },
        { titleKey: "honorParentsConvert", descKey: "honorParentsDesc" },
      ]}
      relatedLinks={[
        { href: "/thirteen-principles", labelKey: "13 Principles", labelNs: "nav" },
        { href: "/philosophy", labelKey: "Philosophy", labelNs: "nav" },
      ]}
    />
  );
}
