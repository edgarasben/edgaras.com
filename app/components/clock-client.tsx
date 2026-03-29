"use client";

import { useEffect, useState } from "react";

type ClockData = {
  hours: string;
  minutes: string;
  timezone: string;
  colonVisible: boolean;
};

function getVilniusClockData(date: Date): ClockData {
  const hours = date.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    hour12: false,
    timeZone: "Europe/Vilnius",
  });

  const minutes = date.toLocaleTimeString("en-GB", {
    minute: "2-digit",
    hour12: false,
    timeZone: "Europe/Vilnius",
  });

  const offset = new Intl.DateTimeFormat("en", {
    timeZone: "Europe/Vilnius",
    timeZoneName: "shortOffset",
  })
    .formatToParts(date)
    .find((part) => part.type === "timeZoneName")?.value;

  const timezone = offset === "GMT+3" ? "EEST" : "EET";

  return {
    hours,
    minutes,
    timezone,
    colonVisible: date.getSeconds() % 2 === 0,
  };
}

export function ClockClient({
  className,
  initialData,
}: {
  className?: string;
  initialData: ClockData;
}) {
  const [data, setData] = useState(initialData);

  useEffect(() => {
    const update = () => {
      setData(getVilniusClockData(new Date()));
    };

    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <span className={className}>
      {data.hours}
      <span
        style={{
          opacity: data.colonVisible ? 1 : 0,
          transition: "opacity 0.15s ease",
        }}
      >
        :
      </span>
      {data.minutes}
    </span>
  );
}

export function TimezoneLabelClient({
  className,
  initialLabel,
}: {
  className?: string;
  initialLabel: string;
}) {
  const [label, setLabel] = useState(initialLabel);

  useEffect(() => {
    const update = () => {
      setLabel(getVilniusClockData(new Date()).timezone);
    };

    const interval = setInterval(update, 60 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  return <span className={className}>{label}</span>;
}
