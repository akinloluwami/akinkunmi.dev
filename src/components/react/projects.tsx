const Projects = () => {
  const projects = [
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
            className="block"
            href={project.url}
            target="_blank"
          >
            <h3 className="text-white underline underline-offset-4">
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
