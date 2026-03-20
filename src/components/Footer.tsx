"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function Footer() {
  const t = useTranslations("common.footer");
  const tNav = useTranslations("nav");

  return (
    <footer className="bg-[var(--color-primary-dark)] text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 font-bold text-xl mb-4">
              <span className="text-[var(--color-gold)] text-2xl">✡</span>
              <span>Torah Light | Torah之光</span>
            </div>
            <p className="text-white/70 text-sm">{t("madeWithLove")}</p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-[var(--color-gold)] mb-3">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm text-white/80">
              <li>
                <Link href="/torah-study" className="hover:text-white">
                  {tNav("torahStudy")}
                </Link>
              </li>
              <li>
                <Link href="/shabbat" className="hover:text-white">
                  {tNav("shabbat")}
                </Link>
              </li>
              <li>
                <Link href="/holidays" className="hover:text-white">
                  {tNav("holidays")}
                </Link>
              </li>
              <li>
                <Link href="/prayer" className="hover:text-white">
                  {tNav("prayer")}
                </Link>
              </li>
              <li>
                <Link href="/kosher-food" className="hover:text-white">
                  {tNav("kosherFood")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Community */}
          <div>
            <h3 className="font-semibold text-[var(--color-gold)] mb-3">
              Community
            </h3>
            <ul className="space-y-2 text-sm text-white/80">
              <li>
                <Link href="/community" className="hover:text-white">
                  {tNav("community")}
                </Link>
              </li>
              <li>
                <Link href="/mentorship" className="hover:text-white">
                  {tNav("mentorship")}
                </Link>
              </li>
              <li>
                <a
                  href="https://chat.whatsapp.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white flex items-center gap-1"
                >
                  WhatsApp Group
                  <svg
                    className="w-3 h-3"
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
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold text-[var(--color-gold)] mb-3">
              Legal
            </h3>
            <ul className="space-y-2 text-sm text-white/80">
              <li>
                <Link href="/about" className="hover:text-white">
                  {t("about")}
                </Link>
              </li>
              <li>
                <span className="hover:text-white cursor-pointer">
                  {t("privacy")}
                </span>
              </li>
              <li>
                <span className="hover:text-white cursor-pointer">
                  {t("terms")}
                </span>
              </li>
              <li>
                <span className="hover:text-white cursor-pointer">
                  {t("contact")}
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-white/10 flex items-center justify-between text-sm text-white/50">
          <span className="font-mono text-xs text-white/30">
            build {process.env.NEXT_PUBLIC_GIT_HASH || "dev"}
          </span>
          <span>{t("copyright")}</span>
          <span className="text-xs text-white/30">
            {process.env.NEXT_PUBLIC_BUILD_TIME
              ? new Date(process.env.NEXT_PUBLIC_BUILD_TIME).toLocaleDateString()
              : ""}
          </span>
        </div>
      </div>
    </footer>
  );
}
