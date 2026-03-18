import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";

jest.mock("next-intl", () => ({
  useTranslations: (ns: string) => (key: string) => `${ns}.${key}`,
}));

// Mock localStorage
const mockStorage: Record<string, string> = {};
const localStorageMock = {
  getItem: jest.fn((key: string) => mockStorage[key] || null),
  setItem: jest.fn((key: string, value: string) => {
    mockStorage[key] = value;
  }),
  removeItem: jest.fn((key: string) => {
    delete mockStorage[key];
  }),
  clear: jest.fn(() => {
    Object.keys(mockStorage).forEach((key) => delete mockStorage[key]);
  }),
};
Object.defineProperty(window, "localStorage", { value: localStorageMock });

import AdminPage from "../../src/app/[locale]/admin/page";

describe("AdminPage", () => {
  beforeEach(() => {
    localStorageMock.clear();
    jest.clearAllMocks();
  });

  test("shows login form by default", () => {
    render(<AdminPage />);
    expect(screen.getByText("admin.title")).toBeInTheDocument();
    expect(screen.getByText("admin.loginPrompt")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("admin.password")).toBeInTheDocument();
  });

  test("shows login button", () => {
    render(<AdminPage />);
    expect(
      screen.getByRole("button", { name: "admin.login" })
    ).toBeInTheDocument();
  });

  test("shows default password hint", () => {
    render(<AdminPage />);
    expect(
      screen.getByText(/Default password: torahlight2026/)
    ).toBeInTheDocument();
  });

  test("rejects incorrect password", () => {
    const alertMock = jest.spyOn(window, "alert").mockImplementation();
    render(<AdminPage />);
    const input = screen.getByPlaceholderText("admin.password");
    fireEvent.change(input, { target: { value: "wrong" } });
    fireEvent.submit(input.closest("form")!);
    expect(alertMock).toHaveBeenCalledWith("Incorrect password");
    alertMock.mockRestore();
  });

  test("accepts correct password and shows dashboard", () => {
    render(<AdminPage />);
    const input = screen.getByPlaceholderText("admin.password");
    fireEvent.change(input, { target: { value: "torahlight2026" } });
    fireEvent.submit(input.closest("form")!);
    expect(screen.getByText("admin.dashboard")).toBeInTheDocument();
  });

  test("dashboard shows stats", () => {
    render(<AdminPage />);
    const input = screen.getByPlaceholderText("admin.password");
    fireEvent.change(input, { target: { value: "torahlight2026" } });
    fireEvent.submit(input.closest("form")!);
    expect(screen.getByText("Total Articles")).toBeInTheDocument();
    expect(screen.getByText("Sections")).toBeInTheDocument();
    expect(screen.getByText("Languages")).toBeInTheDocument();
  });

  test("dashboard has Add New Article button", () => {
    render(<AdminPage />);
    const input = screen.getByPlaceholderText("admin.password");
    fireEvent.change(input, { target: { value: "torahlight2026" } });
    fireEvent.submit(input.closest("form")!);
    expect(screen.getByText(/admin.addArticle/)).toBeInTheDocument();
  });

  test("clicking Add New Article opens editor", () => {
    render(<AdminPage />);
    fireEvent.change(screen.getByPlaceholderText("admin.password"), {
      target: { value: "torahlight2026" },
    });
    fireEvent.submit(screen.getByPlaceholderText("admin.password").closest("form")!);
    fireEvent.click(screen.getByText(/admin.addArticle/));
    expect(screen.getByText(/admin\.articleTitle/)).toBeInTheDocument();
    expect(screen.getByText(/admin\.articleBody/)).toBeInTheDocument();
  });

  test("editor has language tabs", () => {
    render(<AdminPage />);
    fireEvent.change(screen.getByPlaceholderText("admin.password"), {
      target: { value: "torahlight2026" },
    });
    fireEvent.submit(screen.getByPlaceholderText("admin.password").closest("form")!);
    fireEvent.click(screen.getByText(/admin.addArticle/));
    expect(screen.getByText("English")).toBeInTheDocument();
    expect(screen.getByText("中文")).toBeInTheDocument();
    expect(screen.getByText("עברית")).toBeInTheDocument();
  });

  test("editor has section selector", () => {
    render(<AdminPage />);
    fireEvent.change(screen.getByPlaceholderText("admin.password"), {
      target: { value: "torahlight2026" },
    });
    fireEvent.submit(screen.getByPlaceholderText("admin.password").closest("form")!);
    fireEvent.click(screen.getByText(/admin.addArticle/));
    expect(screen.getByText("admin.section")).toBeInTheDocument();
    const select = screen.getByRole("combobox");
    expect(select).toBeInTheDocument();
  });

  test("cancel button returns to dashboard", () => {
    render(<AdminPage />);
    fireEvent.change(screen.getByPlaceholderText("admin.password"), {
      target: { value: "torahlight2026" },
    });
    fireEvent.submit(screen.getByPlaceholderText("admin.password").closest("form")!);
    fireEvent.click(screen.getByText(/admin.addArticle/));
    const cancelButtons = screen.getAllByText("admin.cancel");
    fireEvent.click(cancelButtons[0]);
    expect(screen.getByText("admin.dashboard")).toBeInTheDocument();
  });

  test("shows empty state when no articles", () => {
    render(<AdminPage />);
    fireEvent.change(screen.getByPlaceholderText("admin.password"), {
      target: { value: "torahlight2026" },
    });
    fireEvent.submit(screen.getByPlaceholderText("admin.password").closest("form")!);
    expect(screen.getByText(/No articles yet/)).toBeInTheDocument();
  });

  test("section filter dropdown exists in dashboard", () => {
    render(<AdminPage />);
    fireEvent.change(screen.getByPlaceholderText("admin.password"), {
      target: { value: "torahlight2026" },
    });
    fireEvent.submit(screen.getByPlaceholderText("admin.password").closest("form")!);
    const selects = screen.getAllByRole("combobox");
    expect(selects.length).toBeGreaterThanOrEqual(1);
  });

  test("Export JSON button exists", () => {
    render(<AdminPage />);
    fireEvent.change(screen.getByPlaceholderText("admin.password"), {
      target: { value: "torahlight2026" },
    });
    fireEvent.submit(screen.getByPlaceholderText("admin.password").closest("form")!);
    expect(screen.getByText("Export JSON")).toBeInTheDocument();
  });

  test("Import JSON button exists", () => {
    render(<AdminPage />);
    fireEvent.change(screen.getByPlaceholderText("admin.password"), {
      target: { value: "torahlight2026" },
    });
    fireEvent.submit(screen.getByPlaceholderText("admin.password").closest("form")!);
    expect(screen.getByText("Import JSON")).toBeInTheDocument();
  });
});
