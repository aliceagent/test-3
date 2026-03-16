import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";

const mockReplace = jest.fn();

jest.mock("next-intl", () => ({
  useLocale: () => "en",
}));

jest.mock("@/i18n/navigation", () => ({
  usePathname: () => "/torah-study",
  useRouter: () => ({
    replace: mockReplace,
  }),
}));

import LanguageSwitcher from "../../src/components/LanguageSwitcher";

describe("LanguageSwitcher component", () => {
  beforeEach(() => {
    mockReplace.mockClear();
  });

  test("renders the current language flag", () => {
    render(<LanguageSwitcher />);
    expect(screen.getByText("🇺🇸")).toBeInTheDocument();
  });

  test("dropdown is hidden by default", () => {
    render(<LanguageSwitcher />);
    // The dropdown buttons aren't visible
    const buttons = screen.getAllByRole("button");
    expect(buttons).toHaveLength(1); // only the toggle button
  });

  test("clicking opens the language dropdown", () => {
    render(<LanguageSwitcher />);
    const toggleBtn = screen.getByRole("button");
    fireEvent.click(toggleBtn);
    // Now we should have 4 buttons: toggle + 3 languages
    const buttons = screen.getAllByRole("button");
    expect(buttons.length).toBe(4);
  });

  test("clicking a language calls router.replace", () => {
    render(<LanguageSwitcher />);
    fireEvent.click(screen.getByRole("button"));
    // Find the Chinese button by its flag
    const zhButton = screen.getByText("🇨🇳").closest("button")!;
    fireEvent.click(zhButton);
    expect(mockReplace).toHaveBeenCalledWith("/torah-study", {
      locale: "zh",
    });
  });

  test("selecting a language closes the dropdown", () => {
    render(<LanguageSwitcher />);
    fireEvent.click(screen.getByRole("button"));
    const heButton = screen.getByText("🇮🇱").closest("button")!;
    fireEvent.click(heButton);
    // Should be back to just 1 button
    const buttons = screen.getAllByRole("button");
    expect(buttons).toHaveLength(1);
  });

  test("displays all three language options when open", () => {
    render(<LanguageSwitcher />);
    fireEvent.click(screen.getByRole("button"));
    // US flag appears twice: in toggle button + dropdown
    expect(screen.getAllByText("🇺🇸").length).toBe(2);
    expect(screen.getByText("🇨🇳")).toBeInTheDocument();
    expect(screen.getByText("🇮🇱")).toBeInTheDocument();
  });
});
