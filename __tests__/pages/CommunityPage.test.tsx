import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";

jest.mock("next-intl", () => ({
  useTranslations: (ns: string) => (key: string) => `${ns}.${key}`,
}));

// Mock localStorage
const mockStorage: Record<string, string> = {};
Object.defineProperty(window, "localStorage", {
  value: {
    getItem: jest.fn((key: string) => mockStorage[key] || null),
    setItem: jest.fn((key: string, value: string) => { mockStorage[key] = value; }),
    removeItem: jest.fn(),
    clear: jest.fn(),
  },
});

import CommunityPage from "../../src/app/[locale]/community/page";

describe("CommunityPage", () => {
  test("renders page title", () => {
    render(<CommunityPage />);
    expect(screen.getByText("community.title")).toBeInTheDocument();
  });

  test("renders page subtitle", () => {
    render(<CommunityPage />);
    expect(screen.getByText("community.subtitle")).toBeInTheDocument();
  });

  test("renders WhatsApp group link", () => {
    render(<CommunityPage />);
    expect(screen.getByText("community.whatsappGroup")).toBeInTheDocument();
  });

  test("renders community guidelines", () => {
    render(<CommunityPage />);
    expect(screen.getByText("community.guidelines")).toBeInTheDocument();
  });

  test("renders post question button", () => {
    render(<CommunityPage />);
    expect(screen.getByText("community.postQuestion")).toBeInTheDocument();
  });

  test("renders recent discussions", () => {
    render(<CommunityPage />);
    expect(screen.getByText("community.recentDiscussions")).toBeInTheDocument();
  });

  test("renders sample forum posts", () => {
    render(<CommunityPage />);
    expect(screen.getByText("How do I start keeping Shabbat?")).toBeInTheDocument();
    expect(screen.getByText("Finding kosher food in China")).toBeInTheDocument();
  });

  test("clicking post question shows the form", () => {
    render(<CommunityPage />);
    fireEvent.click(screen.getByText("community.postQuestion"));
    expect(screen.getByPlaceholderText(/Question title/)).toBeInTheDocument();
  });

  test("renders reply buttons for posts", () => {
    render(<CommunityPage />);
    const replyButtons = screen.getAllByText(/Reply \/ 回复/);
    expect(replyButtons.length).toBeGreaterThanOrEqual(3);
  });

  test("renders existing replies", () => {
    render(<CommunityPage />);
    expect(screen.getByText(/Start with lighting candles/)).toBeInTheDocument();
  });
});
