import React from "react";
import { render, screen } from "@testing-library/react";

jest.mock("next-intl", () => ({
  useTranslations: (ns: string) => (key: string) => `${ns}.${key}`,
}));

jest.mock("@/i18n/navigation", () => ({
  Link: ({
    href,
    children,
  }: {
    href: string;
    children: React.ReactNode;
  }) => <a href={href}>{children}</a>,
}));

import ContentPage from "../../src/components/ContentPage";

describe("ContentPage component", () => {
  const defaultProps = {
    namespace: "torahStudy",
    titleKey: "title",
    subtitleKey: "subtitle",
    sections: [
      { titleKey: "genesis", descKey: "genesisDesc" },
      { titleKey: "exodus", descKey: "exodusDesc" },
    ],
  };

  test("renders the page title", () => {
    render(<ContentPage {...defaultProps} />);
    expect(screen.getByText("torahStudy.title")).toBeInTheDocument();
  });

  test("renders the subtitle", () => {
    render(<ContentPage {...defaultProps} />);
    expect(screen.getByText("torahStudy.subtitle")).toBeInTheDocument();
  });

  test("renders table of contents", () => {
    render(<ContentPage {...defaultProps} />);
    expect(screen.getByText("common.tableOfContents")).toBeInTheDocument();
  });

  test("renders all sections", () => {
    render(<ContentPage {...defaultProps} />);
    expect(screen.getAllByText("torahStudy.genesis").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("torahStudy.exodus").length).toBeGreaterThanOrEqual(1);
  });

  test("renders section descriptions", () => {
    render(<ContentPage {...defaultProps} />);
    expect(screen.getByText("torahStudy.genesisDesc")).toBeInTheDocument();
    expect(screen.getByText("torahStudy.exodusDesc")).toBeInTheDocument();
  });

  test("renders back to top link", () => {
    render(<ContentPage {...defaultProps} />);
    expect(screen.getByText(/common.backToTop/)).toBeInTheDocument();
  });

  test("renders related links when provided", () => {
    render(
      <ContentPage
        {...defaultProps}
        relatedLinks={[
          {
            href: "/jewish-history",
            labelKey: "Jewish History",
            labelNs: "nav",
          },
        ]}
      />
    );
    expect(screen.getByText("Jewish History")).toBeInTheDocument();
    expect(screen.getByText("common.relatedTopics")).toBeInTheDocument();
  });

  test("does not render related topics section when no links", () => {
    render(<ContentPage {...defaultProps} />);
    expect(
      screen.queryByText("common.relatedTopics")
    ).not.toBeInTheDocument();
  });

  test("renders video placeholder when section has videoPlaceholder", () => {
    render(
      <ContentPage
        {...defaultProps}
        sections={[
          { titleKey: "genesis", videoPlaceholder: true },
        ]}
      />
    );
    expect(screen.getByText("Video coming soon")).toBeInTheDocument();
  });

  test("renders audio placeholder when section has audioPlaceholder", () => {
    render(
      <ContentPage
        {...defaultProps}
        sections={[
          { titleKey: "genesis", audioPlaceholder: true },
        ]}
      />
    );
    expect(screen.getByText("Audio recording")).toBeInTheDocument();
  });

  test("renders placeholder text when section has no content", () => {
    render(
      <ContentPage
        {...defaultProps}
        sections={[{ titleKey: "genesis" }]}
      />
    );
    expect(
      screen.getByText(/Content for this section is being prepared/)
    ).toBeInTheDocument();
  });

  test("renders content when section has content prop", () => {
    render(
      <ContentPage
        {...defaultProps}
        sections={[
          { titleKey: "genesis", content: "This is the actual content" },
        ]}
      />
    );
    expect(
      screen.getByText("This is the actual content")
    ).toBeInTheDocument();
  });

  test("sections have correct anchor IDs", () => {
    const { container } = render(<ContentPage {...defaultProps} />);
    expect(container.querySelector("#section-0")).toBeInTheDocument();
    expect(container.querySelector("#section-1")).toBeInTheDocument();
  });
});
