import { mkdir, writeFile } from 'node:fs/promises';

// Pinned Devicon assets: only the marks used by the portfolio are downloaded.
const release = 'v2.17.0';
const icons = {
  react: 'react/react-original.svg', javascript: 'javascript/javascript-original.svg',
  tailwindcss: 'tailwindcss/tailwindcss-original.svg', bootstrap: 'bootstrap/bootstrap-original.svg',
  html5: 'html5/html5-original.svg', css3: 'css3/css3-original.svg',
  nodejs: 'nodejs/nodejs-original.svg', express: 'express/express-original.svg',
  dotnet: 'dotnetcore/dotnetcore-original.svg', csharp: 'csharp/csharp-original.svg',
  postgresql: 'postgresql/postgresql-original.svg', sqlserver: 'microsoftsqlserver/microsoftsqlserver-original.svg',
  azure: 'azure/azure-original.svg', vercel: 'vercel/vercel-original.svg',
  git: 'git/git-original.svg', github: 'github/github-original.svg',
  visualstudio: 'visualstudio/visualstudio-original.svg', figma: 'figma/figma-original.svg',
  vscode: 'vscode/vscode-original.svg',
  linkedin: 'linkedin/linkedin-original.svg',
};
await mkdir('public/icons', { recursive: true });
const results = await Promise.allSettled(Object.entries(icons).map(async ([name, source]) => {
  const response = await fetch(`https://raw.githubusercontent.com/devicons/devicon/${release}/icons/${source}`);
  if (!response.ok) throw new Error(`${name}: HTTP ${response.status}`);
  const svg = await response.text();
  if (!svg.includes('<svg') || /<script|<foreignObject/i.test(svg)) throw new Error(`Invalid SVG: ${name}`);
  await writeFile(`public/icons/${name}.svg`, svg);
  return name;
}));
for (const result of results) console.log(result.status === 'fulfilled' ? `Saved ${result.value}` : result.reason.message);
if (results.some(result => result.status === 'rejected')) process.exitCode = 1;
const license = await fetch(`https://raw.githubusercontent.com/devicons/devicon/${release}/LICENSE`);
if (!license.ok) throw new Error('Could not retrieve Devicon license');
await writeFile('public/icons/LICENSE.txt', await license.text());
