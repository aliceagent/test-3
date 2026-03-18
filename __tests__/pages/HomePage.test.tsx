import React from "react";
import { render, screen } from "@testing-library/react";

jest.mock("next-intl", () => ({
  useTranslations: (ns: string) => (key: string) => `${ns}.${key}`,
}));

jest.mock("@/i18n/navigation", () => ({
  Link: ({
    href,
    children,
    ...props
  }: {
    href: string;
    children: React.ReactNode;
    [key: string]: unknown;
  }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

import HomePage from "../../src/app/[locale]/page";

describe("HomePage", () => {
  test("renders hero section with title", () => {
    render(<HomePage />);
    expect(screen.getByText("home.hero")).toBeInTheDocument();
  });

  test("renders hero subtitle", () => {
    render(<HomePage />);
    expect(screen.getByText("home.heroSub")).toBeInTheDocument();
  });

  test("renders Start Learning CTA button", () => {
    render(<HomePage />);
    const ctaLink = screen.getByText("home.startLearning");
    expect(ctaLink.closest("a")).toHaveAttribute("href", "/torah-study");
  });

  test("renders Join Community CTA buttons", () => {
    render(<HomePage />);
    // There are two "joinCommunity" texts: hero CTA and WhatsApp section
    const joinBtns = screen.getAllByText("home.joinCommunity");
    expect(joinBtns.length).toBe(2);
    // Hero CTA links to /community
    expect(joinBtns[0].closest("a")).toHaveAttribute("href", "/community");
  });

  test("renders Featured Sections heading", () => {
    render(<HomePage />);
    expect(screen.getByText("home.featuredSections")).toBeInTheDocument();
  });

  test("renders all 6 featured section cards", () => {
    render(<HomePage />);
    const sectionKeys = [
      "nav.torahStudy",
      "nav.shabbat",
      "nav.holidays",
      "nav.kosherFood",
      "nav.prayer",
      "nav.philosophy",
    ];
    for (const key of sectionKeys) {
      expect(screen.getByText(key)).toBeInTheDocument();
    }
  });

  test("featured section links point to correct paths", () => {
    render(<HomePage />);
    const paths = [
      "/torah-study",
      "/shabbat",
      "/holidays",
      "/kosher-food",
      "/prayer",
      "/philosophy",
    ];
    for (const path of paths) {
      const links = screen.getAllByRole("link");
      const match = links.find((l) => l.getAttribute("href") === path);
      expect(match).toBeDefined();
    }
  });

  test("renders WhatsApp CTA section", () => {
    render(<HomePage />);
    expect(screen.getByText("home.whatsappJoin")).toBeInTheDocument();
    expect(screen.getByText("home.whatsappDesc")).toBeInTheDocument();
  });

  test("WhatsApp link opens in new tab", () => {
    render(<HomePage />);
    const links = screen.getAllByRole("link");
    const whatsappLink = links.find(
      (l) => l.getAttribute("href") === "https://chat.whatsapp.com/"
    );
    expect(whatsappLink).toHaveAttribute("target", "_blank");
    expect(whatsappLink).toHaveAttribute("rel", "noopener noreferrer");
  });

  test("renders Video Highlights section", () => {
    render(<HomePage />);
    expect(screen.getByText("home.videoHighlights")).toBeInTheDocument();
  });

  test("renders 3 video placeholder cards", () => {
    const { container } = render(<HomePage />);
    const playButtons = container.querySelectorAll(
      '[style*="aspect-ratio"]'
    );
    expect(playButtons).toHaveLength(3);
  });

  test("each Learn More link has correct text", () => {
    render(<HomePage />);
    const learnMoreLinks = screen.getAllByText(/common\.learnMore/);
    expect(learnMoreLinks.length).toBe(6);
  });
});
