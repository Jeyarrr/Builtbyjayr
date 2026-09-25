const icons = {
  React: "react",
  JavaScript: "javascript",
  "Tailwind CSS": "tailwindcss",
  Bootstrap: "bootstrap",
  HTML5: "html5",
  CSS3: "css3",
  "Node.js": "nodejs",
  "Express.js": "express",
  "ASP.NET": "dotnet",
  "C#": "csharp",
  PostgreSQL: "postgresql",
  Supabase: "supabase",
  "SQL Server": "sqlserver",
  Azure: "azure",
  Vercel: "vercel",
  Git: "git",
  GitHub: "github",
  "GitHub Pages": "github",
  "Visual Studio": "visualstudio",
  "Visual Studio Code": "vscode",
  Figma: "figma",
  LinkedIn: "linkedin",
};
const monochrome = new Set(["express", "github", "vercel"]);

export default function BrandIcon({ name, size = 22 }) {
  const icon = icons[name];
  if (!icon) return null;
  return (
    <img
      className={`brand-icon ${monochrome.has(icon) ? "brand-icon-mono" : ""}`}
      src={`/icons/${icon}.svg`}
      width={size}
      height={size}
      alt=""
      aria-hidden="true"
      decoding="async"
    />
  );
}
