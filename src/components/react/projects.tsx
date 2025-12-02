const Projects = () => {
  const projects = [
    {
      title: "FormDrop",
      description: "Super simple headless form backend.",
      url: "https://formdrop.co",
      logo: "/projects/formdrop.png",
    },
    {
      title: "PathWatch",
      description: "API observability and monitoring tool.",
      url: "https://github.com/akinloluwami/pathwatch",
      //   logo: "/projects/pathwatch.png",
    },
    {
      title: "NotDatabase",
      description: "Type-safe document database for TypeScript.",
      url: "https://www.notdatabase.com",
      logo: "/projects/notdatabase.png",
    },
    {
      title: "ReactServe",
      description: "The missing backend framework for React.",
      url: "https://react-serve.run",
      logo: "/projects/react-serve.png",
    },

    {
      title: "Plaything",
      description: "The best tic-tac-toe game in the world.",
      url: "https://plaything.pro",
      logo: "/projects/plaything.png",
    },
    // {
    //     title: "NotAuth",
    //     description: "A lightweight authentication solution for React.",
    //     url: "https://www.notauth.com"
    // }
  ];

  return (
    <div className="mt-20">
      <h3 className="text-lg">Projects</h3>

      <div className="grid grid-cols-1 gap-4 mt-3">
        {projects.map((project) => (
          <a
            key={project.title}
            className="border border-white/5 p-1 rounded-xl hover:bg-white/5 transition-colors flex items-center"
            href={project.url}
            target="_blank"
          >
            <div className="size-14 rounded-lg border border-white/5 flex items-center justify-center">
              {project.logo ? (
                <img
                  src={project.logo}
                  alt={project.title}
                  className="w-10  object-contain"
                />
              ) : (
                "N/A"
              )}
            </div>
            <div className="p-1 text-sm mx-1">
              <h4 className="mt-2">{project.title}</h4>
              <p className="mt-1 font-light">{project.description}</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default Projects;
