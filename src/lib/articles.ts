import staticArticles from "@/data/articles.json";

export interface Article {
  id: number;
  section: string;
  title_en: string;
  title_zh: string;
  title_he: string;
  body_en: string;
  body_zh: string;
  body_he: string;
  created_at?: string;
  updated_at?: string;
}

const allArticles: Article[] = staticArticles as Article[];

export function getArticleById(id: number): Article | undefined {
  return allArticles.find((a) => a.id === id);
}

export function getArticlesBySection(section: string): Article[] {
  return allArticles.filter((a) => a.section === section);
}

export function getAllArticles(): Article[] {
  return allArticles;
}
