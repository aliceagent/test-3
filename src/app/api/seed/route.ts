import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { getAllArticles } from "@/lib/articles";

const ADMIN_PASSWORD = "torahlight2026";

export async function POST(req: NextRequest) {
  const { password } = await req.json().catch(() => ({ password: "" }));
  if (password !== ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) {
    return NextResponse.json({ error: "Supabase not configured" }, { status: 500 });
  }

  const supabase = createClient(url, key);
  const articles = getAllArticles();

  // Supabase has a row limit per insert, so batch in chunks of 50
  const BATCH = 50;
  let inserted = 0;
  let skipped = 0;

  // Get existing article sections+titles to avoid duplicates
  const { data: existing } = await supabase
    .from("articles")
    .select("section, title_en");
  const existingSet = new Set(
    (existing || []).map((a: { section: string; title_en: string }) => `${a.section}::${a.title_en}`)
  );

  const toInsert = articles.filter(
    (a) => !existingSet.has(`${a.section}::${a.title_en}`)
  );
  skipped = articles.length - toInsert.length;

  for (let i = 0; i < toInsert.length; i += BATCH) {
    const batch = toInsert.slice(i, i + BATCH).map((a) => ({
      section: a.section,
      title_en: a.title_en || "",
      title_zh: a.title_zh || "",
      title_he: a.title_he || "",
      body_en: a.body_en || "",
      body_zh: a.body_zh || "",
      body_he: a.body_he || "",
    }));

    const { error } = await supabase.from("articles").insert(batch);
    if (error) {
      return NextResponse.json(
        { error: error.message, inserted, skipped },
        { status: 500 }
      );
    }
    inserted += batch.length;
  }

  return NextResponse.json({ inserted, skipped, total: articles.length });
}
