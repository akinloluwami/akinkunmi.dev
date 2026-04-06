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
      url: "https://twitter.com/akinkunmi",
    },
  ];

  return (
    <div>
      <p className="text-xl">Akinkunmi</p>
      <p className="text-sm">Software Engineer.</p>

      <div className="flex items-center gap-4 mt-2">
        {links.map((link) => (
          <a
            key={link.title}
            href={link.url}
            target="_blank"
            className="text-zinc-400 underline underline-offset-4 text-sm"
          >
            {link.title}
          </a>
        ))}
      </div>
    </div>
  );
};

export default Header;
