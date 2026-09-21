import type { Metadata } from "next";
import { AgentExperience } from "./agent-experience";

export const metadata: Metadata = {
  title: "Ask Edgaras – EDGARAS.COM",
  description:
    "Talk to Edgaras Benediktavičius — designer, developer and founder in Vilnius. Ask about his work, process, projects and availability.",
};

export default function AgentPage() {
  return <AgentExperience />;
}
