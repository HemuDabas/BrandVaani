import connectToDatabase from "./mongodb";
import VisitorStats from "./models/VisitorStats";

/**
 * Returns the current date in "YYYY-MM-DD" format in Asia/Kolkata timezone
 * (where BrandVaani is located).
 */
export function getTodayDateKey(): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
}

/**
 * Checks if the request's User-Agent string belongs to a known bot or crawler.
 */
export function isBotUserAgent(userAgent?: string | null): boolean {
  if (!userAgent) return false;
  const botRegex =
    /bot|crawler|spider|crawling|slurp|lighthouse|googlebot|bingbot|baiduspider|yandexbot|duckduckbot|sogou|exabot|facebot|facebookexternalhit|twitterbot|linkedinbot|pinterest|slackbot|telegrambot|whatsapp|discordbot|applebot|ahrefs|semrush|petalbot|bytespider/i;
  return botRegex.test(userAgent);
}

export interface VisitStatsResult {
  today: number;
  total: number;
  counted?: boolean;
}

/**
 * Fetches current visit statistics without incrementing.
 */
export async function getVisitStats(): Promise<VisitStatsResult> {
  await connectToDatabase();
  const todayKey = getTodayDateKey();

  const [todayDoc, totalDoc] = await Promise.all([
    VisitorStats.findOne({ key: todayKey }).lean(),
    VisitorStats.findOne({ key: "TOTAL" }).lean(),
  ]);

  const todayCount = todayDoc?.count || 0;
  let totalCount = totalDoc?.count || 0;

  if (totalCount < todayCount) {
    totalCount = todayCount;
  }

  return {
    today: todayCount,
    total: totalCount,
    counted: false,
  };
}

/**
 * Atomically records a new visit for both today and total counts.
 * Uses atomic $inc with upsert to prevent any race condition.
 */
export async function recordNewVisit(): Promise<VisitStatsResult> {
  await connectToDatabase();
  const todayKey = getTodayDateKey();
  const now = new Date();

  const [todayDoc, totalDoc] = await Promise.all([
    VisitorStats.findOneAndUpdate(
      { key: todayKey },
      { $inc: { count: 1 }, $set: { lastVisitedAt: now } },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    ),
    VisitorStats.findOneAndUpdate(
      { key: "TOTAL" },
      { $inc: { count: 1 }, $set: { lastVisitedAt: now } },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    ),
  ]);

  const todayCount = todayDoc?.count || 1;
  let totalCount = totalDoc?.count || 1;

  if (totalCount < todayCount) {
    totalCount = todayCount;
    await VisitorStats.updateOne(
      { key: "TOTAL" },
      { $set: { count: todayCount, lastVisitedAt: now } }
    );
  }

  return {
    today: todayCount,
    total: totalCount,
    counted: true,
  };
}
