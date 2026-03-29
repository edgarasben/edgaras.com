"use client";

import { useEffect, useState } from "react";

export function Clock({ className }: { className?: string }) {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          timeZone: "Europe/Vilnius",
        }),
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 60_000);
    return () => clearInterval(interval);
  }, []);

  if (!time) return <span className={className}>&nbsp;</span>;

  return <span className={className}>{time}</span>;
}
