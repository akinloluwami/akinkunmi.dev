interface Props {
  name: string;
  description: string;
  website?: string;
  github?: string;
  tags?: string[];
  status?: string;
}

export const projects: Props[] = [
  {
    name: "Destino",
    description: "File-based routing framework based on Express.js.",
    website: "https://destino.run",
    github: "https://github.com/akinloluwami/destino",
    status: "wip",
  },
  {
    name: "Audiencc",
    description:
      "Waitlist and email capture tool for building engaged communities.",
    website: "https://www.audiencc.com",
    status: "wip",
  },
  {
    name: "Dropp",
    description:
      "Instant file-sharing tool for easy uploads and shareable links.",
    website: "https://www.dropp.cloud",
  },
  {
    name: "Sooner",
    description: "Codetime tracking for developers and software teams.",
    website: "https://www.sooner.run",
    github: "https://github.com/sooner-run/sooner",
    tags: [
      "TypeScript",
      "Next.js",
      "Hono",
      "DrizzleORM",
      "TailwindCSS",
      "Postgres",
    ],
  },
  {
    name: "UploadFly",
    description: "Really simple file uploads infrastructure.",
    // website: "https://www.uploadfly.co",
    github: "https://github.com/uploadfly/uploadfly",
    tags: ["TypeScript", "S3", "Next.js", "TailwindCSS", "MySQL", "Prisma"],
  },
  {
    name: "LogDrop",
    description: "API analytics, logging, monitoring and alerts for NodeJS.",
    // website: "https://www.logdrop.co",
    github: "https://github.com/akinloluwami/logdrop",
    tags: ["TypeScript", "Next.js", "TailwindCSS", "Postgres", "Prisma"],
  },
  {
    name: "Keydown",
    description: "Minimalist blogging engine.",
    website: "https://keydown-blog.vercel.app",
    tags: ["TypeScript", "Next.js", "DrizzleORM", "Postgres", "TailwindCSS"],
    status: "private + wip",
  },
];
