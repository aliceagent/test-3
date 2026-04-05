"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function Footer() {
  const t = useTranslations("common.footer");
  const tNav = useTranslations("nav");

  return (
    <footer className="bg-[var(--color-primary-dark)] text-white mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 font-semibold text-base mb-3">
              <span className="text-[var(--color-gold)]">&#x2721;</span>
              <span>Torah Light</span>
            </div>
            <p className="text-white/50 text-sm leading-relaxed">{t("madeWithLove")}</p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xs font-medium text-white/40 uppercase tracking-wider mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2.5 text-sm">
              {[
                { key: "torahStudy", href: "/torah-study" },
                { key: "holidays", href: "/holidays" },
                { key: "prayer", href: "/prayer" },
                { key: "kosherFood", href: "/kosher-food" },
              ].map((link) => (
                <li key={link.key}>
                  <Link href={link.href} className="text-white/60 hover:text-white transition-colors">
                    {tNav(link.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Community */}
          <div>
            <h3 className="text-xs font-medium text-white/40 uppercase tracking-wider mb-4">
              Community
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/community" className="text-white/60 hover:text-white transition-colors">
                  {tNav("community")}
                </Link>
              </li>
              <li>
                <Link href="/mentorship" className="text-white/60 hover:text-white transition-colors">
                  {tNav("mentorship")}
                </Link>
              </li>
              <li>
                <a
                  href="https://chat.whatsapp.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/60 hover:text-white transition-colors inline-flex items-center gap-1"
                >
                  WhatsApp
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </li>
            </ul>
          </div>

          {/* About */}
          <div>
            <h3 className="text-xs font-medium text-white/40 uppercase tracking-wider mb-4">
              About
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/about" className="text-white/60 hover:text-white transition-colors">
                  {t("about")}
                </Link>
              </li>
              <li><span className="text-white/60 cursor-default">{t("privacy")}</span></li>
              <li><span className="text-white/60 cursor-default">{t("terms")}</span></li>
              <li><span className="text-white/60 cursor-default">{t("contact")}</span></li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-white/30">
          <span>{t("copyright")}</span>
          <span className="font-mono">
            {process.env.NEXT_PUBLIC_GIT_HASH || "dev"}
          </span>
        </div>
      </div>
    </footer>
  );
}
