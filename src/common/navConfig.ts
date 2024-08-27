export type NavConfigItem = {
  id: string;
  title: string;
  href?: string;
  isExternal?: boolean;
  subPage: Array<{
    id: string;
    title: string;
    href: string;
    isExternal?: boolean;
  }>;
};

export const navConfigs: NavConfigItem[] = [
  {
    id: "men",
    title: "MEN",
    subPage: [
      {
        id: "trade",
        title: "Trade",
        href: "https://app.thornprotocol.com/",
        isExternal: false,
      },
      {
        id: "earn",
        title: "Earn",
        href: "/coming-soon",
        isExternal: false,
      },
      {
        id: "tokenomics",
        title: "Tokenomics",
        href: "/coming-soon",
        isExternal: false,
      },
      {
        id: "one-pager",
        title: "One-Pager",
        href: "https://docs.thornprotocol.com/one-pager",
        isExternal: false,
      },
      {
        id: "thorn-emission-project",
        title: "THORN Emission Project",
        href: "/coming-soon",
        isExternal: false,
      },
    ],
  },
  {
    id: "women",
    title: "WOMEN",
    subPage: [
      {
        id: "github",
        title: "Github",
        href: "https://github.com/Thorn-Protocol/",
        isExternal: true,
      },
      {
        id: "bug-bounty",
        title: "Bug Bounty",
        href: "/coming-soon",
        isExternal: false,
      },
    ],
  },
  {
    id: "kids",
    title: "KIDS",
    subPage: [
      {
        id: "blog",
        title: "Blog",
        href: "https://medium.com/@thornprotocol",
        isExternal: false,
      },
      {
        id: "contact",
        title: "Contact",
        href: "mailto:contact@thornprotocol.com",
        isExternal: false,
      },
      {
        id: "brandAssets",
        title: "Brand Assets",
        href: "/brand-assets",
        isExternal: false,
      },
      {
        id: "documentation",
        title: "Documentation",
        href: "https://docs.thornprotocol.com/",
        isExternal: true,
      },
    ],
  },
];
