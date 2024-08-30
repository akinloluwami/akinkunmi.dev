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
    website: "https://www.uploadfly.co",
    github: "https://github.com/sooner-run/sooner",
    tags: ["TypeScript", "S3", "Next.js", "TailwindCSS", "MySQL", "Prisma"],
  },
  {
    name: "LogDrop",
    description: "API analytics, logging, monitoring and alerts for NodeJS.",
    website: "https://www.sooner.run",
    github: "https://github.com/akinkloluwami/logdrop",
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
