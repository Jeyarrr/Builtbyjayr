// Profile and project information adapted from your existing portfolio.
export const profile = {
  name: "Jay-r",
  fullName: "Jay-r B. Casano",
  role: "Full-Stack Developer",
  location: "General Trias, Cavite, PH",
  email: "jayrcasano01@gmail.com",
  github: "https://github.com/Jeyarrr",
  linkedin: "https://www.linkedin.com/in/jay-r-casano-b3760a238/",
  intro:
    "Thoughtful interfaces. Reliable systems. I connect frontend, backend, and databases to turn good ideas into software that works for people.",
  about:
    "I’m Jayr Casano, a full-stack developer based in General Trias, Cavite. I build for the web with a focus on clarity, maintainable code, and the people on the other side of the screen.",
};

export const projects = [
  {
    id: "techora",
    name: "TechOra",
    type: "Web apps",
    label: "FULL-STACK E-COMMERCE",
    featured: true,
    description:
      "From product discovery to order management. A complete tech storefront connecting a considered shopping experience with the systems behind it.",
    tags: ["React", "Node.js", "Express", "PostgreSQL"],
    color: "techora-blue",
    url: "https://techora-store.vercel.app/",
    github: "https://github.com/Jeyarrr/TechOra",
    image: "",
    summary:
      "A full-stack technology e-commerce platform with customer shopping, order tracking, product reviews, and an admin management dashboard. Built with React and Vite on the frontend, Node.js and Express on the backend, and PostgreSQL for data storage.",
    features: [
      "Customer storefront and product discovery",
      "Order tracking and customer reviews",
      "Admin management dashboard",
    ],
  },
  {
    id: "tastenet",
    name: "TASTENET",
    type: "Web apps",
    label: "FOOD ORDERING & DELIVERY",
    featured: true,
    image: "",
    description:
      "Connecting a community through food. An ordering and delivery management system built for CABALLEROS.",
    tags: ["ASP.NET", "C#", "SQL Server", "Tailwind CSS"],
    color: "lavender",
    url: "http://tastenet9-001-site1.itempurl.com/LandingPage.aspx",
    summary:
      "A web-based community food ordering and delivery management system built for CABALLEROS using ASP.NET Web Forms, C#, SQL Server, and Tailwind CSS.",
    features: [
      "Customer food ordering",
      "Admin oversight and staff fulfillment",
      "Rider proof-of-delivery modules",
    ],
  },
  {
    id: "jbnav",
    name: "JB Nav Enterprise",
    type: "Websites",
    label: "EVENTS & CATERING WEBSITE",
    description:
      "A welcoming digital presence for a premium party and catering company, from first impressions to event inquiries.",
    tags: ["HTML", "CSS", "JavaScript"],
    color: "sand",
    url: "https://jeyarrr.github.io/JB-Nav-Enterprise/",
    github: "https://github.com/Jeyarrr/JB-Nav-Enterprise",
    image: "",
    summary:
      "A responsive website for JB Nav Enterprise, a premium party and catering company. Designed to showcase services, build client trust, and help prospective customers make event inquiries.",
    features: [
      "Service and event presentation",
      "Responsive layouts",
      "Clear paths to customer inquiries",
    ],
  },
  {
    id: "jbank",
    name: "JBank",
    type: "UI / UX",
    label: "MOBILE BANKING EXPERIENCE",
    description:
      "Everyday banking, thoughtfully designed. A mobile experience focused on clarity, confidence, and ease of use.",
    tags: ["Figma", "UI / UX", "Prototyping"],
    color: "green",
    image: "/projects/jbank-overview.png",
    gallery: [
      {
        src: "/projects/jbank-overview.png",
        label: "Overview",
        alt: "JBank welcome, sign-up, home, and investment screen designs",
        width: 1294,
        height: 714,
      },
      {
        src: "/projects/jbank-transfers.png",
        label: "Banking flows",
        alt: "JBank transfer, pay and e-wallet, and profile screen designs",
        width: 991,
        height: 708,
      },
    ],
    url: "https://www.figma.com/proto/qfXGW9uZCLZubzEPDtqDV8?node-id=0-1&t=WGB5T80IAi4NUXnd-6",
    summary:
      "A mobile banking application design created in Figma, exploring a secure, intuitive, and user-focused experience. Includes a design system and prototypes for core banking functions.",
    features: [
      "Mobile banking interface design",
      "Reusable design system",
      "Interactive banking prototypes",
    ],
  },
];
