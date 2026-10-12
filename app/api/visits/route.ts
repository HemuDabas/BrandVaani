import { NextRequest, NextResponse } from "next/server";
import { getVisitStats, recordNewVisit, isBotUserAgent } from "@/lib/visit-tracker";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const stats = await getVisitStats();
    return NextResponse.json(stats, {
      headers: {
        "Cache-Control": "no-store, max-age=0",
      },
    });
  } catch (error: any) {
    console.error("Error fetching visit stats:", error);
    return NextResponse.json(
      { today: 0, total: 0, error: "Failed to fetch stats" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const userAgent = req.headers.get("user-agent") || "";
    const isBot = isBotUserAgent(userAgent);

    // Check session cookie to prevent double counting within the same visit session
    const sessionCookie = req.cookies.get("bv_visit_session")?.value;

    let body: { isNewSession?: boolean } = {};
    try {
      body = await req.json();
    } catch {
      // Body is optional
    }

    // If it's a bot, or if already in an active session, or explicitly not a new session:
    if (isBot || sessionCookie || body.isNewSession === false) {
      const stats = await getVisitStats();
      return NextResponse.json(
        { ...stats, counted: false },
        {
          headers: {
            "Cache-Control": "no-store, max-age=0",
          },
        }
      );
    }

    // Record new visit atomically
    const stats = await recordNewVisit();

    const response = NextResponse.json(
      { ...stats, counted: true },
      {
        headers: {
          "Cache-Control": "no-store, max-age=0",
        },
      }
    );

    // Set session cookie for 30 minutes (1800s) to prevent repeat counting on page refreshes & internal navigation
    response.cookies.set("bv_visit_session", "1", {
      path: "/",
      maxAge: 1800,
      httpOnly: true,
      sameSite: "lax",
    });

    return response;
  } catch (error: any) {
    console.error("Error recording visit:", error);
    return NextResponse.json(
      { today: 0, total: 0, error: "Failed to record visit" },
      { status: 500 }
    );
  }
}
