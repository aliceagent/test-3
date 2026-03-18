import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";

jest.mock("next-intl", () => ({
  useTranslations: (ns: string) => (key: string) => `${ns}.${key}`,
}));

import MentorshipPage from "../../src/app/[locale]/mentorship/page";

describe("MentorshipPage", () => {
  test("renders page title", () => {
    render(<MentorshipPage />);
    expect(screen.getByText("mentorship.title")).toBeInTheDocument();
  });

  test("renders page subtitle", () => {
    render(<MentorshipPage />);
    expect(screen.getByText("mentorship.subtitle")).toBeInTheDocument();
  });

  test("renders how it works section", () => {
    render(<MentorshipPage />);
    expect(screen.getByText("mentorship.howItWorks")).toBeInTheDocument();
  });

  test("renders Find Mentor and Become Mentor tabs", () => {
    render(<MentorshipPage />);
    expect(screen.getByText("mentorship.findMentor")).toBeInTheDocument();
    expect(screen.getByText("mentorship.becomeMentor")).toBeInTheDocument();
  });

  test("shows mentee description by default", () => {
    render(<MentorshipPage />);
    expect(screen.getByText("mentorship.menteeDesc")).toBeInTheDocument();
  });

  test("switching to Become Mentor tab shows mentor description", () => {
    render(<MentorshipPage />);
    fireEvent.click(screen.getByText("mentorship.becomeMentor"));
    expect(screen.getByText("mentorship.mentorDesc")).toBeInTheDocument();
  });

  test("renders signup form fields", () => {
    render(<MentorshipPage />);
    expect(screen.getByText(/Name \/ 姓名/)).toBeInTheDocument();
    expect(screen.getByText(/Email \/ 电子邮件/)).toBeInTheDocument();
    expect(screen.getByText(/WhatsApp Phone/)).toBeInTheDocument();
  });

  test("renders language options", () => {
    render(<MentorshipPage />);
    expect(screen.getByText("Mandarin 中文")).toBeInTheDocument();
    expect(screen.getByText("Hebrew עברית")).toBeInTheDocument();
  });

  test("renders WhatsApp submit button", () => {
    render(<MentorshipPage />);
    expect(screen.getByText(/Submit via WhatsApp/)).toBeInTheDocument();
  });

  test("shows 3 steps in how it works", () => {
    render(<MentorshipPage />);
    expect(screen.getByText("Sign Up / 注册")).toBeInTheDocument();
    expect(screen.getByText("Get Matched / 配对")).toBeInTheDocument();
    expect(screen.getByText("Connect / 联系")).toBeInTheDocument();
  });
});
