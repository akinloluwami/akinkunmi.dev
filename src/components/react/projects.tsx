const Projects = () => {
  const projects = [
    {
      title:"Better Secrets",
      description:"A better way to manage GitHub Actions secrets.",
      url: "https://better-secrets.xyz"
    },
    {
      title: "FireFlow",
      description: "Create automated workflows using natural language.",
      url: "https://fireflow.run",
    },
    {
      title: "Envii",
      description:
        "Backup and restore your environment variables across machines.",
      url: "https://envii.dev",
    },
    {
      title: "OutRay",
      description: "Open-source ngrok alternative.",
      url: "https://outray.dev",
    },
    {
      title: "FormDrop",
      description: "Super simple headless form backend.",
      url: "https://formdrop.co",
    },
    {
      title: "PathWatch",
      description: "API observability and monitoring tool.",
      url: "https://github.com/akinloluwami/pathwatch",
    },
    {
      title: "NotDatabase",
      description: "Type-safe document database for TypeScript.",
      url: "https://www.notdatabase.com",
    },
    {
      title: "ReactServe",
      description: "The missing backend framework for React.",
      url: "https://react-serve.run",
    },
    {
      title: "Plaything",
      description: "The best tic-tac-toe game in the world.",
      url: "https://plaything.pro",
    },
  ];

  return (
    <div className="mt-16">
      <h2 className="text-lg font-medium text-white mb-6">Projects</h2>

      <div className="space-y-4">
        {projects.map((project) => (
          <a
            key={project.title}
            className="block w-fit"
            href={project.url}
            target="_blank"
          >
            <h3 className="text-white underline text-sm underline-offset-4">
              {project.title}
            </h3>
            <p className="text-zinc-500 text-sm mt-1">{project.description}</p>
          </a>
        ))}
      </div>
    </div>
  );
};

export default Projects;
