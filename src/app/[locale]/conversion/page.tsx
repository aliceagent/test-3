"use client";

import ContentPage from "@/components/ContentPage";

export default function ConversionPage() {
  return (
    <ContentPage
      namespace="conversion"
      titleKey="title"
      subtitleKey="subtitle"
      sections={[
        { titleKey: "overview" },
        { titleKey: "whyConvert" },
        { titleKey: "process" },
        { titleKey: "study" },
        { titleKey: "beitDin" },
        { titleKey: "mikvah" },
        { titleKey: "britMilah" },
        { titleKey: "livingAsConvert" },
        { titleKey: "famousConverts" },
        { titleKey: "resourcesAsia" },
      ]}
      relatedLinks={[
        { href: "/mentorship", labelKey: "mentorship", labelNs: "nav" },
        { href: "/life-cycle", labelKey: "lifeCycle", labelNs: "nav" },
      ]}
    />
  );
}
