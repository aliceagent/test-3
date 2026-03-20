import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";

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
  usePathname: () => "/",
}));

jest.mock("@/components/LanguageSwitcher", () => {
  return function MockLanguageSwitcher() {
    return <div data-testid="language-switcher">LanguageSwitcher</div>;
  };
});

import Navigation from "../../src/components/Navigation";

describe("Navigation component", () => {
  test("renders the logo/brand link", () => {
    render(<Navigation />);
    const logoLink = screen.getByRole("link", { name: /Torah Light/i });
    expect(logoLink).toBeInTheDocument();
    expect(logoLink).toHaveAttribute("href", "/");
  });

  test("renders the language switcher", () => {
    render(<Navigation />);
    expect(screen.getByTestId("language-switcher")).toBeInTheDocument();
  });

  test("renders mobile menu toggle button", () => {
    render(<Navigation />);
    const toggle = screen.getByLabelText("Toggle menu");
    expect(toggle).toBeInTheDocument();
  });

  test("mobile menu is hidden by default", () => {
    render(<Navigation />);
    expect(screen.queryByText("nav.home")).not.toBeInTheDocument();
  });

  test("clicking toggle opens mobile menu", () => {
    render(<Navigation />);
    fireEvent.click(screen.getByLabelText("Toggle menu"));
    expect(screen.getByText("nav.home")).toBeInTheDocument();
  });

  test("renders all 5 navigation categories on desktop", () => {
    render(<Navigation />);
    const categories = [
      "navCategories.foundations",
      "navCategories.dailyLiving",
      "navCategories.textsPhilosophy",
      "navCategories.historyIdentity",
      "navCategories.communityLife",
    ];
    for (const cat of categories) {
      // Desktop nav renders one, mobile nav may render another when open
      expect(screen.getAllByText(cat).length).toBeGreaterThanOrEqual(1);
    }
  });

  test("mobile menu shows category sections when expanded", () => {
    render(<Navigation />);
    fireEvent.click(screen.getByLabelText("Toggle menu"));

    // Both desktop and mobile show categories; get the mobile one (last)
    const foundationsBtns = screen.getAllByText("navCategories.foundations");
    const mobileBtn = foundationsBtns[foundationsBtns.length - 1];
    fireEvent.click(mobileBtn);

    expect(screen.getAllByText("nav.torahStudy").length).toBeGreaterThanOrEqual(2);
  });

  test("mobile menu has admin link", () => {
    render(<Navigation />);
    fireEvent.click(screen.getByLabelText("Toggle menu"));
    expect(screen.getByText("nav.admin")).toBeInTheDocument();
  });

  test("clicking a mobile nav link closes the menu", () => {
    render(<Navigation />);
    fireEvent.click(screen.getByLabelText("Toggle menu"));

    const foundationsBtns = screen.getAllByText("navCategories.foundations");
    fireEvent.click(foundationsBtns[foundationsBtns.length - 1]);

    const links = screen.getAllByText("nav.torahStudy");
    // Click the mobile nav link (last one)
    fireEvent.click(links[links.length - 1]);
    expect(screen.queryByText("nav.home")).not.toBeInTheDocument();
  });
});
