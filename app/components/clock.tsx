import "server-only";

import { ClockClient, TimezoneLabelClient } from "./clock-client";

function getVilniusClockData(date: Date) {
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

export function Clock({ className }: { className?: string }) {
  const initialData = getVilniusClockData(new Date());
  return <ClockClient className={className} initialData={initialData} />;
}

export function TimezoneLabel({ className }: { className?: string }) {
  const initialData = getVilniusClockData(new Date());
  return (
    <TimezoneLabelClient
      className={className}
      initialLabel={initialData.timezone}
    />
  );
}
