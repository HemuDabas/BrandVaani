"use client";

import { useEffect, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function HashNavigationHandler() {
  const router = useRouter();
  const pathname = usePathname();
  const activeHashRef = useRef<string>("");

  useEffect(() => {
    if (typeof window === "undefined") return;

    activeHashRef.current = window.location.hash;

    // If loaded or refreshed directly on an anchor hash (e.g. localhost:3000/#about)
    // ensure an entry for root ('/') exists behind it so clicking Back navigates to home
    if (window.location.hash) {
      const initialHash = window.location.hash;
      window.history.replaceState({ isRoot: true }, "", pathname);
      window.history.pushState({ isHash: true, hash: initialHash }, "", initialHash);
      activeHashRef.current = initialHash;
    }

    const handlePopState = (event: PopStateEvent) => {
      const previousHash = activeHashRef.current;
      const currentHash = window.location.hash;

      // When navigating back while on an ID/hash (like #about, #services, #contact):
      if (previousHash) {
        // Push cleanly to root home route and smoothly scroll to the top
        router.push("/");
        window.scrollTo({ top: 0, behavior: "smooth" });
        activeHashRef.current = "";
      } else if (!currentHash && pathname === "/") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    };

    const handleHashChange = () => {
      activeHashRef.current = window.location.hash;
    };

    window.addEventListener("popstate", handlePopState);
    window.addEventListener("hashchange", handleHashChange);

    return () => {
      window.removeEventListener("popstate", handlePopState);
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, [router, pathname]);

  return null;
}
