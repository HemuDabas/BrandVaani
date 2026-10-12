"use client";

import { useEffect, useState, useRef } from "react";
import { Eye, Globe, Sparkles, Activity } from "lucide-react";

interface VisitStats {
  today: number;
  total: number;
  loading: boolean;
}

function AnimatedNumber({ value }: { value: number }) {
  const [displayValue, setDisplayValue] = useState(0);
  const prevValueRef = useRef(0);

  useEffect(() => {
    if (value === 0) return;

    const start = prevValueRef.current;
    const end = value;
    const duration = 1000; // 1 second smooth animation
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // easeOutExpo easing function
      const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const current = Math.floor(start + (end - start) * ease);

      setDisplayValue(current);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setDisplayValue(end);
        prevValueRef.current = end;
      }
    };

    requestAnimationFrame(animate);
  }, [value]);

  return <span className="tabular-nums font-mono">{displayValue.toLocaleString()}</span>;
}

export default function VisitorCounter() {
  const [stats, setStats] = useState<VisitStats>({
    today: 0,
    total: 0,
    loading: true,
  });

  useEffect(() => {
    let isMounted = true;
    const sessionKey = "bv_visit_session_active";

    const recordOrFetch = async () => {
      try {
        let isNewSession = true;
        try {
          if (typeof window !== "undefined" && sessionStorage.getItem(sessionKey)) {
            isNewSession = false;
          } else {
            sessionStorage.setItem(sessionKey, "true");
          }
        } catch {
          // If sessionStorage is unavailable in strict privacy mode
        }

        let res: Response;
        if (isNewSession) {
          // First arrival in this session: record the visit
          res = await fetch("/api/visits", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ isNewSession: true }),
          });
        } else {
          // Navigating internal pages: just fetch current live counts
          res = await fetch("/api/visits");
        }

        if (!res.ok) throw new Error("Failed to fetch visit stats");
        const data = await res.json();

        if (isMounted && typeof data.today === "number") {
          setStats({
            today: data.today,
            total: data.total,
            loading: false,
          });
        }
      } catch (err) {
        console.error("Visitor counter error:", err);
        if (isMounted) {
          setStats((prev) => ({ ...prev, loading: false }));
        }
      }
    };

    recordOrFetch();

    // Gentle live refresh every 60 seconds to keep live counts synchronized
    const interval = setInterval(() => {
      fetch("/api/visits")
        .then((res) => res.json())
        .then((data) => {
          if (isMounted && typeof data.today === "number") {
            setStats({
              today: data.today,
              total: data.total,
              loading: false,
            });
          }
        })
        .catch(() => {});
    }, 60000);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  return (
    <div
      id="visitor-counter-section"
      className="w-full flex flex-col sm:flex-row items-center justify-between gap-4 py-4 px-4 sm:px-6 rounded-2xl bg-gradient-to-r from-gray-50 via-gray-50/80 to-gray-50 border border-gray-200/90 shadow-xs"
    >
      {/* Left: Live Activity Indicator */}
      <div className="flex items-center gap-3">
        <div className="relative flex h-3 w-3 items-center justify-center">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500 shadow-sm"></span>
        </div>
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-bold tracking-wide uppercase text-[#0B1120]">
              Live Site Traffic
            </span>
            <Activity className="h-3.5 w-3.5 text-emerald-600 animate-pulse" />
          </div>
          <span className="text-[11px] text-gray-500 font-medium">
            Real-time verified visits
          </span>
        </div>
      </div>

      {/* Right: The Counter Badges */}
      <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 w-full sm:w-auto">
        {/* Visited Today Card */}
        <div
          id="visited-today-badge"
          className="group flex items-center gap-2.5 rounded-xl border border-gray-200 bg-white px-4 py-2 shadow-xs transition-all duration-200 hover:border-emerald-300 hover:shadow-sm"
        >
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 group-hover:scale-105 transition-transform duration-200">
            <Eye className="h-4 w-4" />
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-gray-500">
              Visited Today
            </span>
            <div className="text-base font-extrabold text-[#0B1120] flex items-center gap-1">
              {stats.loading ? (
                <div className="h-4 w-10 animate-pulse rounded bg-gray-200" />
              ) : (
                <AnimatedNumber value={stats.today} />
              )}
              <span className="text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-1.5 py-0.2 rounded">
                Today
              </span>
            </div>
          </div>
        </div>

        {/* Total Visited Card */}
        <div
          id="total-visited-badge"
          className="group flex items-center gap-2.5 rounded-xl border border-gray-200 bg-white px-4 py-2 shadow-xs transition-all duration-200 hover:border-blue-300 hover:shadow-sm"
        >
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-50 text-blue-600 group-hover:scale-105 transition-transform duration-200">
            <Globe className="h-4 w-4" />
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-gray-500">
              Total Visited
            </span>
            <div className="text-base font-extrabold text-[#0B1120] flex items-center gap-1">
              {stats.loading ? (
                <div className="h-4 w-14 animate-pulse rounded bg-gray-200" />
              ) : (
                <AnimatedNumber value={stats.total} />
              )}
              <span className="text-[10px] font-semibold text-blue-600 bg-blue-50 px-1.5 py-0.2 rounded flex items-center gap-0.5">
                <Sparkles className="h-2.5 w-2.5" /> All-Time
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
