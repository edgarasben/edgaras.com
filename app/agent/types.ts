export type Role = "user" | "agent";

export type CardTone = "violet" | "sky" | "amber" | "emerald" | "rose";

export type ProjectCard = {
  title: string;
  meta: string;
  href?: string;
  tone: CardTone;
};

export type LinkItem = {
  label: string;
  href: string;
  note?: string;
};

export type Fact = {
  label: string;
  value: string;
};

export type Block =
  | { kind: "projects"; items: ProjectCard[] }
  | { kind: "bullets"; items: string[] }
  | { kind: "facts"; items: Fact[] }
  | { kind: "links"; items: LinkItem[] };

export type Answer = {
  text: string;
  blocks?: Block[];
  followUps?: string[];
};

export type Message = Answer & {
  id: string;
  role: Role;
};
