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

// Pages that use ContentPage component
import TorahStudyPage from "../../src/app/[locale]/torah-study/page";
import ShabbatPage from "../../src/app/[locale]/shabbat/page";
import HolidaysPage from "../../src/app/[locale]/holidays/page";
import KosherFoodPage from "../../src/app/[locale]/kosher-food/page";
import PrayerPage from "../../src/app/[locale]/prayer/page";
import PhilosophyPage from "../../src/app/[locale]/philosophy/page";
import ThirteenPrinciplesPage from "../../src/app/[locale]/thirteen-principles/page";
import TenCommandmentsPage from "../../src/app/[locale]/ten-commandments/page";
import FiveMegillotPage from "../../src/app/[locale]/five-megillot/page";
import JewishTextsPage from "../../src/app/[locale]/jewish-texts/page";
import JewishHistoryPage from "../../src/app/[locale]/jewish-history/page";
import MessiahPage from "../../src/app/[locale]/messiah/page";
import ChabadPage from "../../src/app/[locale]/chabad/page";
import HebrewLearningPage from "../../src/app/[locale]/hebrew-learning/page";
import MatchmakingPage from "../../src/app/[locale]/matchmaking/page";
import LifeCyclePage from "../../src/app/[locale]/life-cycle/page";
import FamilyPurityPage from "../../src/app/[locale]/family-purity/page";
import MoneyLawsPage from "../../src/app/[locale]/money-laws/page";
import AntisemitismPage from "../../src/app/[locale]/antisemitism/page";
import AshkenaziSephardiPage from "../../src/app/[locale]/ashkenazi-sephardi/page";
import JewsInAsiaPage from "../../src/app/[locale]/jews-in-asia/page";
import TabernaclePage from "../../src/app/[locale]/tabernacle/page";
import NonJewishRelationsPage from "../../src/app/[locale]/non-jewish-relations/page";
import ClothingModestyPage from "../../src/app/[locale]/clothing-modesty/page";
import PassoverSederPage from "../../src/app/[locale]/passover-seder/page";

// Pages that use ContentPage (standard layout with table of contents)
const contentPageTests = [
  { name: "TorahStudy", Component: TorahStudyPage, namespace: "torahStudy" },
  { name: "Shabbat", Component: ShabbatPage, namespace: "shabbat" },
  { name: "Holidays", Component: HolidaysPage, namespace: "holidays" },
  { name: "KosherFood", Component: KosherFoodPage, namespace: "kosherFood" },
  { name: "Prayer", Component: PrayerPage, namespace: "prayer" },
  { name: "Philosophy", Component: PhilosophyPage, namespace: "philosophy" },
  { name: "ThirteenPrinciples", Component: ThirteenPrinciplesPage, namespace: "thirteenPrinciples" },
  { name: "TenCommandments", Component: TenCommandmentsPage, namespace: "tenCommandments" },
  { name: "FiveMegillot", Component: FiveMegillotPage, namespace: "fiveMegillot" },
  { name: "JewishTexts", Component: JewishTextsPage, namespace: "jewishTexts" },
  { name: "JewishHistory", Component: JewishHistoryPage, namespace: "jewishHistory" },
  { name: "Messiah", Component: MessiahPage, namespace: "messiah" },
  { name: "Chabad", Component: ChabadPage, namespace: "chabad" },
  { name: "HebrewLearning", Component: HebrewLearningPage, namespace: "hebrewLearning" },
  { name: "Matchmaking", Component: MatchmakingPage, namespace: "matchmaking" },
  { name: "LifeCycle", Component: LifeCyclePage, namespace: "lifeCycle" },
  { name: "FamilyPurity", Component: FamilyPurityPage, namespace: "familyPurity" },
  { name: "MoneyLaws", Component: MoneyLawsPage, namespace: "moneyLaws" },
  { name: "Antisemitism", Component: AntisemitismPage, namespace: "antisemitism" },
  { name: "AshkenaziSephardi", Component: AshkenaziSephardiPage, namespace: "ashkenaziSephardi" },
  { name: "JewsInAsia", Component: JewsInAsiaPage, namespace: "jewsInAsia" },
  { name: "Tabernacle", Component: TabernaclePage, namespace: "tabernacle" },
  { name: "NonJewishRelations", Component: NonJewishRelationsPage, namespace: "nonJewishRelations" },
  { name: "ClothingModesty", Component: ClothingModestyPage, namespace: "clothingModesty" },
  { name: "PassoverSeder", Component: PassoverSederPage, namespace: "passoverSeder" },
];

describe("Content Pages (ContentPage-based)", () => {
  test.each(contentPageTests)(
    "$name page renders without crashing",
    ({ Component }) => {
      expect(() => render(<Component />)).not.toThrow();
    }
  );

  test.each(contentPageTests)(
    "$name page displays its title",
    ({ Component, namespace }) => {
      render(<Component />);
      expect(screen.getByText(`${namespace}.title`)).toBeInTheDocument();
    }
  );

  test.each(contentPageTests)(
    "$name page displays its subtitle",
    ({ Component, namespace }) => {
      render(<Component />);
      expect(screen.getByText(`${namespace}.subtitle`)).toBeInTheDocument();
    }
  );

  test.each(contentPageTests)(
    "$name page has table of contents",
    ({ Component }) => {
      render(<Component />);
      expect(screen.getByText("common.tableOfContents")).toBeInTheDocument();
    }
  );

  test.each(contentPageTests)(
    "$name page has back to top link",
    ({ Component }) => {
      render(<Component />);
      expect(screen.getByText(/common\.backToTop/)).toBeInTheDocument();
    }
  );
});
