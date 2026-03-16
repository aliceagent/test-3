"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";

export default function MentorshipPage() {
  const t = useTranslations("mentorship");
  const [activeTab, setActiveTab] = useState<"find" | "become">("find");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    languages: [] as string[],
    experience: "",
    interests: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // In production, this would send to a backend or WhatsApp API
    const whatsappMessage = encodeURIComponent(
      `[Torah Light ${activeTab === "become" ? "Mentor" : "Mentee"} Signup]\n` +
        `Name: ${formData.name}\n` +
        `Email: ${formData.email}\n` +
        `Phone: ${formData.phone}\n` +
        `Languages: ${formData.languages.join(", ")}\n` +
        `${activeTab === "become" ? "Experience" : "Interests"}: ${activeTab === "become" ? formData.experience : formData.interests}\n` +
        `Message: ${formData.message}`
    );
    window.open(`https://wa.me/?text=${whatsappMessage}`, "_blank");
    setSubmitted(true);
  }

  const langOptions = ["Mandarin 中文", "English", "Hebrew עברית", "Cantonese 粤语"];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-[var(--color-primary)] mb-3">
          {t("title")}
        </h1>
        <p className="text-lg text-[var(--color-text-light)]">{t("subtitle")}</p>
        <div className="h-1 w-20 bg-[var(--color-gold)] mt-4 rounded" />
      </div>

      {/* How it works */}
      <div className="bg-[var(--color-cream)] rounded-xl p-6 mb-8">
        <h2 className="font-semibold text-[var(--color-primary)] mb-4">
          {t("howItWorks")}
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-12 h-12 bg-[var(--color-gold)] text-white rounded-full flex items-center justify-center mx-auto mb-3 text-xl font-bold">
              1
            </div>
            <h3 className="font-medium mb-1">Sign Up / 注册</h3>
            <p className="text-sm text-[var(--color-text-light)]">
              Fill out the form below as a mentor or mentee
            </p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-[var(--color-gold)] text-white rounded-full flex items-center justify-center mx-auto mb-3 text-xl font-bold">
              2
            </div>
            <h3 className="font-medium mb-1">Get Matched / 配对</h3>
            <p className="text-sm text-[var(--color-text-light)]">
              We pair you based on language, interests, and experience
            </p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-[var(--color-gold)] text-white rounded-full flex items-center justify-center mx-auto mb-3 text-xl font-bold">
              3
            </div>
            <h3 className="font-medium mb-1">Connect / 联系</h3>
            <p className="text-sm text-[var(--color-text-light)]">
              {t("whatsappConnect")}
            </p>
          </div>
        </div>
      </div>

      {/* Tab selector */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => {
            setActiveTab("find");
            setSubmitted(false);
          }}
          className={`px-6 py-3 rounded-lg font-medium transition-colors ${
            activeTab === "find"
              ? "bg-[var(--color-primary)] text-white"
              : "bg-[var(--color-cream)] text-[var(--color-text)]"
          }`}
        >
          {t("findMentor")}
        </button>
        <button
          onClick={() => {
            setActiveTab("become");
            setSubmitted(false);
          }}
          className={`px-6 py-3 rounded-lg font-medium transition-colors ${
            activeTab === "become"
              ? "bg-[var(--color-primary)] text-white"
              : "bg-[var(--color-cream)] text-[var(--color-text)]"
          }`}
        >
          {t("becomeMentor")}
        </button>
      </div>

      {/* Description */}
      <div className="bg-[var(--color-bg-alt)] rounded-xl p-6 mb-6">
        <p className="text-[var(--color-text)]">
          {activeTab === "find" ? t("menteeDesc") : t("mentorDesc")}
        </p>
      </div>

      {/* Form */}
      {submitted ? (
        <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center">
          <span className="text-4xl mb-4 block">✅</span>
          <h3 className="text-xl font-bold text-green-800 mb-2">
            Thank you! / 谢谢！
          </h3>
          <p className="text-green-700">
            Your information has been sent via WhatsApp. We will be in touch
            soon to match you with a{" "}
            {activeTab === "find" ? "mentor" : "mentee"}.
          </p>
          <p className="text-green-700 mt-2">
            您的信息已通过WhatsApp发送。我们会尽快与您联系，为您匹配
            {activeTab === "find" ? "导师" : "学员"}。
          </p>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="bg-white border rounded-xl p-6 shadow-sm space-y-4"
        >
          <div>
            <label className="block text-sm font-medium mb-1">
              Name / 姓名 *
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full px-4 py-2 border rounded-lg text-sm"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Email / 电子邮件 *
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full px-4 py-2 border rounded-lg text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                WhatsApp Phone / WhatsApp电话 *
              </label>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                className="w-full px-4 py-2 border rounded-lg text-sm"
                placeholder="+86..."
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Languages you speak / 您会说的语言
            </label>
            <div className="flex flex-wrap gap-2">
              {langOptions.map((lang) => (
                <label
                  key={lang}
                  className={`px-3 py-1.5 rounded-full text-sm cursor-pointer transition-colors ${
                    formData.languages.includes(lang)
                      ? "bg-[var(--color-primary)] text-white"
                      : "bg-[var(--color-cream)] text-[var(--color-text)]"
                  }`}
                >
                  <input
                    type="checkbox"
                    className="hidden"
                    checked={formData.languages.includes(lang)}
                    onChange={(e) => {
                      const langs = e.target.checked
                        ? [...formData.languages, lang]
                        : formData.languages.filter((l) => l !== lang);
                      setFormData({ ...formData, languages: langs });
                    }}
                  />
                  {lang}
                </label>
              ))}
            </div>
          </div>

          {activeTab === "become" ? (
            <div>
              <label className="block text-sm font-medium mb-1">
                Your Jewish knowledge/experience / 您的犹太知识/经验
              </label>
              <textarea
                value={formData.experience}
                onChange={(e) =>
                  setFormData({ ...formData, experience: e.target.value })
                }
                rows={3}
                className="w-full px-4 py-2 border rounded-lg text-sm"
                placeholder="Tell us about your background... / 告诉我们您的背景..."
              />
            </div>
          ) : (
            <div>
              <label className="block text-sm font-medium mb-1">
                What would you like to learn? / 您想学习什么？
              </label>
              <textarea
                value={formData.interests}
                onChange={(e) =>
                  setFormData({ ...formData, interests: e.target.value })
                }
                rows={3}
                className="w-full px-4 py-2 border rounded-lg text-sm"
                placeholder="Shabbat, kosher, prayer, Hebrew... / 安息日、洁食、祈祷、希伯来语..."
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium mb-1">
              Additional message / 附加信息
            </label>
            <textarea
              value={formData.message}
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
              rows={2}
              className="w-full px-4 py-2 border rounded-lg text-sm"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
          >
            <span>Submit via WhatsApp / 通过WhatsApp提交</span>
            <span className="text-lg">💬</span>
          </button>
        </form>
      )}
    </div>
  );
}
