"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { supabase } from "@/lib/supabase";

export const AnalyticsTracker = () => {
    const pathname = usePathname();

    useEffect(() => {
        const trackVisit = async () => {
            // Basic device detection
            const ua = window.navigator.userAgent;
            let deviceType = "desktop";
            if (/mobile/i.test(ua)) deviceType = "mobile";
            if (/tablet|ipad/i.test(ua)) deviceType = "tablet";

            // Basic browser/OS detection
            let browser = "Other";
            if (ua.includes("Chrome")) browser = "Chrome";
            else if (ua.includes("Firefox")) browser = "Firefox";
            else if (ua.includes("Safari") && !ua.includes("Chrome")) browser = "Safari";
            else if (ua.includes("Edge")) browser = "Edge";

            let os = "Other";
            if (ua.includes("Windows")) os = "Windows";
            else if (ua.includes("Mac OS")) os = "macOS";
            else if (ua.includes("Android")) os = "Android";
            else if (ua.includes("iPhone") || ua.includes("iPad")) os = "iOS";
            else if (ua.includes("Linux")) os = "Linux";

            try {
                await supabase.from('site_visits').insert({
                    page_path: pathname,
                    user_agent: ua,
                    device_type: deviceType,
                    browser: browser,
                    os: os,
                    screen_resolution: `${window.screen.width}x${window.screen.height}`,
                    session_id: window.crypto.randomUUID() // Simple ephemeral session
                });
            } catch (error) {
                console.error("Analytics Error:", error);
            }
        };

        trackVisit();
    }, [pathname]);

    return null; // Invisible component
};
