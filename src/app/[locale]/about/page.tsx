"use client";

import { useTranslations } from "next-intl";

export default function AboutPage() {
  const t = useTranslations("about");

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-[var(--color-primary)] mb-3">
          {t("title")}
        </h1>
        <p className="text-lg text-[var(--color-text-light)]">
          {t("subtitle")}
        </p>
        <div className="h-1 w-20 bg-[var(--color-gold)] mt-4 rounded" />
      </div>

      {/* What is Torah Light */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-[var(--color-primary)] mb-4">
          {t("whatIsTitle")}
        </h2>
        <div className="bg-[var(--color-cream)] rounded-xl p-6">
          <p className="text-[var(--color-text)] mb-4 leading-relaxed">
            {t("whatIsP1")}
          </p>
          <p className="text-[var(--color-text)] leading-relaxed">
            {t("whatIsP2")}
          </p>
        </div>
      </section>

      {/* About the Creator */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-[var(--color-primary)] mb-4">
          {t("creatorTitle")}
        </h2>
        <div className="bg-[var(--color-bg-alt)] rounded-xl p-6">
          <p className="text-[var(--color-text)] mb-4 leading-relaxed">
            {t("creatorP1")}
          </p>
          <p className="text-[var(--color-text)] mb-4 leading-relaxed">
            {t("creatorP2")}
          </p>
          <a
            href="https://jonathancaras.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[var(--color-primary)] font-medium hover:text-[var(--color-gold)] transition-colors"
          >
            {t("creatorWebsite")}
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </a>
        </div>
      </section>

      {/* How It Was Built */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-[var(--color-primary)] mb-4">
          {t("howBuiltTitle")}
        </h2>
        <div className="bg-[var(--color-cream)] rounded-xl p-6">
          <p className="text-[var(--color-text)] mb-4 leading-relaxed">
            {t("howBuiltP1")}
          </p>
          <p className="text-[var(--color-text)] mb-4 leading-relaxed">
            {t("howBuiltP2")}
          </p>
          <p className="text-[var(--color-text)] leading-relaxed">
            {t("howBuiltP3")}
          </p>
        </div>
      </section>

      {/* Important Disclaimer */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-[var(--color-primary)] mb-4">
          {t("disclaimerTitle")}
        </h2>
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
          <p className="text-[var(--color-text)] mb-4 leading-relaxed">
            {t("disclaimerP1")}
          </p>
          <p className="text-[var(--color-text)] font-medium leading-relaxed">
            {t("disclaimerP2")}
          </p>
        </div>
      </section>

      {/* Call for Volunteers */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-[var(--color-primary)] mb-4">
          {t("volunteersTitle")}
        </h2>
        <div className="bg-[var(--color-bg-alt)] rounded-xl p-6">
          <p className="text-[var(--color-text)] mb-4 leading-relaxed">
            {t("volunteersP1")}
          </p>
          <ul className="list-disc list-inside space-y-2 text-[var(--color-text)] mb-4">
            <li>{t("volunteerItem1")}</li>
            <li>{t("volunteerItem2")}</li>
            <li>{t("volunteerItem3")}</li>
            <li>{t("volunteerItem4")}</li>
          </ul>
          <p className="text-[var(--color-text)] leading-relaxed">
            {t("volunteersP2")}
          </p>
        </div>
      </section>

      {/* Contact */}
      <section>
        <div className="bg-[var(--color-primary)] text-white rounded-xl p-6 text-center">
          <h2 className="text-xl font-semibold mb-3">{t("contactTitle")}</h2>
          <p className="text-white/80 mb-4">{t("contactDesc")}</p>
          <a
            href="https://jonathancaras.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-6 py-3 bg-[var(--color-gold)] text-white rounded-lg font-medium hover:bg-[var(--color-gold-light)] transition-colors"
          >
            {t("contactButton")}
          </a>
        </div>
      </section>
    </div>
  );
}
