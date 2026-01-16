const Header = () => {
  const links = [
    {
      title: "GitHub",
      url: "https://github.com/akinloluwami",
    },
    {
      title: "Email",
      url: "mailto:akinkunmioye42@gmail.com",
    },
    {
      title: "Twitter",
      url: "https://twitter.com/xt42io",
    },
  ];

  return (
    <div>
      <h1 className="text-2xl font-medium text-white mb-8">Akinkunmi</h1>

      <div className="space-y-4 text-zinc-400 leading-relaxed">
        <p>
          I'm Akinkunmi, also know as Titanium. <br /> Software engineer
          passionate about solving problems through code.
        </p>

        <p>
          Currently building{" "}
          <a
            href="https://outray.dev"
            target="_blank"
            className="text-white underline underline-offset-4"
          >
            OutRay
          </a>
          .
        </p>

        <p>
          I work primarily with TypeScript and JavaScript, but I'm also
          exploring Elixir, Rust, and Go.
        </p>

        <p className="italic text-zinc-500">
          "My goal is to be as cracked of an engineer as I can be."
        </p>
      </div>

      <div className="flex items-center gap-4 mt-8">
        {links.map((link) => (
          <a
            key={link.title}
            href={link.url}
            target="_blank"
            className="text-zinc-400 underline underline-offset-4"
          >
            {link.title}
          </a>
        ))}
      </div>
    </div>
  );
};

export default Header;
