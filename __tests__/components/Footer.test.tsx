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

import Footer from "../../src/components/Footer";

describe("Footer component", () => {
  test("renders the brand name", () => {
    render(<Footer />);
    expect(
      screen.getByText(/Torah Light \| Torah之光/)
    ).toBeInTheDocument();
  });

  test("renders quick links", () => {
    render(<Footer />);
    expect(screen.getByText("nav.torahStudy")).toBeInTheDocument();
    expect(screen.getByText("nav.shabbat")).toBeInTheDocument();
    expect(screen.getByText("nav.holidays")).toBeInTheDocument();
    expect(screen.getByText("nav.prayer")).toBeInTheDocument();
    expect(screen.getByText("nav.kosherFood")).toBeInTheDocument();
  });

  test("renders community links", () => {
    render(<Footer />);
    expect(screen.getByText("nav.community")).toBeInTheDocument();
    expect(screen.getByText("nav.mentorship")).toBeInTheDocument();
  });

  test("renders WhatsApp group link", () => {
    render(<Footer />);
    const whatsappLink = screen.getByText("WhatsApp Group");
    expect(whatsappLink.closest("a")).toHaveAttribute(
      "href",
      "https://chat.whatsapp.com/"
    );
    expect(whatsappLink.closest("a")).toHaveAttribute("target", "_blank");
  });

  test("renders legal section", () => {
    render(<Footer />);
    expect(screen.getByText("common.footer.about")).toBeInTheDocument();
    expect(screen.getByText("common.footer.privacy")).toBeInTheDocument();
    expect(screen.getByText("common.footer.terms")).toBeInTheDocument();
    expect(screen.getByText("common.footer.contact")).toBeInTheDocument();
  });

  test("renders copyright notice", () => {
    render(<Footer />);
    expect(
      screen.getByText("common.footer.copyright")
    ).toBeInTheDocument();
  });

  test("renders made with love text", () => {
    render(<Footer />);
    expect(
      screen.getByText("common.footer.madeWithLove")
    ).toBeInTheDocument();
  });
});
